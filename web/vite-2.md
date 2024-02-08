---
title: Vite 2
author:
  name: Matias Capeletto
date: 2021-03-10
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content:  Vite 2
  - - meta
    - property: og:image
      content: https://www.patak.dev/images/vite-2.jpg
  - - meta
    - property: og:url
      content: https://www.patak.dev/web/vite-2.html
  - - meta
    - property: og:description
      content: A VitePress powered post about Vite 2 and the importance of the instant feedback loop that it enables
  - - meta
    - name: twitter:card
      content: summary_large_image
---

<BlogCover src="/images/vite-2.jpg" />

# Vite 2, a DX jump into the future

[Vite](https://github.com/vitejs) is a next generation frontend tool. It generates optimized builds using the battle tested [rollup](https://rollupjs.org/). But during dev, bundling is avoided with files served on demand over native ESM. It has Hot Module Replacement (HMR) that stays fast independently of your code base size.

This post discusses why the instant feedback loop unlocked by Vite is so important and what is new in the next iteration of Vite, that is currently in beta. Check out [the new Vite docs site](https://vitejs.dev/), built with [VitePress](https://vitepress.vuejs.org/).

- [Vite 2, a DX jump into the future](#vite-2-a-dx-jump-into-the-future)
  - [Frontend tooling is evolving](#frontend-tooling-is-evolving)
  - [Powered by VitePress](#powered-by-vitepress)
  - [What is new in Vite 2](#what-is-new-in-vite-2)
    - [Vite docs](#vite-docs)
    - [Framework agnostic core](#framework-agnostic-core)
    - [New universal plugin format](#new-universal-plugin-format)
    - [Error overlay](#error-overlay)
    - [Lib mode](#lib-mode)
    - [Multi entry mode](#multi-entry-mode)
    - [Strong caching of npm deps](#strong-caching-of-npm-deps)
    - [Other highlights](#other-highlights)
  - [Feeling the speed](#feeling-the-speed)
  - [An immediate connection](#an-immediate-connection)

## Frontend tooling is evolving

[Vite](https://github.com/vitejs/vite)'s novel approach to web dev tooling, [together](https://vitejs.dev/guide/comparisons.html) with [@web/dev-server](https://modern-web.dev/docs/dev-server/overview/) and [Snowpack](https://www.snowpack.dev/), paved the way to a renaissance in dev tools exploration. Removing bundling during dev through JIT transpilations of files in a dedicated server allowed these projects to offer an incredible fast feedback loop while developing without losing the state of art optimizations like bundling and minification for production builds. 

The release of [WMR](https://github.com/preactjs/wmr) from the Preact team solidified this path and brought new ideas to the table. In particular, their universal plugin format based on rollup plugins let them and other devs share the same transform code in dev and build time. Vite 2 continues this exploration, incorporating what is proving to work well in Snowpack and WMR and taking the opportunity to apply what has been learned in the past months.

All of these tools are framework agnostic, you can use Vite to develop React with fast refresh for example. But, interestingly, the teams behind Vue, Preact, and Svelte are at the forefront of this new generation of dev tools. Vite is being developed by [Evan You](https://twitter.com/youyuxi) and the Vue community, WMR is an effort from the Preact ecosystem and the Svelte guild will surely get more involved in Snowpack dev now that they have chosen it for [Svelte Kit](https://svelte.dev/blog/whats-the-deal-with-sveltekit). I think this marks an inflection point for UI frameworks, and we will see a lot of innovation in DX, SSR, and SSG in the future.

::: tip
If you are new to this new breed of tools, [Evan You's talk at VueToronto](https://www.youtube.com/watch?v=xXrhg26VCSc) is a good place to start. There is also a [Toolsday episode with Jason Miller about WMR](https://toolsday-656ce866.simplecast.com/episodes/wmr-with-jason-miller-KtTMlNGK) and a [The Web Platform episode with Fred K. Schott about Snowpack](https://thewebplatformpodcast.com/200-pika-and-snowpack). Another great talk is [Futuristic Web Development by Rich Harris](https://www.youtube.com/watch?v=qSfdtmcZ4d0), about why Svelte is also embracing this approach.
:::

## Powered by VitePress

[This page](https://patak.dev) is built using [VitepPress](https://vitepress.vuejs.org/), which now uses Vite 2. It is a great way to experience the developing flow that Vite unlocks. VitePress is a Vue-powered static site generator that is pushing the boundaries in both DX and performance. Because of the use of templates in Vue, static blocks can be detected to avoid hydration penalties. Dynamic Vue components can still be interleaved in markdown. 

The post is converted into a vue component so the composition API can be used to add reactive state to your documents. Components can also be imported and used in the markdown. VitePress is still able to identify the static parts of the post and only include the minimal code needed to hydrate the dynamic blocks.

```md
<script setup>
import FiltersPlayground from './FiltersPlayground.vue'
</script>

# CSS Filters Playground

Use the component in your markdown docs

<FiltersShowcase/>
```

<script setup>
import FiltersPlayground from './FiltersPlayground.vue'
</script>

<FiltersPlayground/>

When you are playing with the sliders, you may arrive at a pleasant result by exploration. It is possible because you see the results of your changes instantly. If you need to wait even a few seconds when changing the values, it can't work. The same idea applies to Vite. It enables us to craft our apps or pages with a tight feedback loop. We see the result of our changes immediately, and it opens the door to workflows that were not possible before.

## What is new in Vite 2

You can check [the discussion](https://github.com/vitejs/vite/issues/1207) that Evan started with the rationale for this next iteration. For a complete list of features check the [Vite docs](https://vitejs.dev). It already supported most of the common dev flows out of the box, like JSX, Typescript, importing CSS and JSON, and also powerful features like [importing wasm files](https://vitejs.dev/guide/features.html#web-assembly) and [inline Web Workers](https://vitejs.dev/guide/features.html#web-workers).
What follows is a list of the biggest changes and new features in the new release. 

### Vite docs

Vite has a new [docs site](https://vitejs.dev/) built with [VitePress](https://vitepress.vuejs.org/). This is a great example of the dogfooding that is prevalent in the Vue ecosystem. In this case, previously with VuePress and now with Vite and VitePress, they can find issues and optimizations in vue core by pushing the envelope of what a SSG based in Vue can achieve.

[![](/images/vite-2-docs.jpg)](https://vitejs.dev)

The [Features page](https://vitejs.dev/guide/features.html) is an excellent place to learn about Vite 2 out of the box features. If you are migrating from Vite v1, check the [dedicated migration page](https://vitejs.dev/guide/migration.html). There is also a [Config reference](https://vitejs.dev/config/) available. There is also a [Comparisons page](https://vitejs.dev/guide/comparisons.html) that is a good place to learn about the differente tradeoffs that Vite is taking compared to other tools.

There is an official [Awesome Vite List](https://github.com/vitejs/awesome-vite) for communinity plugins, apps using Vite and other interesting resources around the Vite ecosystem.

### Framework agnostic core

All Vue related handling has been moved to a [dedicated plugin](https://github.com/vitejs/vite-plugin-vue), that plays by the same rules as the plugins for other frameworks like React, Preact, and Svelte. The [react plugin](https://github.com/vitejs/vite-plugin-react) is also part of the monorepo.
The new [monorepo organization](https://github.com/vitejs/vite/tree/main/packages) of the repository showcases this move:

```
packages
  create-app
  playground
  plugin-legacy
  plugin-react-refresh
  plugin-vue-jsx
  plugin-vue
  vite
```

### New universal plugin format

The new [vite plugins](https://vitejs.dev/guide/api-plugin.html) format, [inspired](https://vitejs.dev/guide/comparisons.html#wmr) by the work of [WMR](https://github.com/preactjs/wmr), enables to share plugins code at dev and build time. From Vite's source docs:

> Vite plugins support a subset of Rollup plugin API with a few extra vite-specific options. A valid vite plugin is also a valid Rollup plugin. On the contrary, a Rollup plugin may or may NOT be a valid vite universal plugin, since some Rollup features do not make sense in an unbundled dev server context. That said, as long as a rollup plugin doesn't have strong coupling between its bundle phase and output phase hooks then it should just work (that means, most of them).
> By default, the plugins are run during both serve and build. When a plugin is applied during serve, it will only run **non output plugin hooks** (see rollup type definition of [Rollup Plugin Hooks](https://rollupjs.org/guide/en/#build-hooks)). You can think of the dev server as only running `const bundle = rollup.rollup()` but never calling `bundle.generate()`.

This new plugin format allows Vite to reuse a log of plugins from the rollup ecosystem and also share more code with WMR. I am maintaining a list of Vite compatible official rollup plugins at [Vite Rollup Plugins](https://vite-rollup-plugins.patak.dev/).

### Error overlay

Following other tools, Vite will now display an error overlay in the browser when there is a compiler error or failed resolve in the code. This feature can be disabled using `hmr: { overlay: false }` in `vite.config.js`

[![](/images/vite-2-error-overlay.jpg)](https://twitter.com/youyuxi/status/1338323327971110912)

### Lib mode

Vite now supports [building libraries](https://twitter.com/youyuxi/status/1343291778745720834). Changes to the source code will be watched by Vite, so for browser-centric libs, you can have a great dev experience and optimized builds. The following config defaults to building the library in both `'es'` and `'umd'` format. `'cjs'` and `'iife'` can be added using [`formats`](https://vitejs.dev/config/#build-lib).

`vite.config.js`
```js
const path = require('path')

module.exports = {
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.js'),
      name: 'LibName'
    }
  }
}
```

### Multi entry mode

There can now be multiple entry points, and Vite will perform [auto code splitting for JS and CSS](https://twitter.com/youyuxi/status/1341864579182301191) when building them.

`vite.config.js`
```js
const { resolve } = require('path')

module.exports = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'nested/index.html')
      }
    }
  }
}
```

### Strong caching of npm deps

When importing [npm dependencies](https://vitejs.org/guide/features.html#npm-depndency-resolving), they will now be using disk or memory cache after the first load. The cache will auto invalidates if you upgrade the dependency to a newer version, but the imports will not even hit the dev server once they are cached by the browser.

[![](/images/vite-2-dependencies.jpg)](https://twitter.com/youyuxi/status/1341787928540930048)

### Other highlights

There are other important improvements in the new version. These are some of the enhancements from the release changelog that are not expanded in this post.

- Middleware mode, allowing Vite to run as part of existing express compatible servers
- Default to modern only, Opt-in to legacy mode
- [Revised config format](https://vitejs.dev/guide/migration.html#config-options-change)
- Smaller and faster install
- [Improved JS API](https://vitejs.dev/guide/api-javascript.html)
- [HMR API alignment with other tools](https://vitejs.dev/guide/migration.html#hmr-api-change)
- Improved alias and resolving
- Better vue perf (single request in most cases)
- Support native esm config files
- Auto restart server on config and .env changes
- Support for [Vue JSX with HMR](https://github.com/vitejs/vite/tree/main/packages/plugin-vue-jsx)
- Support using variables in dynamic imports, like ``await import(`./views/${view}.js`)``

## Feeling the speed

As Evan [has said](https://www.youtube.com/watch?v=xXrhg26VCSc), you need to try it out to get a feeling of the raw speed that Vite is capable of. To create a new vite App you can use

```bash
npm init @vitejs/app
```

You will be prompted to choose a project name and a template

```bash
√ Project name: · my-fast-app
Scaffolding project in path/my-fast-app...
? Select a template: ...
> vanilla
  vue
  vue-ts
  react
  react-ts
```

Once the app is created, start the dev server with

```bash
cd my-fast-app
npm install
npm run dev
```

Modify the files with the browser open to see your modifications be reflected instantly. A nice way to test how fast Vite updates the app is to toggle auto save, and then play with CSS or modify the files. It should feel like you are directly using the browser dev tools (in [VS Code](https://code.visualstudio.com/docs/editor/codebasics#_save-auto-save), you can enable it using `Cmd+Shift+P` then type "Auto Save" and fire the `File: Toggle Auto Save` action).

## An immediate connection

There will continue to be a lot of [healthy cross-pollination](https://vitejs.dev/guide/comparisons.html) between the Vite, Snowpack, and WMR. These tools are paving the way for a future where we can get back to have that lost magical experience of an instant feedback loop between our code changes and our pages. Like [Bret Victor](http://worrydream.com/) said in his marvelous talk [Inventing on Principle](https://youtu.be/PGDrIy1G1gU), creators need an immediate connection to what they are creating. 

[![](/images/vite-2-polar.jpg)](https://100.antfu.me/005?q=(cos(2t*(r-1))-sin(t%2B5*th))*.5+)

A good example of this principle in practice was [the release](https://twitter.com/aemkei/status/1323399877611708416) of [tixy.land by Martin Kleppe](https://tixy.land), a minimalist creative coding environment. When you change the function, you see the visual creation instantly. Interesting results can be found by playing and tinkering with the variables. [Tons of examples were shared](https://twitter.com/aemkei/status/1326637580486578177), and it inspired similar experiments like [Polar by Anthony Fu](https://100.antfu.me/005). Apart from showcasing the importance of the immediate connection between the code and the result, Polar was [developed and built with Vite](https://github.com/antfu/100). [Rahul Kadyan is using Vite to implement VueDX Preview](https://twitter.com/znck0/status/1340614996410081280), a realtime preview for Vue 3 components in Visual Studio that gets us closer to the creative environments that Bret Victor was advocating for.

Vite is well-positioned to keep pushing the boundaries of web dev tooling. It is hard to explain how much of a leap forward in DX these tools bring to the table. If you haven't tried it yet, give it a spin, it'll be worth it.

<br>
<br>
<br>

*Other posts*

**[Ignorable Watch](../vue/ignorable-watch.md)**
<br>*VueUse's ignorableWatch, useRefHistory and watch flush modes*

**[History and Persistence](../vue/history-and-persistence.md)**
<br>*useRefHistory and useLocalStorage as building blocks to create new composables*

**[Mark Raw Optimization](../vue/mark-raw-optimization.md)**
<br>Using markRaw to optimize VueUse's useRefHistory composable





