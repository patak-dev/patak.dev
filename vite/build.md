---
title: vite build
author:
  name: Matias Capeletto
date: 2021-10-05
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: vite build
  - - meta
    - property: og:image
      content: https://www.patak.dev/images/vite-build-cover.jpg
  - - meta
    - property: og:url
      content: https://www.patak.dev/vite/build.html
  - - meta
    - property: og:description
      content: A walkthrough of the Vite codebase to understand how Vite bundles and optimize your code for production
  - - meta
    - name: twitter:card
      content: summary_large_image
---

<BlogCover src="/images/vite-build-cover.jpg" />

# vite build

The focus when talking about [Vite](https://vitejs.dev/) is generally on its dev server, and how it achieves an instant feedback loop while developing. This new unbundled world is a [game-changer for DX](../web/vite-2.md). But Vite also shines when building your app for production. Vite's strong focus in giving you an out-of-the-box solution to build optimized modern apps is as fundamental as its dev story. 

So, let's dive into the Vite codebase to learn how Vite builds your code for production. This post should help you understand how the main pieces fits together to optimize your application, bundling and minifying your JS, CSS, and other assets. This is a high-level overview of the process, that can be useful as a starting point in case you want to explore the codebase to get involved and collaborate with the project. We'll be pointing to the implementation of each feature (as of [Vite 2.6.2](https://github.com/vitejs/vite/tree/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0)).

## Warming Up

This post assumes that you have some previous knowledge of [Vite](https://vitejs.dev). You should at least read the [Why Vite Guide](https://vitejs.dev/guide/why.html) from the docs. [Evan You](https://twitter.com/youyuxi) did a great demo of Vite in [Open Source Friday](https://www.youtube.com/watch?v=UJypSr8IhKY) that is a good way to understand the main concepts. You should also read the [Features Guide in Vite's docs](https://vitejs.dev/guide/features.html). This post describes the internal plugins implementing these features. It is also a good idea to read the [Rollup Plugin Development docs](https://rollupjs.org/guide/en/#plugin-development) and the [Vite Plugin API Guide](https://vitejs.dev/guide/api-plugin.html) if you want to dive into the codebase.

We are going to explore the default build mode targeting modern browsers. To support legacy browsers, Vite offers [@vite_js/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy). Vite can also be used to [build libraries](https://vitejs.dev/guide/build.html#library-mode) and [watch mode](https://vitejs.dev/guide/build.html#rebuild-on-files-changes). You can learn more about the different build options in the [Build Guide](https://vitejs.dev/guide/build.html).

It is a good idea to scaffold a simple Vite app (run `pnpm dlx create-vite` and follow the prompts or read the [Getting Started Guide](https://vitejs.dev/guide/#scaffolding-your-first-vite-project) for other package managers). I recommend you install [Anthony Fu](https://twitter.com/antfu7)'s [vite-plugin-inspect](https://github.com/antfu/vite-plugin-inspect). This plugin is more useful during dev, but a lot of the transformations are shared in dev and build so you can use it to see how some of Vite's internal plugins are changing your code.

## The Big Picture

Let's first review what it means to build an app. In Vite, it all starts with the HTML entry (an `index.html` at the root by default). This HTML file has script module tags and linked stylesheets.

```html{4-8}
<!DOCTYPE html>
<html>
  <head>
    <script type="module" src="/src/main.ts"></script>
    <script type="module">
      // inline script
    </script>
    <link rel="stylesheet" href="/src/main.css">
    <style>
      internal-style: {}
    </style>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```
We need to crawl the HTML file to find each loaded JS module, inline script tags, and linked CSS stylesheets. JS sources go through the normal rollup bundling process resolving and transforming internal dependencies to generate a `vendor.js` bundle (with dependencies that are not regularly updated) and an `index.js` bundle (with the rest of our app). These output chunks need to be hashed to enable strong caching. Linked stylesheets will also be bundled together with any imported CSS file from JS sources in the main chunk to generate an index.css file for our app. Internal styles are left untouched.

Script tags or imports could point to typescript files or other file types, as long as Vite knows how to transpile them or it is extended with user plugins to deal with them. In the case above, the `main.ts` file needs to be transformed to a JS file as part of the bundling process. In Vite, this is supported out of the box by using [esbuild](https://esbuild.github.io/), a Go based bundler.

Once we have created the JS and CSS assets for the build, we replace the original script and link tags with them to create the output `index.html` file for our app. Vite performs static analysis of imports to inject module preload link tags for each JS source that will be needed, allowing the browser to load these resources in parallel thus avoiding a loading waterfall.

```html{4-6}
<!DOCTYPE html>
<html>
  <head>
    <script type="module" src="/assets/index.d93758c6.js"></script>
    <link rel="modulepreload" href="/assets/vendor.a9c538d6.js">
    <link rel="stylesheet" href="/assets/index.3015a40c.css">
    <style>
      internal-style: {}
    </style>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

Vite supports code splitting, both JS and CSS assets. When a dynamic import is encountered, an async JS chunk and a CSS chunk are generated for it. The import call is then instrumented in the importer chunk to preload its dependencies and wait for the corresponding CSS stylesheet.

Other assets like images, videos, wasm can be imported using relative paths. Vite also hashes these files when generating their output asset file and rewrites the URLs in JS and CSS files to point to them. On the other hand, assets on the public folder are copied as-is to the output root, and allow users to reference these files by stable absolute paths.

Each JS and CSS chunk needs to be minified for production. Vite also uses esbuild for this task for both languages since [Vite 2.6.0](https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md#260-2021-09-29), helping speed up the build process.

Now that we have an overview of the build process centered around the entry HTML file, let's dig into the details. Vite performs further optimizations and supports common web patterns by default, we'll check how these are implemented in the next sections.

## An Opinionated Rollup Setup

At build time, you can think of Vite as an opinionated [Rollup](https://rollupjs.org/) setup. The [Rollup plugins API](https://rollupjs.org/guide/en/#plugin-development) allows Vite to support most out-of-the-box features as independent plugins. Vite uses an [extension of this plugin API](https://vitejs.dev/guide/api-plugin.html), introducing [new hooks](https://vitejs.dev/guide/api-plugin.html#vite-specific-hooks) that allows to better configure Vite (`config`, `configResolved`), transform the HTML entry (`transformIndexHtml`), and extend development mode (`configureServer`, `handleHotUpdate`). There are a few [compatibility caveats with Rollup plugins](https://vitejs.dev/guide/api-plugin.html#rollup-plugin-compatibility) to take into account, but most plugins from the rollup ecosystem [will work directly as a Vite plugin](https://vite-rollup-plugins.patak.dev/). Since we are focusing on build time, these extra hooks won't come into play. We don't have the Vite server, or HMR logic. Vite configures rollup, reusing the feature plugins that run during dev (support for JSON, wasm, workers, etc), and adds other plugins to optimize your code (minification, preloading, etc).

As we saw in the previous section, [esbuild](https://esbuild.github.io/) is used to transpile individual files (to strip typescript types and compile JSX) and as the default minifier. esbuild is also used as a bundler when pre-bundling dependencies, but this is a dev-only process. This may change in the future, there is a [proposal](https://github.com/vitejs/vite/discussions/4921#discussion-3569543) to use esbuild pre-bundle dependencies also for production, aliasing dependencies to these chunks during the Rollup build phase.

<br>

![Vite build stages](/images/vite-build.svg)

## Starting from the CLI

When you execute `vite build`, the [Vite CLI](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/bin/vite.js#L42) is run. The [run command](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/cli.ts#L128) is implemented using [cac](https://github.com/cacjs/cac#readme). The action runs the [public `build` function](https://vitejs.dev/guide/api-javascript.html#build)

```js
await build({ root, base, mode, config, logLevel, clearScreen, buildOptions })
```

This function calls into [`doBuild`](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/build.ts#L346). Here is a simplified version of the implementation, assuming defaults are used so the logic related to SSR, lib mode, and `build --watch` can be removed.

```js
async function doBuild(inlineConfig: InlineConfig = {}): RollupOutput

  const config = await resolveConfig(inlineConfig, 'build', 'production')
  const outDir = resolve(config.build.outDir)

  prepareOutDir(outDir, config)

  const bundle = await rollup.rollup({
    input: resolve('index.html'),
    plugins: config.plugins
  })

  return await bundle.write({
    dir: outDir,
    format: 'es',
    exports: 'auto',
    sourcemap: config.build.sourcemap,
    entryFileNames: path.join(config.assetsDir, `[name].[hash].js`),
    chunkFileNames: path.join(config.assetsDir, `[name].[hash].js`),
    assetFileNames: path.join(config.assetsDir, `[name].[hash].[ext]`),
    manualChunks: createMoveToVendorChunkFn()
  })
}
```

First, [`resolveConfig`](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/config.ts#L241) is used to generate a [concrete `ResolvedConfig`](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/config.ts#L420) by resolving the user config, the project config files and Vite defaults. See [`ResolvedConfig` declaration](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/config.ts#L206), that extends [`UserConfig`](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/config.ts#L69).

```js
  const config = await resolveConfig(inlineConfig, 'build', 'production')
  const outDir = resolve(config.build.outDir)
```

Next, the [output dir is prepared](https://github.com/vitejs/vite/blob/6011665ca23a41cb7643d44c539bc03d4155e43f/packages/vite/src/node/build.ts#L561), emptying it before generating the assets. This function also adds support for the [public directory](https://vitejs.dev/guide/assets.html#the-public-directory) feature, copying the content of `publicDir` to the root of our dist folder.

```js
  prepareOutDir(outDir, config)
```

Then, [a rollup bundle is created](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/build.ts#L531) with the `index.html` as input, and [the resolved plugins](#the-plugins-pipeline). You can see [the complete rollup options resolving](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/build.ts#L409).

```js
  const bundle = await rollup.rollup({
    input: resolve('index.html'),
    plugins: config.plugins
  })
```

Finally, `bundle.write` is called to generate the assets in the output directory. You can check the [complete write config object](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/build.ts#L438). In the snippets, we showcase the most important options assuming default values are used.

```js
  return await bundle.write({
    dir: outDir,
    format: 'es',
    exports: 'auto',
    sourcemap: config.build.sourcemap,
    entryFileNames: path.join(options.assetsDir, `[name].[hash].js`),
    chunkFileNames: path.join(options.assetsDir, `[name].[hash].js`),
    assetFileNames: path.join(options.assetsDir, `[name].[hash].[ext]`),
    manualChunks: createMoveToVendorChunkFn()
  })
```

The [`createMoveToVendorChunkFn`](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/build.ts#L593) function defines the default chunking strategy (that generates `index.js` and `vendor.js` assets for the build).

```ts
function createMoveToVendorChunkFn() {
  return (id, { getModuleInfo }) => {
    if (
      id.includes('node_modules') &&
      !isCSSRequest(id) &&
      staticImportedByEntry(id, getModuleInfo)
    ) {
      return 'vendor'
    }
  }
}
```

As we can see, the core of the build process is a Rollup setup with carefully selected defaults for Vite's target use case. The logic is a bit more complex in the codebase to support lib mode, SSR builds, and `build --watch`. This is just the beginning of the story though, all the features and optimizations are implemented as Rollup plugins.

## The Plugins Pipeline

Plugins are resolved during dev and build time in [`resolvedPlugins`](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/index.ts#L18). Vite inserts extra build plugins when building to handle minification and other optimizations using [`resolveBuildPlugins`](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/build.ts#L290). Apart from dev only or build only plugins, some plugins implement conditional logic depending on the current command. See for example, how [`config.command === 'serve'` is used](https://github.com/vitejs/vite/blob/72cb33e947e7aa72d27ed0c5eacb2457d523dfbf/packages/vite/src/node/plugins/css.ts#L284) in the [`vite:css`](#_6-vite-css) plugin.

There are a few key plugins. [`vite:build-html`](#_15-vite-build-html) and [`vite:html-inline-proxy-plugin`](#_5-vite-html-inline-proxy-plugin) to transform the HTML entry, replacing your loaded and inlined JS and CSS with optimized chunks. [`vite:css`](#_6-vite-css) and [`vite:css-post`](#_14-vite-css-post) to handle CSS and preprocessors. [`vite:esbuild`](#_7-vite-esbuild) to transpile Typescript and JSX for each module. [`vite:asset`](#_11-vite-asset) to manage static assets. [`vite:build-import-analysis`](#_21-vite-build-import-analysis) for preloading optimizations, glob import support, and URL rewriting. [`vite:esbuild-transpile`](#_22-vite-esbuild-transpile) to transpile the chunks to the appropriate target and minify your code. Most plugins implement their features in isolation, but there are some cases where the responsibility is shared between a few of them working together.

The rest of the plugins implement further optimizations, improve [compatibility](#_3-vite-modulepreload-polyfill) and adds support for common Web patterns (like importing [JSON](#_8-vite-json), [Wasm](#_9-vite-wasm), or [Worker Modules](#_10-vite-worker)).

Some of these plugins are [official Rollup Plugins](https://github.com/rollup/plugins) ([`alias`](#_1-alias), [`commonjs`](#_16-commonjs), [`rollup-plugin-dynamic-import-variables`](#_18-rollup-plugin-dynamic-import-variables)). Some are similar in functionality to other official Rollup plugins but have been reimplemented to better match Vite's API or to be able to include a different behavior during dev using Vite's extended plugin API.

## Plugins Walkthrough

Let's dive into each of the plugins to learn about their responsibilities. We'll include links to their implementation and the relevant sections in the docs.

When a plugin needs to define a cache or generate data to be consumed later in the pipeline, this is usually implemented as `WeakMap` based caches keyed with the `ResolvedConfig` of the current run. These caches are re-init in the [`buildStart` hook](https://rollupjs.org/guide/en/#buildstart) ([see example](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/css.ts#L267)) to support `build --watch` mode.

Users can control the application order of a plugin using the [`enforce`property](https://vitejs.dev/guide/api-plugin.html#plugin-ordering). You can also see where the `pre` and `post` plugins [are inserted](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/index.ts#L33) in the final plugins array.

- Alias
- ... User pre plugins (with `enforce: 'pre'`)
- Vite core plugins
- ... User normal plugins (without `enforce`)
- Vite build plugins
- ... User post plugins (with `enforce: 'post'`)
- Vite post build plugins

The plugins for a default configuration of a Vite build run are:

- [vite build](#vite-build)
  - [Warming Up](#warming-up)
  - [The Big Picture](#the-big-picture)
  - [An Opinionated Rollup Setup](#an-opinionated-rollup-setup)
  - [Starting from the CLI](#starting-from-the-cli)
  - [The Plugins Pipeline](#the-plugins-pipeline)
  - [Plugins Walkthrough](#plugins-walkthrough)
    - [1. `alias`](#_1-alias)
    - [2. `... user pre plugins`](#_2-user-pre-plugins)
    - [3. `vite:modulepreload-polyfill`](#_3-vite-modulepreload-polyfill)
    - [4. `vite:resolve`](#_4-vite-resolve)
    - [5. `vite:html-inline-proxy-plugin`](#_5-vite-html-inline-proxy-plugin)
    - [6. `vite:css`](#_6-vite-css)
    - [7. `vite:esbuild`](#_7-vite-esbuild)
    - [8. `vite:json`](#_8-vite-json)
    - [9. `vite:wasm`](#_9-vite-wasm)
    - [10. `'vite:worker'`](#_10-vite-worker)
    - [11. `'vite:asset'`](#_11-vite-asset)
    - [12. `... user normal plugins`](#_12-user-normal-plugins)
    - [13. `vite:define`](#_13-vite-define)
    - [14. `vite:css-post`](#_14-vite-css-post)
    - [15. `vite:build-html`](#_15-vite-build-html)
    - [16. `commonjs`](#_16-commonjs)
    - [17. `'vite:data-uri'`](#_17-vite-data-uri)
    - [18. `rollup-plugin-dynamic-import-variables`](#_18-rollup-plugin-dynamic-import-variables)
    - [19. `vite:asset-import-meta-url`](#_19-vite-asset-import-meta-url)
    - [20. `... user post plugins`](#_20-user-post-plugins)
    - [21. `vite:build-import-analysis`](#_21-vite-build-import-analysis)
    - [22. `vite:esbuild-transpile`](#_22-vite-esbuild-transpile)
    - [23. `vite:terser`](#_23-vite-terser)
    - [24. `vite:manifest`](#_24-vite-manifest)
    - [25. `vite:ssr-manifest`](#_25-vite-ssr-manifest)
    - [26. `vite:reporter`](#_26-vite-reporter)
    - [27. `vite:load-fallback`](#_27-vite-load-fallback)
  - [The Vite ecosystem](#the-vite-ecosystem)
  - [Closing Thoughts](#closing-thoughts)

### 1. `alias`

This is the official [@rollup/plugin-alias](https://github.com/rollup/plugins/tree/master/packages/alias#rollupplugin-alias), called as `aliasPlugin({ entries: config.resolve.alias })`. See Vite docs for [`resolve.alias`](https://vitejs.dev/config/#resolve-alias). This is a plugin for defining aliases when bundling packages, same as [`resolve.alias`](https://webpack.js.org/configuration/resolve/#resolvealias) in Webpack. Configuring Vite with

```js
resolve: {
  alias: { '/@components': path.resolve(__dirname, 'src/components') }
}
```
Lets you write your imports from anywhere in your source as
```js
import Button from '/@components/Button.vue'
```
This plugin then resolves the path and transpile them to the real path
```js
import Button from '../../components/Button.vue'
```

### 2. `... user pre plugins`

These are the plugins with [`enforce: 'pre'`](https://vitejs.dev/guide/api-plugin.html#plugin-ordering). For example, the [`@rollup/plugin-image`](https://vite-rollup-plugins.patak.dev/#image) requires this flag so it is applied before Vite asset handling internal plugins.

### 3. `vite:modulepreload-polyfill`

This plugin adapts the module preload polyfill from [guybedford/es-module-shims](https://github.com/guybedford/es-module-shims). You can see more details in [ES Module Preloading & Integrity](https://guybedford.com/es-module-preloading-integrity). This polyfill allows Vite to [preload modules](https://vitejs.dev/guide/features.html#preload-directives-generation) to avoid a loading waterfall, supporting non-chromium browsers. See the [`modulePreloadPolyfillPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/modulePreloadPolyfill.ts#L7). The import for [the polyfill is auto-injected](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/html.ts#L296) if needed while transforming the html in [`vite:build-html`](#_15-vite-build-html).

### 4. `vite:resolve`

This plugin serves a similar purpose to [`@rollup/plugin-node-resolve`](https://github.com/rollup/plugins/tree/master/packages/node-resolve). It locates modules using the [Node resolution algorithm](https://nodejs.org/api/modules.html#modules_all_together), for using third party modules in `node_modules`. It is different from the official rollup plugin because of the need for special handling for Vite-specific features (SSR and dev server). You can see [`resolvePlugin` implementation here](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/resolve.ts#L69). There is quite a bit of complexity in this plugin to replicate the way Node resolve files.

### 5. `vite:html-inline-proxy-plugin`

This plugin loads inline scripts of entry HTML files as separate modules. These scripts are removed from the HTML source by the [`vite:build-html`](#_15-vite-build-html) plugin and replaced with a script module tag pointing to a virtual proxy module identified by a suffix and its position in the HTML `?html-proxy&index={n}`. This allows these modules to be processed by the rollup pipeline and bundled with the rest of the imported modules. See the [`htmlInlineScriptProxyPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/html.ts#L38).

### 6. `vite:css`

This plugin works together with the [`vite:css-post`](#_14-vite-css-post) plugin to implement [Vite's CSS features](https://vitejs.dev/guide/features.html#css). Support for pre-processors (postCSS, sass, less), including resolving imported URLs. Check out the [`compileCSS`](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/css.ts#L568) implementation for details. This plugin also record CSS dependencies from `@imports`. See the [`cssPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/css.ts#L137).

### 7. `vite:esbuild`

A plugin to transforms `.js`, `.ts`, `.jsx`, and `.tsx` files with [esbuild](https://esbuild.github.io/) to strips the types and compile JSX. This plugin also injects the configured JSX helpers like `import React from 'react'`, see [`options.jsxInject`](https://vitejs.dev/guide/features.html#jsx). Internally uses [transformWithEsbuild](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/esbuild.ts#L52), which is independent of the Vite plugins pipeline and exported as a utility. Several community plugins are also using it internally. See the [`esbuildPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/esbuild.ts#L164).

### 8. `vite:json`

Handles importing of JSON files, see [Vite docs for this feature](https://vitejs.dev/guide/features.html#json). This is similar to [@rollup/plugin-json](https://github.com/rollup/plugins/tree/master/packages/json), but supports a `json.stringify` option to further optimize the bundle if named exports are not needed.

```js
// import the entire object
import json from './example.json'

// or import a root field as named exports, helping with tree shaking
import { field } from './example.json'
```

See [`jsonPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/json.ts#L30).

### 9. `vite:wasm`

This plugin allows users to import pre-compiled `.wasm` files directly. See [WebAssembly docs](https://vitejs.dev/guide/features.html#webassembly). This is similar to [@rollup/plugin-wasm](https://github.com/rollup/plugins/tree/master/packages/wasm) but uses a slightly different API. The async constructor returns the `exports` object directly instead of an `instance` object with an `exports` member. 

```js
import init from './example.wasm'

const exports = await init()
exports.test()
```

See the [`wasmPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/wasm.ts#L45).

### 10. `'vite:worker'`

This plugin adds support for creating Web Workers by importing them. See the [Worker docs](https://vitejs.dev/guide/features.html#web-workers). The plugin uses rollup to bundle the workers so regular workers can be used, as Firefox doesn't support module workers at this point. This bundle can also be [inlined](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/worker.ts#L76) using the `&inline` suffix.

```js
import MyWorker from './my-worker.js?worker'
const worker = new MyWorker()
```

See the [`webWorkerPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/worker.ts#L22).

### 11. `'vite:asset'`

This plugin implements [Vite's Assets handling](https://vitejs.dev/guide/assets.html). For example, importing a static asset returns the resolved public URL including its hash. In production, this plugin resolves `imgUrl` to a string. In the example below, it could be `'/assets/img.2d8efhg.png'`.

```js
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```

In [`renderChunk`](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/asset.ts#L85), the assets URL are overwritten to their public path in the dist folder.

Vite uses suffixes to [explicitly import URLs (`?url`)](https://vitejs.dev/guide/assets.html#explicit-url-imports) and [import asset as strings (`?raw`)](https://vitejs.dev/guide/assets.html#importing-asset-as-string), and these features are also resolved in by this plugin. See implementation for [?url](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/asset.ts#L80) and [?raw](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/asset.ts#L67) handling.

See the complete [`assetPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/asset.ts#L37).

### 12. `... user normal plugins`

Plugins without an `enforce` flag.

### 13. `vite:define`

A plugin to define global constant replacements, equivalent to the official [@rollup/plugin-replace](https://github.com/rollup/plugins/tree/master/packages/replace). Check out the [define docs](https://vitejs.dev/config/#define). Entries will be defined as globals during dev and statically replaced during build. The replacement is regex-based so only constants like `__APP_VERSION__` should be used or you could end up with replacements inside strings.

```js
define: {
  __APP_VERSION__: `JSON.stringify(${version})`
}
```

See the [`definePlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/define.ts#L7).

### 14. `vite:css-post`

This plugin [minifies the bundled CSS chunks with esbuild](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/css.ts#L315). See the [`minifyCSS` function](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/css.ts#L905) for details.

Asset URL placeholders are [resolved to their final build path](https://github.com/vitejs/vite/blob/e8a1d19670c2d28fe06efb8fade89b045bebb7ef/packages/vite/src/node/plugins/css.ts#L364). 

It also implements [CSS Code Splitting](https://vitejs.dev/guide/features.html#css-code-splitting). For each async chunk, the CSS used by its modules is [bundled](https://github.com/vitejs/vite/blob/e8a1d19670c2d28fe06efb8fade89b045bebb7ef/packages/vite/src/node/plugins/css.ts#L344) and extracted in a [separate async chunk](https://github.com/vitejs/vite/blob/70e882f06a80bcfb6f5189902984751d9c06cf8f/packages/vite/src/node/plugins/css.ts#L400), loaded via a `<link>` tag when needed. This CSS file is guaranteed to be loaded before the async chuck is evaluated, thus avoiding FOUC. 

This is a simplified version of the [preload client helper](https://github.com/vitejs/vite/blob/545b1f13cec069bbae5f37c7540171128f439e7b/packages/vite/src/node/plugins/importAnalysisBuild.ts#L43) injected by Vite in the built code.

```js
function createLink(dep) {
  // JS  -> <link rel="modulepreload" href="dep" />
  // CSS -> <link rel="stylesheet" href="dep" />
}

function preload(importModule, deps) {
  return Promise.all(
    deps.map(dep => {
      if (!alreadyLoaded(dep)) { 
        document.head.appendChild(createLink(dep))      
        if (isCss(dep)) {
          // Wait for CSS to load to avoid FOUC
          return new Promise((resolve, reject) => {
            link.addEventListener('load', resolve)
            link.addEventListener('error', reject)
          })
        }
      }
    })
  ).then(() => importModule())
}
```

This plugin will transform dynamic imports using this helper. The following 
```js
import('./async.js')
```
will be transpiled into
```js
preload(
  () => import('/assets/async.js),
  ['/assets/async.css','/assets/async-dep.js']
)
```

If [`build.cssCodeSplit`](https://vitejs.dev/config/#build-csscodesplit) is false, these chunks are injected by the [`vite:build-html`](#_15-vite-build-html) plugin [as link tags](https://github.com/vitejs/vite/blob/70e882f06a80bcfb6f5189902984751d9c06cf8f/packages/vite/src/node/plugins/html.ts#L421)

See the [`cssPostPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/css.ts#L254).

### 15. `vite:build-html`

This plugin compiles `.html` scripts into an entry JS module. It first removes the script tags from the HTML in the `transform` hook, generating a JS file that imports each module and asset. The JS bundles are later inserted in the `generateBundle` hook and the assets in the [`vite:asset`](#_11-vite-asset) plugin. As described in [`vite:modulepreload-polyfill`](#_3-vite-modulepreload-polyfill), if there is at least one script module in the module, the module preload polyfill will be auto-injected. See the [`buildHtmlPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/html.ts#L149).

### 16. `commonjs`

This is the official [@rollup/plugin-commonjs](https://github.com/rollup/plugins/tree/master/packages/commonjs), that converts CommonJS modules to ES6 so they can be included in a Rollup bundle. During dev, Vite performs dependencies pre-bundling using esbuild that takes care of converting from CommonJS to ES6, but during build time the pre-bundles are not currently used so the 'commonjs' plugin is needed.

### 17. `'vite:data-uri'`

A plugin equivalent to [@rollup/plugin-data-uri](https://github.com/rollup/plugins/tree/master/packages/data-uri), which imports modules from [Data URIs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs). For example, Base64 encoding is supported for well-formed `data:` URIs.
```js
import batman from 'data:application/json;base64, eyAiYmF0bWFuIjogInRydWUiIH0=';
```
See the [`dataURIPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/dataUri.ts#L14).

### 18. `rollup-plugin-dynamic-import-variables`

This is the official [@rollup/plugin-dynamic-import-vars](https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars) plugin, used to support variables in dynamic imports. It is configured with [`build.dynamicImportVarsOptions`](https://vitejs.dev/config/#build-dynamicimportvarsoptions). and allows users to write dynamic resolved imports:
```js
function importLocale(locale) {
  return import(`./locales/${locale}.js`);
}
```

### 19. `vite:asset-import-meta-url`

Convert `new URL(path, import.meta.url)` to its resolved built URL. Check out the [docs in Static Asset Handling Guide](https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url). It also supports template string with dynamic segments:
```js
new URL(`./dir/${name}.png`, import.meta.url)
```
Would be transformed to
```js
import.meta.globEager('./dir/**.png')[`./dir/${name}.png`].default
```
See the [`assetImportMetaUrlPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/assetImportMetaUrl.ts#L18).

### 20. `... user post plugins`

Plugins with the [`enforce: 'post'` flag](https://vitejs.dev/guide/api-plugin.html#plugin-ordering). For example, [`'vite:legacy-post-process'`](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/plugin-legacy/index.js#L168), a sub plugin of [`@vitejs/plugin-legacy`](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy), enforces this position to apply the babel in `renderChunk` after all other internal plugins have run. This plugin runs in the same position as `vite:esbuild-transpile` and `vite:terser`, replacing them to use babel for the legacy transpilation.

### 21. `vite:build-import-analysis`

This plugin lexes, resolves, rewrites, and analyzes URL imports. This is the build counterpart of the dev-only `'vite:build-import-analysis'` plugin.

[Dynamic imports are augmented](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/importAnalysisBuild.ts#L173) with preload directives. A [helper](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/importAnalysisBuild.ts#L43) is [injected in client code](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/importAnalysisBuild.ts#L197) for preloading CSS and direct imports of async chunks in parallel to the async chunk itself. See dependencies analysis to include the correct chunks to preload [in the `generateBundle` hook](https://github.com/vitejs/vite/blob/3e3c20364d6c065026f7362bbcb7094099705cc9/packages/vite/src/node/plugins/importAnalysisBuild.ts#L309).
[Async Chunk Loading Optimization](https://vitejs.dev/guide/features.html#async-chunk-loading-optimization)
[`addDeps` implementation](https://github.com/vitejs/vite/blob/3e3c20364d6c065026f7362bbcb7094099705cc9/packages/vite/src/node/plugins/importAnalysisBuild.ts#L265)

[Glob Imports](https://vitejs.dev/guide/features.html#glob-import) are identified and then transpiled using [transformImportGlob](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/importGlob.ts#L11). For example
```js
const modules = import.meta.glob('./dir/*.js')
```
is transformed to
```js
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js')
}
```

See the [`buildImportAnalysisPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/importAnalysisBuild.ts#L87).

### 22. `vite:esbuild-transpile`

This plugin performs transpilation of each rendered chunk to support the configured targets, see the [Browser Compatibility docs](https://vitejs.dev/guide/build.html#browser-compatibility) and the [`build.target`](https://vitejs.dev/config/#build-target) option. If [`build.minify`](https://vitejs.dev/config/#build-minify) is `'esbuild'`, it will also use esbuild to minify the code avoiding the need of terser. See the [`buildEsbuildPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/esbuild.ts#L208). This plugin also uses the exported [`transformWithEsbuild`](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/esbuild.ts#L52) utility.

### 23. `vite:terser`

If [`build.minify`](https://vitejs.dev/config/#build-minify) is `'terser'` (currently the default), this plugin is used to minify each rendered chunk using `terser`. Vite may [switch to esbuild as default soon](https://twitter.com/youyuxi/status/1438920591646461952?s=20) which is 20~40x faster than terser. See the [`terserPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/terser.ts#L6).

### 24. `vite:manifest`

If [`build.manifest`](https://vitejs.dev/config/#build-manifest) is enabled, this plugin generates a `manifest.json` file that contains a mapping of non-hashed asset filenames to their hashed versions, which can then be used by a server framework to render the correct asset links. See the [Backend Integration guide](https://vitejs.dev/guide/backend-integration.html) for more details and the [`manifestPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/manifest.ts#L22).

### 25. `vite:ssr-manifest`

If [`build.ssrManifest`](https://vitejs.dev/config/#build-ssr-manifest) is enabled, this plugin is included to generate an `ssr-manifest.json` file that contains mappings of module IDs to their associated chunks and asset files. This information can be used to render preload directives for files used by async routes in SSR. See [Generating Preload Directives](https://vitejs.dev/guide/ssr.html#generating-preload-directives) for more information and the [`ssrManifestPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/ssr/ssrManifestPlugin.ts#L8).

### 26. `vite:reporter`

A plugin to log progress and a report with information about the generated chunks and assets. See the [`buildReporterPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/reporter.ts#L26).

```txt
$ vite build
vite v2.6.2 building for production...
✓ 34 modules transformed.
dist/assets/favicon.17e50649.svg   1.49 KiB
dist/assets/logo.ecc203fb.svg      2.61 KiB
dist/index.html                    0.52 KiB
dist/assets/index.3015a40c.js      1.39 KiB / gzip:  0.73 KiB
dist/assets/index.d93758c6.css     0.77 KiB / gzip:  0.49 KiB
dist/assets/vendor.a9c538d6.js   129.47 KiB / gzip: 41.77 KiB
Done in 2.90s.
```

### 27. `vite:load-fallback`

A simple plugin that provides build load fallback for arbitrary requests with queries. See the [`loadFallbackPlugin` implementation](https://github.com/vitejs/vite/blob/2b7e836f84b56b5f3dc81e0f5f161a9b5f9154c0/packages/vite/src/node/plugins/loadFallback.ts#L8). 

## The Vite ecosystem

In this post, we are only describing the basic setup Vite. If you are using a framework, you'll include a plugin from its community that provides support for transpiling custom formats (`.vue`, `.svelte`, `.astro`), and perform further framework specific build optimizations. You'll also extend Vite's capabilities through plugins to load other file formats, comfortably work with icons, add PWA support, and so on. You can find a list of Vite community plugins in [Awesome Vite](https://github.com/vitejs/awesome-vite#plugins), or in [Awesome Rollup](https://github.com/rollup/awesome#plugins) since most of them are [compatible with Vite](https://vite-rollup-plugins.patak.dev/). Integrations also use Vite Javascript API as part of more complex setups that use Vite internally. There is also an increasing number of plugins implemented with [unplugin](https://github.com/unjs/unplugin), a unified plugin system for Vite, Rollup, and Webpack. Vite build can also be used through [Vite JavaScript API](https://vitejs.dev/guide/api-javascript.html#build), allowing integrations with more complex tools and app frameworks.

## Closing Thoughts

One of the keys to Vite's success has been to choose Rollup as its underlying bundler during build time. Vite offers a complete and well-tested solution out of the box for production apps. esbuild could be used in the future as an optional bundler, but at this point, it is a good call to avoid the burden on maintenance and API design needed by a more general unbundled abstraction. 

Web tooling is in constant evolution. For example, there is a big push in the React community to replace babel transforms with SWC equivalents. Where it makes sense, Vite will evolve to adopt these improvements. Vite is in a position to offer a stable framework while switching to faster and simpler tools for its internals as time goes on. This is part of Vite's pragmatic philosophy when navigating tradeoffs. Vite uses the best available tools to provide a solution that is performant, solid and ready to be used today.

<br>
<br>
<br>

*Last updated on 2021-10-05* <br>
Connect with me on [Twitter](https://twitter.com/patak_dev) or in [Discord @patak](https://chat.vitejs.dev/).

<br>
<br>

*Continue with*

**[Vite 2](../web/vite-2.md)**
<br>*A VitePress powered post about Vite 2 and the importance of the instant feedback loop that it enables*

<br>
<br>
<br>

<img style="filter:brightness(75%);" src="/images/vite-build-cover.jpg">

Cover photo from [@venczakjanos](https://unsplash.com/@venczakjanos)
