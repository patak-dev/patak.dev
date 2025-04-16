---
title: The Vite Ecosystem
author:
  name: Matias Capeletto
date: 2021-11-30
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: The Vite Ecosystem
  - - meta
    - property: og:image
      content: https://www.patak.dev/images/vite-ecosystem-cover.jpg
  - - meta
    - property: og:url
      content: https://www.patak.dev/vite/ecosystem.html
  - - meta
    - property: og:description
      content: An exploration of the projects, teams and individuals collaborating to push Vite and the DX of our frontend tooling forward
  - - meta
    - name: twitter:card
      content: summary_large_image
---

<BlogCover src="/images/vite-ecosystem-cover.jpg" />

<script setup>
import Project from './Project.vue'
import ProjectLinks from './ProjectLinks.vue'
</script>

# The Vite Ecosystem

One of the strongest points in Vite is the ecosystem around it. Vite took responsibilities from frameworks ([common web patterns](https://vitejs.dev/guide/features.html#features), [glob imports](https://vitejs.dev/guide/features.html#glob-import), [HMR API](https://vitejs.dev/guide/api-hmr), [SSR primitives](https://vitejs.dev/guide/ssr.html), [build optimizations](https://vitejs.dev/guide/features.html#build-optimizations)), freeing other maintainers from reinventing the wheel each time by offering a common ground where to collaborate, fostering a lot of explorations in the space. Maintainers from several popular frameworks have chosen Vite as their recommended build tool, and are now deeply involved in Vite core development, participating in discussions and directly working on fixes and features. Vite exposes a flexible [JavaScript API](https://vitejs.dev/guide/api-javascript.html#build), allowing integrations with backend frameworks like [Rails](https://rubyonrails.org/) and [Laravel](https://laravel.com/), or other dev tools like [Cypress](#cypress) and [Storybook](#storybook). Vite plugins API is compatible with Rollup, enabling Vite to leverage the Rollup plugins ecosystem. A very active community of plugin maintainers is advancing DX on every front.

> _Vite really is turning out to be more than I expected: it's now being used with not just Vue, but React, Svelte, Solid, Marko, Astro, Shopify Hydrogen, plus integrations with Storybook, Laravel, Rails etc (some combine it with InertiaJS)..._ - [Evan You](https://twitter.com/youyuxi/status/1443617040741408768)

In this post, we'll look at some of the teams and people in the ecosystem. At the risk of not mentioning a project or person that is important to the community, I still think it is a good idea to show how many people are working together to advance Vite forward. The ecosystem is already big enough that I won't pretend to cover every project, and it is also the story visible to me from my field of view centered in Vite core. Apologies in advance in case you don't find yourself in the post. Please [share your work](https://chat.vitejs.dev) with the community, I'm eager to learn more about what you are creating with Vite. I hope this post will reinforce the idea of Vite as a collaborative effort. If you are interested in web tooling, Vite is a great place to get involved and help push DX for everybody forward.

The focus is on highlighting the ongoing collaboration between the different teams. If you want to learn more about each project, there are links to their homepage, GitHub, community, and where possible a direct only playground to tinker with them. Enough introduction, let's take a walk around the Vite Ecosystem.

<ProjectLinks />

## On the shoulder of giants

<Project
name="vite"
home="vitejs.dev"
github="vitejs/vite"
npm="vite"
discord="chat.vitejs.dev"
twitter="vite_js"
stackblitz="vite.new"
>

After its second massive sprint that resulted in the [release of Vite 2](../web/vite-2.md), [Evan You](https://twitter.com/youyuxi) opened up the maintenance of the project by [setting up the Vite Team](https://github.com/vitejs/vite/discussions/2601). There is now a tight-knit team led by Evan pushing the project forward, working closely with other teams in the ecosystem to ensure that Vite works smoothly for their frameworks and integrations. There are now more than [400 contributors to the repo](https://github.com/vitejs/vite/graphs/contributors), and a [lively community in Discord](https://chat.vitejs.com). The project is growing quickly. It is being used by more than [75k other projects in GitHub](https://github.com/vitejs/vite/network/dependents?package_id=UGFja2FnZS0xMTA1NzgzMTkx), and the [`vite` package](https://www.npmjs.com/package/vite) has more than 1.3M npm monthly downloads.

</Project>

<Project
name="rollup"
home="rollupjs.org"
github="rollup/rollup"
npm="rollup"
discord="is.gd/rollup_chat"
twitter="rollupjs"
stackblitz=""
>

[Rollup](https://rollupjs.org/) is a fundamental piece. Vite can be thought of as an opinionated Rollup setup coupled with a snappy dev server. One of Rollup core maintainers, [@lukastaegert](https://twitter.com/lukastaegert), recommended it as THE web development wrapper for Rollup that has been missing for a long time. Vite's compatibility with the Rollup Plugins ecosystem gave Vite a head start, and we are seeing a lot of adoption coming from Rollup setups. It is awesome to see Rollup maintainers [reaching out to Vite and WMR maintainers](https://github.com/rollup/rollup/pull/4230#issuecomment-927237678) when extending their plugin API to ensure that the ecosystem remains compatible.

</Project>

<Project
name="esbuild"
home="esbuild.github.io"
github="evanw/esbuild"
npm="esbuild"
twitter="evanwallace"
>

[esbuild](https://esbuild.github.io/) is a bundler written in Go, pushing the limits of build tool performance. Vite uses esbuild to transpile individual files (to strip typescript types and compile JSX) and as the default minifier (for both JS and CSS files). It is also used as a bundler when pre-bundling dependencies during dev. [@evanwallace](https://twitter.com/evanwallace) has been doing a stellar job. esbuild is improving daily, providing Vite with a fast alternative to tsc, babel, and Rollup depending on the task.

</Project>

<Project
name="typescript"
title="Typescript"
home="typescriptlang.org"
github="microsoft/TypeScript"
npm="typescript"
twitter="TypeScript"
discord="discord.gg/typescript"
>

[Typescript](https://typescriptlang.org) has taken the JS world by storm. Vite [supports importing `.ts` files out-of-the-box](https://vitejs.dev/guide/features.html#typescript). Internally, esbuild is used to strip the types, avoiding costly type checking in the critical path when transpiling sources for the browser. This is important to get the best HMR experience possible. If you are using a modern IDE like [VS Code](https://code.visualstudio.com/docs/languages/typescript), you'll get most information through IntelliSense as you code. You can also run `tsc` during build time, or use a plugin like [rollup-plugin-typescript2](https://github.com/ezolenko/rollup-plugin-typescript2). [@fi3ework](https://twitter.com/fi3ework)'s [vite-plugin-checker](https://github.com/fi3ework/vite-plugin-checker#readme) is another interesting option allowing you to run TypeScript in a worker thread.

</Project>

<Project
name="babel"
home="babel.dev"
github="babel/babel"
npm="@babel/core"
twitter="babeljs"
>

Vite doesn't need [babel](https://babeljs.io/) for most setups, avoiding the need for its heavy AST pipeline. But the React ecosystem heavily relies on babel for HMR and other compile-based solutions like CSS-in-JS libraries. It is currently used in [@vitejs/plugin-react](https://github.com/vitejs/vite/tree/main/packages/plugin-react) and in [@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy) to provide support for legacy browsers. The [Parcel](https://parceljs.org/) and [Next.js](https://nextjs.org/) teams are working on porting the most used plugins to [SWC](https://swc.rs/), a Rust toolchain. Vite could move from babel to SWC once these efforts mature (early explorations: [SWC based @vitejs/plugin-legacy](https://github.com/vitejs/vite/pull/4105), [unplugin-swc](https://github.com/egoist/unplugin-swc), [vite-plugin-swc-react](https://github.com/iheyunfei/vite-on-swc)).

</Project>

<Project
name="postcss"
title="PostCSS"
home="postcss.org"
github="postcss/postcss"
npm="postcss"
twitter="postcss"
>

Vite encourages the use [PostCSS](https://postcss.org), supporting it out-of-the-box. [Other CSS Pre-processors are also supported](https://vitejs.dev/guide/features.html#css-pre-processors) by manually adding them to the project dependencies. But PostCSS is more aligned with Vite's vision, allowing the use of [CSSWG drafts](https://drafts.csswg.org/) like [postcss-nesting](https://github.com/csstools/postcss-nesting) today, keeping your CSS standards-compliant for the future.

</Project>

## Other explorations

<Project
name="snowpack"
title="Snowpack"
home="snowpack.dev"
github="snowpackjs/snowpack"
npm="snowpack"
discord="discord.gg/snowpack"
twitter="snowpackjs"
>

[Snowpack](https://www.snowpack.dev/) leverages JavaScript's native module system to avoid unnecessary work and stay fast no matter how big your project grows. It helped to establish the benefits of an ESM first approach to dev tooling. Snowpack and Vite influenced each other, with discussions to standardize the HMR API and techniques to loading packages in a mixed CJS and ESM world. Snowpack core team members ([@FredKSchott](https://twitter.com/FredKSchott), [@drwpow](https://twitter.com/drwpow), [@matthewcp](https://twitter.com/matthewcp), [@n_moore](https://twitter.com/n_moore)) are now working on [astro](https://astro.build/), an Islands-based SSG framework now powered by Vite. Both communities are collaborating, applying the lessons learned while working on Snowpack to improve Vite core.

</Project>

<Project
name="wmr"
title="WMR"
home="wmr.dev"
github="preactjs/wmr"
npm="wmr"
slack="chat.preactjs.com"
>

[WMR](https://github.com/preactjs/wmr) is similar in scope and philosophy to Vite, and it is developed by the [Preact](https://preactjs.com/) team. [@\_developit](https://twitter.com/_developit) pioneered with WMR the universal Rollup plugin API, a scheme that allows to use Rollup plugins during dev and build time tapping into the rich Rollup ecosystem. Vite 2 Plugin API is based on WMR's approach, with added Vite-specific hooks. Vite and WMR collaborated to unify URL suffix modifiers and other features.

</Project>

<Project
name="modern-web"
title="Web Dev Server"
home="modern-web.dev"
github="modernweb-dev/web"
slack="modern-web.dev/discover/slack/"
twitter="modern_web_dev"
>

[Web Dev Server](https://modern-web.dev/docs/dev-server/overview/) takes a more lower-level approach, requiring a manual Rollup setup for the production build. The modern web project encompasses several explorations and includes tools that could be used in a Vite setup, like the [Web Test Runner](https://modern-web.dev/docs/test-runner/overview/) that some community members are using with [vite-web-test-runner-plugin](#vite-web-test-runner-plugin).

</Project>

## UI Frameworks

<Project
name="vue"
title="Vue"
home="v3.vuejs.org"
github="vuejs/vue-next"
npm="vue-next"
discord="chat.vuejs.org"
twitter="vuejs"
stackblitz="vite.new/vue"
>

With [Evan You](https://twitter.com/youyuxi) as the creator and project lead, and two other Vue core team members ([@antfu](https://twitter.com/antfu7) and [@sodatea](https://twitter.com/haoqunjiang)) in the Vite core team, it isn't a surprise that the Vue team is now recommending using the Vite powered [create-vue](https://github.com/vuejs/create-vue) scaffolding tool for new projects. Support for Vue 3 is achieved with [@vitejs/plugin-vue](https://github.com/vitejs/vite/tree/main/packages/plugin-vue), and Vue 2 using [vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2). Vite will see massive adoption in the Vue ecosystem, with most projects planning or already implementing support for Vite and enabling it by default in some cases ([Nuxt](https://v3.nuxtjs.org), [Vuetify](https://next.vuetifyjs.com/en/getting-started/installation/#vite), [Quasar](https://quasar.dev/start/vite-plugin)). There are also new Vue projects that born directly to take advantage of Vite speed and features ([VitePress](#vitepress), [iles](#iles), [Slidev](#slidev))

</Project>

<Project
name="react"
title="React"
home="reactjs.org"
github="facebook/react"
npm="react"
discord="discord.gg/reactiflux"
twitter="reactjs"
stackblitz="vite.new/react"
>

[React](https://reactjs.org/) is supported in Vite through [@vitejs/plugin-react](https://github.com/vitejs/vite/tree/main/packages/plugin-react). [@alecdotbiz](https://twitter.com/alecdotbiz), one of Vite's core maintainers, has been working hard to smooth the experience. We see a lot of usage from the React ecosystem, mainly for prototyping and in libraries examples. [React Router Docs](https://reactrouter.com/), for example, includes Vite environments using [StackBlitz](https://stackblitz.com/) [Web Containers](https://blog.stackblitz.com/posts/introducing-webcontainers/). [Next.js](https://nextjs.org/) is betting on a Webpack plus SWC future. So there isn't much Vite usage for complex SSR React apps. But there are Next-inspired frameworks based on Vite starting to appear, like [rakkas](https://rakkasjs.org/) and [vitext](https://github.com/Aslemammad/vitext).

</Project>

<Project
name="preact"
title="Preact"
home="preactjs.com"
github="preactjs/preact"
npm="preact"
slack="chat.preactjs.com"
twitter="preactjs"
stackblitz="vite.new/preact"
>

With the [Preact](https://preactjs.com) team developing [WMR](https://github.com/preactjs/wmr), we can expect that they will suggest it as their recommended build tool. They are nonetheless also offering official support for Vite with [@preact/preset-vite](https://github.com/preactjs/preset-vite). [@marvinhagemeist](https://twitter.com/marvinhagemeist), part of Preact core team, in particular, has been close to the Vite community and actively participated in discussions related to security and compatibility between the two ecosystems (both in [aligning features](https://github.com/preactjs/wmr/issues/452#issuecomment-803569329) and in ensuring plugins works in Vite and WMR).

</Project>

<Project
name="svelte"
title="Svelte"
home="svelte.dev"
github="sveltejs/svelte"
npm="svelte"
discord="svelte.dev/chat"
twitter="sveltejs"
stackblitz="vite.new/svelte"
>

The [Svelte](https://svelte.dev/) team is one of the most active contributors to Vite. Support for Svelte is achieved with [vite-plugin-svelte](https://github.com/sveltejs/vite-plugin-svelte). [SvelteKit](https://kit.svelte.dev/) is powered by Vite, and we can expect that there will be a push for using Vite in their ecosystem. [@Rich_Harris](https://twitter.com/Rich_Harris) came up with a generic SSR scheme for SvelteKit, that Evan You later ported to Vite resulted in one of its key features. Being able to share SSR primitives was crucial to foster the current innovation in Vite-based SSG and SSR frameworks. [@GrygrFlzr](https://twitter.com/GrygrFlzr), [@benmccann](https://twitter.com/benjaminmccann), [@dominikg](https://github.com/dominikg), and [@bluwyoo](https://twitter.com/bluwyoo) are very close to the project and with SvelteKit being one of the more advanced frameworks using Vite, both teams have been heavily collaborating.

</Project>

<Project
name="marko"
home="markojs.com"
github="marko-js/marko"
npm="marko"
discord="discord.gg/marko"
twitter="MarkoDevTeam"
stackblitz=""
>

The [marko](https://markojs.com/) team is maintaining [@marko/vite](https://github.com/marko-js/vite#readme) as an official plugin for Vite, and they offer [Vite-based starters](https://twitter.com/markodevteam/status/1386733591296561153). [@dylan_piercey](https://twitter.com/dylan_piercey) and [@RyanCarniato](https://twitter.com/RyanCarniato) have been close to the project, pushing for features like [Zero JS](https://github.com/vitejs/vite/issues/3127) and [SSR streaming](https://github.com/vitejs/vite/issues/3163) support.

</Project>

<Project
name="solid"
title="Solid"
home="solidjs.com"
github="solidjs/solid"
npm="solid-js"
discord="discord.com/invite/solidjs"
twitter="solid_js"
stackblitz="stackblitz.com/edit/solid-vite?file=src%2Findex.tsx"
>

The [Solid](https://www.solidjs.com/) team is also maintaining an official plugin for Vite, [vite-plugin-solid](https://github.com/solidjs/vite-plugin-solid). Their starter templates are also using Vite, they are working in [SolidStart](https://github.com/solidjs/solid-start), a Vite-powered App Framework. [@RyanCarniato](https://twitter.com/RyanCarniato) has been quite active in the Vite community, checkout for example [his demo using Vite and Solid](https://twitter.com/RyanCarniato/status/1453283158149980161?s=20) to take advantage of [Vercel Edge Functions](https://vercel.com/features/edge-functions) streaming capabilities.

</Project>

<Project
name="lit"
home="lit.dev"
github="lit/lit"
npm="lit"
slack="lit.dev/slack-invite"
twitter="buildWithLit"
stackblitz="vite.new/lit"
>

The [lit](https://lit.dev/) team released a new version of their framework. There is a starter template in the Vite monorepo, so it is available in create-vite. There isn't a plugin to enable HMR in lit projects, but the lit team was interested in creating one.

</Project>

## App Frameworks

<Project
name="nuxt"
title="Nuxt"
home="v3.nuxtjs.org"
github="nuxt/framework"
npm="nuxt"
discord="discord.com/invite/ps2h6QT"
twitter="nuxt_js"
stackblitz="stackblitz.com/fork/github/nuxt/starter/tree/stackblitz"
>

The [Nuxt team](https://nuxtlabs.com/) has worked closely with the Vite team to ensure that Vite works smoothly in Nuxt. They created [nuxt-vite](https://vite.nuxtjs.org/) that integrates Vite with Nuxt 2. And in its next iteration, [Nuxt 3](https://v3.nuxtjs.org/) will use Vite by default. The Nuxt team took an interesting approach regarding build tools, abstracting the framework from the used build tool. Users will be able to choose between both Vite and [Webpack 5](https://webpack.js.org/). Nuxt 3 will allow other projects in the Vue ecosystem, like [Vue Storefront](https://www.vuestorefront.io/) to enjoy Vite's DX. As a colorful note, [@antfu](https://twitter.com/antfu7), responsible for a big chunk of the DX innovation in the ecosystem (as you'll see in this post), is now working in the Nuxt Team.

</Project>

<Project
name="sveltekit"
title="SvelteKit"
logo="sveltekit.png"
home="kit.svelte.dev/"
github="sveltejs/kit"
npm="@sveltejs/kit"
discord="svelte.dev/chat"
twitter="sveltejs"
stackblitz="node.new/sveltekit"
>

[SvelteKit](https://kit.svelte.dev/) is an application framework powered by [Svelte](#svelte), pushing forward their ideas of [transitional apps](https://www.youtube.com/watch?v=860d8usGC0o) for modern web development. The Svelte and Vite teams are fluently collaborating, improving Vite's SSR primitives, the Server API, and quality in general. Vite has improved a lot due to SvelteKit pushing its limits.

</Project>

<Project
name="astro"
title="Astro"
home="astro.build"
github="withastro/astro"
npm="astro"
discord="astro.build/chat"
twitter="astrodotbuild"
stackblitz="stackblitz.com/fork/astro"
>

The [astro](https://astro.build/) team [reworked their engine to use Vite](https://astro.build/blog/astro-021-preview/#hello-vite) and they have become a key player in the ecosystem. Astro is pushing Vite's limits in several areas that no other framework exercised before, and they have been improving core as they explore. Their experience in ESM tooling will be crucial for Vite moving forward.

</Project>

<Project
name="iles"
logo="iles.jpg"
home="iles-docs.netlify.app"
github="ElMassimo/iles"
npm="iles"
discord="discord.gg/PkbxgzPhJv"
twitter="ilesjs"
stackblitz="stackblitz.com/fork/iles?file=src%2Fcomponents%2FWelcome.vue"
>

[@MaximoMussini](https://twitter.com/MaximoMussini) created [iles](https://iles-docs.netlify.app/), a framework that lets you create islands of interactivity with Vue powered by Vite. Inspired by Astro and VitePress, iles is a good example of the kind of [explorations that Vite is enabling]([iles podcast](https://viewsonvue.com/islands-architecture-in-vue-with-m-ximo-mussini-vue-170). Maximo has been an active community member, also pushing for Vite's adoption in the [Rails](#vite-ruby) community.

</Project>

<Project
name="vitepress"
title="VitePress"
logo="vitepress.png"
home="vitepress.vuejs.org"
github="vuejs/vitepress"
npm="vitepress"
stackblitz=""
>

[VitePress](https://vitepress.dev/) is a fresh take on [VuePress](https://v2.vuepress.vuejs.org/), taking the opportunity to see rethink what a Vue-powered static site generator can look like using Vue 3 and Vite. Evan You developed VitePress in tandem with Vite, a great use case to test and inform Vite design. VitePress has seen a lot of adoption for documentation: [Vite](https://vite.dev), [Vue Blog](https://blog.vuejs.org), [VueUse](https://vueuse.org/), [Pinia](https://pinia.esm.dev), [vite-ruby](https://vite-ruby.netlify.app), [vite-plugin-pwa](https://vite-pwa-org.netlify.app/), [Slidev](https://sli.dev), [windi](https://windicss.org), [laravel-vite](https://laravel-vite.innocenzi.dev) are just some examples. VuePress also implemented support for Vite with [@vuepress/bundler-vite](https://v2.vuepress.vuejs.org/reference/bundler/vite.html#vite).

</Project>

<Project
name="slinkity"
title="Slinkity"
home="slinkity.dev"
github="slinkity/slinkity"
npm="slinkity"
discord="discord.gg/GBkBy9u"
twitter="slinkitydotdev"
stackblitz="stackblitz.com/edit/node-v8mqfv"
>

[@bholmesdev](https://twitter.com/bholmesdev) et al are working on [Slinkity](https://slinkity.dev/), an islands SSG framework that glues [Eleventy](https://www.11ty.dev/) and Vite together. Inspired by [@Snugug](https://twitter.com/Snugug)'s [early work in vite-plugin-eleventy](https://snugug.com/musings/eleventy-plus-vite/) and frameworks like [Astro](#astro), Slinkity is opening the doors to 11ty users to the Vite ecosystem. It allows Eleventy projects to [leverage Vite's UI frameworks support](https://youtu.be/DqUGJyuX8m0), fast HMR, and Vite's rich plugin ecosystem.

</Project>

<Project
name="hydrogen"
title="Hydrogen"
logo="hydrogen.png"
home="hydrogen.shopify.dev"
github="Shopify/hydrogen"
npm="@shopify/hydrogen"
discord="discord.gg/ppSbThrFaS"
twitter="shopifydevs"
stackblitz="hydrogen.new"
>

Shopify chose Vite for its new React Store Front framework [Hydrogen](https://hydrogen.shopify.dev). The Hydrogen team is working with the React team to support [React Server Components](https://shopify.dev/custom-storefronts/hydrogen/framework/react-server-components) and streaming server-side rendering with suspense in Vite. [@jplhomer](https://twitter.com/jplhomer) has been very active in Vite's community. He has collaborated to improve Vite core and Vite's React support.

</Project>

<Project
name="rakkas"
logo="rakkas.png"
home="rakkasjs.org"
github="rakkasjs/rakkasjs"
npm="rakkasjs"
twitter="cyco130"
stackblitz="stackblitz.com/edit/rakkas-demo-ts?file=src%2Fpages%2Fpage.tsx"
>

[rakkas](https://rakkasjs.org/) is React SSR Framework powered by Vite, inspired by Next.js and SvelteKit. [@cyco130](https://twitter.com/cyco130), the author, has been active in the Vite community working with others to improve SSR in Vite.

</Project>

<Project
name="vite-plugin-ssr"
home="vite-plugin-ssr.com"
github="brillout/vite-plugin-ssr"
npm="vite-plugin-ssr"
discord="discord.com/invite/qTq92FQzKb"
twitter="brillout"
stackblitz=""
>

[vite-plugin-ssr](https://vite-plugin-ssr.com/) is another minimal SSR framework, developed by [@brillout](https://twitter.com/brillout). He has been very active in the Vite SSR space, helping others and contributing fixes and ideas to Vite core. vite-plugin-ssr aims to be a toolkit for SSR frameworks authors, offering a more streamlined experience over Vite's low-level SSR primitives. There are frameworks like and [vitext](https://github.com/Aslemammad/vitext), a React framework developed by [@asleMammadam](https://twitter.com/asleMammadam) that are built on top of it. [@brillout](https://twitter.com/brillout) is also working on other related projects like [telefunc](https://telefunc.com/) and Vike.

</Project>

<Project
name="vite-ssr"
logo="vite-ssr.png"
home="github.com/frandiox/vite-ssr#readme"
github="frandiox/vite-ssr"
npm="vite-ssr"
discord="discord.gg/PkbxgzPhJv"
>

[@frandiox](https://twitter.com/frandiox) created [vite-ssr](https://github.com/frandiox/vite-ssr#readme), as a simple yet powerful SSR solution for Vite in Node.js. It is another take in exposing Vite's SSR API as a high-level solution. He is also the creator of [vitedge](https://vitedge.js.org/), an edge-side rendering and fullstack Vite framework running on [Cloudflare Workers](https://workers.cloudflare.com/)

</Project>

## Integrations

<Project
name="vite-ruby"
home="vite-ruby.netlify.app"
github="ElMassimo/vite_ruby"
npm="vite-ruby"
discord="discord.gg/pC5sG7Gqh7"
stackblitz=""
>

[@MaximoMussini](https://twitter.com/MaximoMussini) created one of the first polished backend integrations with [vite-ruby](https://vite-ruby.netlify.app/), and allowed Vite to enter the Ruby community. Check out [the motivation section in the docs](https://vite-ruby.netlify.app/guide/introduction.html#why-vite-ruby-%F0%9F%A4%94) for a bit of the history of the project's inception. The [#rails channel in Vite Land](https://discord.gg/pC5sG7Gqh7) has seen a lot of activity, and this project inspired others to integrate Vite in their projects.

</Project>

<Project
name="laravel-vite"
home="laravel-vite.innocenzi.dev"
github="innocenzi/laravel-vite"
npm="laravel-vite"
discord="discord.gg/Td4us2BSaX"
stackblitz=""
>

[@enzoinnocenzi](https://twitter.com/enzoinnocenzi) created [laravel-vite](https://laravel-vite.innocenzi.dev/) to bring Vite and Laravel ecosystems together. Following the footsteps of [vite-ruby](https://vite-ruby.netlify.app/), Enzo's work has been a key factor to foster Vite's adoption in the Laravel community.

</Project>

<Project
name="fastify-vite"
logo="fastify.svg"
home="fastify-vite.dev/"
github="fastify/fastify-vite"
npm="fastify-vite"
discord="discord.gg/9gcAHEzKaX"
>

[fastify-vite](https://fastify-vite.dev/) is a minimal and fast alternative to full-blown SSR frameworks like Nuxt and Next. [@anothergalvez](https://twitter.com/anothergalvez) built fastify-vite as a [fastify-first solution](https://fastify-vite.dev/meta/philosophy.html#fastify-first) instead of a framework-first. There is a lot of synergy between the fastify and Vite communities. fastify-vite is pushing the adoption of both projects forward.

</Project>

## CSS Frameworks

<Project
name="tailwind"
title="Tailwind CSS"
home="tailwindcss.com"
github="tailwindlabs/tailwindcss"
npm="tailwindcss"
discord="tailwindcss.com/discord"
twitter="tailwindcss"
stackblitz=""
>

[Tailwind Labs](https://tailwindcss.com/) was one of the first teams to recognize Vite's potential, providing official integration examples for Vite very early and starting to sponsor the project. In response to the innovation in DX in the ecosystem, they released [Just-in-Time Mode](https://tailwindcss.com/docs/just-in-time-mode), an on-demand engine for Tailwind v2.1+ that provides a great experience when paired with Vite HMR. With frameworks like [Hydrogen](#hydrogen) pushing the Vite plus Tailwind CSS combo, there will be a new wave of adoption of Vite from Tailwind users.

</Project>

<Project
name="windicss"
title="Windi CSS"
home="windicss.org/"
github="windicss/windicss"
vite="windicss/vite-plugin-windicss"
npm="windicss"
discord="chat.windicss.org/"
twitter="windi_css"
stackblitz=""
>

[@satireven](https://twitter.com/satireven) created [WindiCSS](https://windicss.org/), a fast on-demand engine for Tailwind, and [@antfu](https://twitter.com/antfu7) used it to create [vite-plugin-windicss](https://github.com/windicss/vite-plugin-windicss), that offered unprecedented DX in loading and HMR speed. A lively community has now developed around the project. WindiCSS is now being used to power docs pages like [Nuxt 3](https://v3.nuxtjs.org/), and projects like [Slidev](https://sli.dev/).

</Project>

<Project
name="unocss"
title="UnoCSS"
home="unocss.antfu.me"
github="antfu/unocss"
npm="@unocss/core"
stackblitz=""
>

After his experience with Windi, [@antfu](https://twitter.com/antfu7) created [UnoCSS](https://github.com/antfu/unocss), an instant on-demand Atomic CSS engine toolkit. It once again showed how much space for improvement there is ahead of us. UnoCSS can be 200x faster than Windi CSS, beating by two orders of magnitude the fastest engine. You can read about the inception story here [Reimagine Atomic CSS](https://antfu.me/posts/reimagine-atomic-css) and [Icons in Pure CSS](https://antfu.me/posts/icons-in-pure-css). Anthony started this project as a Vite-only solution, but it is now available for other bundlers too. UnoCSS will power the next generation WindiCSS engine.

</Project>

<style scoped>
.plugins {
  margin-top: -1em;
  margin-bottom: 2em;
  display: grid;
  grid-template-columns: 13em 1fr;
  grid-auto-rows: 1.75em;
}
.plugins p:nth-child(odd) {
  justify-self: center;
}

@media (max-width: 820px) {
  .plugins {
    margin-top: -1em;
    margin-bottom: 2em;
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1.75em 2.25em;
  }
  .plugins p:nth-child(odd) {
    justify-self: left;
  }
}
</style>

## Plugins

<Project
name="awesome-vite-plugins"
logo="awesome-vite.svg"
title="Awesome Vite Plugins"
home="github.com/vitejs/awesome-vite#plugins"
github="vitejs/awesome-vite"
>

A list of [Vite plugins](https://vitejs.dev/guide/api-plugin.html) can be found in [Awesome Vite](https://github.com/vitejs/awesome-vite#plugins). There has been a lot of activity in the [Repo](https://github.com/vitejs/awesome-vite) due to new projects, templates, and plugins submissions, [@Scrum\_](https://twitter.com/Scrum_) has been doing a great job curating the list. There are tons of plugins, and the ecosystem is growing every day. Here are some examples to give you an idea of the features you have at your fingertips. Check out [Plugins section of Awesome Vite](https://github.com/vitejs/awesome-vite#plugins) to explore the complete list

<div class="plugins">

[vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages#readme)

File system based routing support

[vite-plugin-mpa](https://github.com/IndexXuan/vite-plugin-mpa#readme)

Out-of-the-Box MPA support for Vite

[vite-plugin-federation](https://github.com/originjs/vite-plugin-federation#readme)

Support Webpack like Module Federation

[vite-plugin-node](https://github.com/axe-me/vite-plugin-node#readme)

Use Vite as a node dev server

[vite-plugin-comlink](https://github.com/mathe42/vite-plugin-comlink#readme)

WebWorkers with [comlink](https://github.com/GoogleChromeLabs/comlink#readme)

[vite-plugin-rsw](https://github.com/lencx/vite-plugin-rsw#readme)

Support for [wasm-pack](https://rustwasm.github.io/wasm-pack/)

[vite-plugin-elm](https://github.com/hmsk/vite-plugin-elm)

Compile an Elm app/document/element on your project

[vite-plugin-qrcode](https://github.com/svitejs/vite-plugin-qrcode#readme)

Show QR code on server start to debug in mobile

[vite-plugin-full-reload](https://github.com/ElMassimo/vite-plugin-full-reload#readme)

Automatically page reload when files are modified

[vite-plugin-compress](https://github.com/alloc/vite-plugin-compress#readme)

Compress your bundle and assets from Vite

[vite-plugin-checker](https://github.com/fi3ework/vite-plugin-checker#readme)

TypeScript, VLS, vue-tsc, ESLint in worker thread

[vite-plugin-inspect](https://github.com/antfu/vite-plugin-inspect#readme)

Inspect the intermediate state of plugins

</div>

</Project>

<Project
name="awesome-rollup"
home="github.com/rollup/awesome#readme"
github="rollup/awesome"
>

The Rollup ecosystem maintains [core plugins in the Rollup org](https://github.com/rollup/plugins#readme), and there is a list of community plugins at [Awesome Rollup](https://github.com/rollup/awesome#plugins). [Vite Plugin API](https://vitejs.dev/guide/api-plugin.html) is [mostly compatible with Rollup](https://vitejs.dev/guide/api-plugin.html#rollup-plugin-compatibility). We are also maintaining a list of [Vite Rollup plugins compatibility](https://vite-rollup-plugins.patak.dev/). Since the Rollup ecosystem is getting closer to Vite, I hope we start seeing "Works in Vite" badges in Rollup plugins docs in the future. Some examples of compatible plugins:

<div class="plugins">

[@rollup/plugin-yaml](https://github.com/rollup/plugins/tree/master/packages/yaml)

Converts YAML files to ES6 modules

[rollup-plugin-typescript2](https://github.com/ezolenko/rollup-plugin-typescript2)

Run typescript with compiler errors

[rollup-plugin-critical](https://github.com/nystudio107/rollup-plugin-critical)

Generate critical CSS

</div>

</Project>

<Project
name="unplugin"
logo="unplugin.png"
home="github.com/unjs/unplugin#readme"
github="unjs/unplugin"
npm="unplugin"
>

[unplugin](https://github.com/unjs/unplugin#readme) is another [@antfu](https://twitter.com/antfu7) project, a unified plugin system for Vite, Rollup, Webpack, and possibly other bundlers in the future. Anthony has been migrating his plugins to use this library opens a big part of the DX innovation he brought to Vite to other build tools. This project is part of the [unjs umbrella](https://github.com/unjs), a collection of bundler-agnostic libraries from the [Nuxt team](https://github.com/nuxt) that they are extracting from their efforts to abstract Nuxt from the used build tool. Some examples include:

<div class="plugins">

[unplugin-icons](https://github.com/antfu/unplugin-icons)

Thousands of icons as components on-demand

[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

On-demand components auto importing for Vue

[unplugin-auto-import](https://github.com/antfu/unplugin-auto-import)

Auto import APIs on-demand with TS support

</div>

</Project>

<Project
name="vite-plugin-pwa"
home="vite-plugin-pwa.netlify.app"
github="antfu/vite-plugin-pwa"
npm="vite-plugin-pwa"
>

As a great example of the kind of plugins available when you use Vite, [vite-plugin-pwa](https://vite-plugin-pwa.netlify.app/) is a zero-config PWA framework-agnostic plugin for Vite that enables offline support via [Workbox](https://developers.google.com/web/tools/workbox). [@antfu](https://twitter.com/antfu7) and [@userquin](https://github.com/userquin) have built a polished and seamless experience for every framework.

</Project>

## Starters

<Project
name="replit"
title="Replit"
home="replit.com"
discord="discord.util.repl.co/join"
twitter="replit"
>

[Replit](https://replit.com/) was one of the first companies to [take advantage of Vite](https://blog.replit.com/vite) to give a better experience to their users, by switching their [React Starter Template](https://replit.com/@templates/Reactjs) to Vite. [@amasad](https://twitter.com/amasad)'s tweet [comparing this template to the CRA version](https://twitter.com/amasad/status/1355379680275128321) was later used in many blog posts and talks to illustrate the difference in load speed; "Vite ran before the container could even boot CRA files."

</Project>

<Project
name="glitch"
title="Glitch"
home="glitch.com"
twitter="glitchdevs"
>

[glitch](https://glitch.com) adopted Vite for their [Starter Projects](https://glitch.com/create-project). They used [Vite to do the heavy lifting](https://blog.glitch.com/post/a-closer-look-at-the-new-glitch-starter-apps). [keithkurson](https://twitter.com/keithkurson) [said](https://twitter.com/keithkurson/status/1382054337795411968): "It's been _so_ delightful to work with, and making it so that all of our starters have similar build patterns and Rollup plugins is going to be a huge value add for programmers on glitch"

</Project>

<Project
name="stackblitz"
title="StackBlitz"
home="stackblitz.com"
github="stackblitz/core"
discord="discordapp.com/invite/stackblitz"
twitter="stackblitz"
>

[StackBlitz](https://stackblitz.com) has made Vite a first class cityzen in their browser IDE. They worked to make Vite compatible with [WebContainers](https://github.com/stackblitz/webcontainer-core) (which included supporting [esbuild](https://esbuild.github.io/)). They have also worked with teams in the ecosystem to ensure that the most popular Vite frameworks work smoothly: [SvelteKit](https://blog.stackblitz.com/posts/sveltekit-supported-in-webcontainers/), [Hydrogen](https://blog.stackblitz.com/posts/shopify-hydrogen-in-stackblitz-webcontainers/), [Astro](https://blog.stackblitz.com/posts/astro-support/), and others. Due to how close the environment is to local, Vite Core has been suggesting the use of Stackblitz for minimal reproductions in bug reports. They also [added Vite starters](https://blog.stackblitz.com/posts/vite-new-templates/): [vite.new](https://vite.new), and [vite.new/{template}](https://vite.new/vue), and included Vite in their new dashboard, and are now the [largest sponsor to Vite](https://blog.stackblitz.com/posts/why-were-backing-vite/).

</Project>

<Project
name="vitesse"
title="Vitesse"
home="github.com/antfu/vitesse#readme"
github="antfu/vitesse"
npm="vitesse"
twitter="antfu7"
stackblitz=""
>

[Vitesse](https://github.com/antfu/vitesse) is a good example of a Vite Starter. It is a Vue 3 template that [@antfu](https://twitter.com/antfu7) has been using this starter to showcase some of the [best plugins in the ecosystem](https://github.com/antfu/vitesse#plugins) and it is [packed with features](https://github.com/antfu/vitesse#features): File based routing, auto imports, PWA, Windi CSS, SSG, critical CSS, to name a few. It is also a good example of a testing setup using [Cypress](#cypress).

</Project>

<Project
name="vitesse-webext"
title="WebExtension Vite Starter"
home="github.com/antfu/vitesse-webext#readme"
github="antfu/vitesse-webext"
npm="vitesse-webext"
twitter="antfu7"
stackblitz=""
>

Based on [Vitesse](https://github.com/antfu/vitesse), [WebExtension Vite Starter](https://github.com/antfu/vitesse-webext) is a Vite-powered [WebExtension](https://developer.chrome.com/docs/extensions/mv3/overview/) starter template. I wanted to include it to showcase the usage of Vite outside of a typical web app. This is one example of many efforts to use Vite in other envs, to be able to get Vite's fast HMR, features, and plugins.

</Project>

<Project
name="awesome-vite-templates"
logo="awesome-vite.svg"
title="Awesome Vite Templates"
home="github.com/vitejs/awesome-vite#templates"
github="vitejs/awesome-vite"
>

The Vite community is maintaining templates for different combinations of frameworks and tools. There is a huge list of options in the [Awesome Vite Templates section](https://github.com/vitejs/awesome-vite#templates).
If you would like to test them online, for a template like `https://github.com/{user}/{repo}` you can head to `https://stackblitz.com/github/{user}/{repo}` and start playing with it. If you prefer to run them locally, a tool like [degit](https://github.com/Rich-Harris/degit#readme) will let you get a fresh copy of a template using `degit user/repo`.

</Project>

## Testing

<Project
name="mocha-vite-puppeteer"
home="larsthorup/mocha-vite-puppeteer#readme"
github="larsthorup/mocha-vite-puppeteer"
npm="mocha-vite-puppeteer"
stackblitz=""
>

[@larsthorup](https://twitter.com/larsthorup) is developing [mocha-vite-puppeteer](https://github.com/larsthorup/mocha-vite-puppeteer), that allows running Mocha frontend tests with Vite and [Puppeteer](https://pptr.dev/). It lets you [run your tests as fast as Vite bundles your code](https://www.youtube.com/watch?v=uU5yKjojtq4).

</Project>

<Project
name="vite-jest"
home="github.com/sodatea/vite-jest#readme"
github="sodatea/vite-jest"
npm="vite-jest"
>

[@sodatea](https://twitter.com/haoqunjiang) is building [vite-jest](https://github.com/sodatea/vite-jest#readme), which aims to provide first-class Vite integration for [Jest](https://jestjs.io/). It is still a work-in-progress, due to [blockers in Jest](https://github.com/sodatea/vite-jest/blob/main/packages/vite-jest/README.md#vite-jest). You can track progress in [the First Class Jest Integration issue](https://github.com/vitejs/vite/issues/1955), and help move these efforts forward by joining the #testing channel in [Vite Land](https://chat.vitejs.dev).

</Project>

<Project
name="cypress"
title="Cypress"
home="cypress.io"
github="cypress-io/cypress"
npm="cypress"
discord="on.cypress.io/chat"
twitter="Cypress_io"
>

[Cypress](https://www.cypress.io/) has been integrating Vite in their products, and they have been quite active in the community. They are making their new [Cypress Component Testing](https://docs.cypress.io/guides/component-testing/introduction) be a good match for Vite's dev server. They are also re-building their App UI using [Vitesse](#vitesse). Check out [@\_jessicasachs](https://twitter.com/_jessicasachs)'s [VueConf US 2021 talk](https://www.youtube.com/watch?v=7S5cbY8iYLk) to learn more about why Cypress and Vite go well together.

</Project>

<Project
name="vite-web-test-runner-plugin"
title="Web Test Runner"
logo="modern-web.svg"
home="github.com/material-svelte/vite-web-test-runner-plugin#readme"
github="material-svelte/vite-web-test-runner-plugin"
npm="vite-web-test-runner-plugin"
>

[vite-web-test-runner-plugin](https://github.com/material-svelte/vite-web-test-runner-plugin#readme)
A [@web/test-runner](https://modern-web.dev/docs/test-runner/overview/) plugin to test Vite-powered projects. This plugin automatically connects to the Vite project in the current directory, loads the project configuration, and uses your already-configured Vite build pipeline to build each test file.

</Project>

## Other tools

<Project
name="storybook"
title="Storybook"
home="github.com/eirslett/storybook-builder-vite#readme"
github="eirslett/storybook-builder-vite"
npm="storybook"
discord="discord.gg/storybook"
twitter="storybookjs"
>

[@eirikobo](https://twitter.com/eirikobo), [@sasan_farrokh](https://twitter.com/sasan_farrokh), and [ianvanschooten](https://twitter.com/ianvanschooten) created [storybook-builder-vite](https://github.com/eirslett/storybook-builder-vite), which lets you use Vite to build your Storybook.
[Michael Shilman](https://twitter.com/mshilman) wrote a [blog post](https://storybook.js.org/blog/storybook-for-vite/) explaining in detail how this works and highlighting the benefits of the new builder: dramatically improved build speed, compatibility with your Vite project settings, and access to Vite's plugin ecosystem.

</Project>

<Project
name="tauri"
title="Tauri"
home="tauri.studio"
github="tauri-apps/tauri"
npm="@tauri-apps/tauri"
discord="discord.com/invite/tauri"
twitter="TauriApps"
>

[Tauri](https://tauri.studio) is a framework to desktop build applications with a web frontend. They added official starter templates for Vite using [vite-plugin-tauri](https://github.com/amrbashir/vite-plugin-tauri#readme), a plugin maintained by [@Amr\_\_Bashir](https://twitter.com/Amr__Bashir), a core Tauri team member. Vite + Tauri could be a great combo for native apps development. A quote from the Tauri team: ["Vite has a special place in Tauri's heart"](https://twitter.com/TauriApps/status/1381975542753280004).

</Project>

<Project
name="trois"
title="TroisJS"
logo="trois.jpg"
home="troisjs.github.io"
github="troisjs/trois"
npm="troisjs"
twitter="soju22"
stackblitz="stackblitz.com/edit/troisjs-cannonjs"
>

[troisjs](https://troisjs.github.io/) combines [ThreeJS](https://threejs.org/), [Vue 3](https://v3.vuejs.org/), and Vite to build a [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) like library for Vue. The [demos are incredible](https://stackblitz.com/edit/troisjs-cannonjs). [@Rich_Harris](https://twitter.com/Rich_Harris) recently unveiled [Svelte Cubed](https://svelte-cubed.vercel.app/) that offers the declarative 3D component-based scenes for Svelte. Vite's HMR is a perfect match to design 3D scenes, in fact some of the [react-three-fiber examples](https://github.com/pmndrs/react-three-fiber/tree/master/example) are using Vite now.

</Project>

<Project
name="slidev"
title="Slidev"
home="sli.dev"
github="slidevjs/slidev"
npm="slidev"
discord="chat.sli.dev"
twitter="Slidevjs"
stackblitz="sli.dev/new"
>

Another project from [@antfu](https://twitter.com/antfu7), [Slidev](https://sli.dev/) is a Markdown-based Slides Generator powered by Vite, Vue 3, and [Windi CSS](https://windicss.org). It is [packed with features](https://sli.dev/guide/#features) and the DX is precious, with Vite's HMR changes are reflected instantly in the slides. This is one of the best examples of the new wave of tools that Vite is making possible.

</Project>

<Project
name="viteshot"
title="Viteshot"
home="viteshot.com"
github="zenclabs/viteshot"
twitter="fwouts"
>

[@fwouts](https://twitter.com/fwouts)'s [Viteshot](https://viteshot.com/) allows you to [generate screenshots of UI components](https://www.youtube.com/watch?v=Ag5NBguCucc) within seconds. He is also working on [React Preview](https://reactpreview.com/) (soon to be rebranded as Preview JS), which provides instant previews of components and Storybook stories in Visual Studio Code.

</Project>

<Project
name="backlight"
title="Backlight"
home="backlight.dev"
github="divriots/browser-vite"
discord="discord.gg/XkQxSU9"
twitter="backlight_dev"
>

[Backlight](https://backlight.dev/) is a Design System platform from [\<div\>RIOTS](https://divriots.com/). They are using Vite to build their apps, [VitePress](#vitepress) for docs, and they are also working on [browser-vite](https://github.com/divriots/browser-vite), a fork of Vite which aims at being used in the browser (served by service worker).

</Project>

## Get involved!

If you reached this point, you are surely interested in Vite's ecosystem. You should join [Vite Land](https://chat.vitejs.dev/) if you aren't already there. Head to the #contributing channel and say hi, share your ideas and work with others.

## Final note

I could continue with [Vanilla Extract has an official integration for Vite](https://github.com/seek-oss/vanilla-extract/tree/master/packages/vite-plugin), [Craft CMS integration](https://nystudio107.com/blog/using-vite-js-next-generation-frontend-tooling-with-craft-cms), [Storyblok is using Vite in lib mode for their build setups](https://twitter.com/alexjoverm/status/1462756408693248003?s=20), [Vercel added zero configuration deploys for Vite](https://vercel.com/changelog/vite-projects-can-now-be-deployed-with-zero-configuration). But I needed to put the limit at one point to be able to publish this post, as I said, the ecosystem is already too big to try to explore it all in a single post.

There are also many individuals that I haven't had the chance to mention. Vite core team members and the triage team, doing an amazing job with the influx of issues. Long-term contributors that have been fixing issues and extending Vite features. The translation teams. Community members that are helping others to get started. And the list goes on. I want some of them to be part of this post, so here goes a final list of unordered names that didn't yet appear in the post: [@shinigami](https://twitter.com/Shini_92), [@underfin](https://github.com/underfin), [@egoist](https://twitter.com/_egoistlily), [@Linus_Borg](https://twitter.com/Linus_Borg), [@posva](https://twitter.com/posva), [@KiaKing85](https://twitter.com/KiaKing85), [@meteorlxy](https://github.com/meteorlxy), [@ygj6](https://github.com/ygj6),
[@OneNail](https://github.com/OneNail), [@Niputi\_](https://twitter.com/Niputi_), [@CHOYSEN](https://github.com/CHOYSEN), [@csr632](https://github.com/csr632), [@nihalgonsalves](https://github.com/nihalgonsalves), [@cawa-93](https://github.com/cawa-93), [@daychongyang](https://github.com/daychongyang), [@remorses](https://github.com/remorses), [@ydcjeff](https://github.com/ydcjeff), [@iheyunfei](https://github.com/iheyunfei), [@danielcroe](https://twitter.com/danielcroe), [@\_pi0\_](https://twitter.com/_pi0_), [@threepointone](https://twitter.com/threepointone), [@khalwat](https://github.com/khalwat), [@hannoeru](https://twitter.com/hannoeru), [@wheatjs](https://twitter.com/wheatjs), [@artursignell](https://twitter.com/artursignell), [@jgalbraith64](https://twitter.com/jgalbraith64), [@pcalloc](https://twitter.com/pcalloc), [@QC-L](https://github.com/QC-L), [@ShenQingchuan](https://github.com/ShenQingchuan), [@naokie](https://github.com/naokie), [@jay-es](https://github.com/jay-es), [@alexjoverm](https://twitter.com/alexjoverm), [@puruvjdev](https://twitter.com/puruvjdev) and all other contributors to [Vite Core](https://github.com/vitejs/vite/graphs/contributors) and the [Vite ecosystem](https://github.com/vitejs/awesome-vite/graphs/contributors). Let's keep building together!

<br>
<br>
<br>

_Last updated on 2021-11-30_ <br>

Connect with me on [Twitter @patak_dev](https://twitter.com/patak_dev) or in [Discord @patak](https://chat.vitejs.dev/).

If you want to help making my OS work sustainable, consider sponsoring me on [GitHub Sponsors](https://github.com/sponsors/patak-dev).

<br>
<br>

_Continue reading_

**[vite build](../vite/build.md)**
<br>_A walkthrough of the Vite codebase to understand how Vite bundles and optimize your code for production_

**[Vite 2](../web/vite-2.md)**
<br>_A VitePress powered post about Vite 2 and the importance of the instant feedback loop that it enables_

**[Vite Rollup Plugins](http://vite-rollup-plugins.patak.dev/)**
<br>_A list of official Rollup plugins compatibility for Vite_

<br>
<br>
<br>

<img src="/images/vite-ecosystem-cover.jpg">

Photo by <a href="https://unsplash.com/@emmagossett?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Emma Gossett</a> on <a href="https://unsplash.com/s/photos/ecosystem?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
