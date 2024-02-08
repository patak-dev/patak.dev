---
title: Open Source at StackBlitz
author:
  name: Matias Capeletto
date: 2024-02-08
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Open Source at StackBlitz
  - - meta
    - property: og:image
      content: https://www.patak.dev/images/open-source-at-stackblitz.png
  - - meta
    - property: og:url
      content: https://www.patak.dev/blog/open-source-at-stackblitz.html
  - - meta
    - property: og:description
      content: A retrospective on my first two years doing Open Source full-time at StackBlitz
  - - meta
    - name: twitter:card
      content: summary_large_image
---

<BlogCover src="/images/open-source-at-stackblitz.png" />

# Open Source at StackBlitz

Two years have passed [since joining StackBlitz](https://blog.stackblitz.com/posts/stackblitz-welcomes-patak/) now, and I want to take the opportunity to reflect on them. The day I joined StackBlitz, I said the opportunity they were giving me to work full-time on Vite felt like a dream. How reality evolved has been even more interesting than I expected.

## The Vite team

Before we go on, I’m Matias Capeletto. You probably know me as [patak](https://github.com/patak-dev) online. At the end of 2020, I was working as Head of Culture at a fast-growing agency. As part of the internal education programs we were running, we had an Open Source club where we shared notes on how to participate in the OSS process of the packages we used. If done right, collaborating in OSS is an incredible tool to help developers level up their skills. I was trying to help others make healthy contributions, so I started to contribute myself to showcase how to do it to the group. I sent a few PRs to VueUse, then VitePress, and then I posed my eyes on Vite. Thanks to how encouraging maintainers were with my contributions, my passion for OSS quickly took over and I saw myself spending as much time as I could get on these projects. At that point, Evan You was at the end of a massive sprint to release [Vite 2](https://vitejs.dev/blog/announcing-vite2). I helped build the Discord community and worked on triaging and reviews in the repo. A few months later, I became one of the first Vite team members once [Evan set up the governance structure](https://github.com/vitejs/vite/discussions/2601) for the project. I spent that first year working on Vite in my free time. With a focus on helping others get involved, solidifying the team and our contributors base, and helping folks in the incipient ecosystem.

By the end of 2021, Vite was starting to show its potential. There were many pain points, but there were a lot of smart folks now working together to improve things. [SvelteKit](https://svelte.dev/blog/sveltekit-beta#from-snowpack-to-vite) and [Astro](https://astro.build/blog/astro-021-preview/) have moved to Vite, triggering a [wave of projects joining the ecosystem](https://patak.dev/vite/ecosystem.html). [Anthony Fu](https://github.com/antfu) started hacking on [Vitest](https://vitest.dev/), one of the last big pieces we were missing, and I joined him to work together on the community and build up a team there too. Doing Open Source in Vite was incredible. Apart from learning from Evan and other team members, it allowed me to get to know so many other maintainers in the ecosystem. I decided I would quit my job and do it full-time. I couldn’t do it sustainably for long though.

## StackBlitz gets into the game

Here is where StackBlitz appears in the story. StackBlitz [released WebContainers](https://blog.stackblitz.com/posts/introducing-webcontainers/) to the public in May 2021. Running node in the browser still gets to me every time I run [https://vite.new](https://vite.new/). Vite was an amazing match for WebContainers. Vite was very lightweight so install times were reduced compared to alternatives, and the bundle-less dev server started as soon as the dependencies were ready. StackBlitz took a bet and [became the largest backer of Vite](https://blog.stackblitz.com/posts/why-were-backing-vite/). At the end of the year, [Eric Simons](https://twitter.com/ericsimons40) reached out with an incredible offer: to work full-time on Vite as part of the StackBlitz team. It was and still is hard to believe this could be a possibility. To give a reference point, Vite was at 0.5M npm weekly downloads at that point. It was a big bet for StackBlitz two years ago. I have an equally hard time believing that last week [we celebrated the 10M mark](https://x.com/vite_js/status/1751967627482661255?s=20).

![Vite 10M weekly npm downloads](/images/vite-10M.png)

I said yes to Eric, and it was a great call. Working at StackBlitz has been amazing. Everyone in the team was very welcoming. There is a high level of trust and a lot of collaboration. I love seeing firsthand the crazy stuff they are working on, as WebContainers. While my focus has been on Vite, it was great to be able to give quick feedback from a maintainers' POV while they developed new tools. We had been heavy users of StackBlitz since the beginning of the project. You can search in [our Discord community](https://chat.vitejs.dev) how many times “Would you provide a minimal reproduction using [vite.new](https://vite.new)?” was asked by Vite team members. We use StackBlitz to gather reproductions in our repository and for [our online starters in the docs](https://vitejs.dev/guide/#trying-vite-online). So there has been a lot of mutual benefit in having a close relationship to work things out when needed. Last year, we added [the StackBlitz’s GitHub App](https://github.com/apps/stackblitz) to the Vite repo, which adds a button to fix issues or review PRs using StackBlitz new editor.

### Connections

With proper time on my hands, I doubled down on helping make connections in the ecosystem and aiding new contributors so they could become more involved if they were interested. With the way the user base was growing, we needed to scale our resources quickly and get as much help as we could get. Thanks to the work of a growing number of maintainers (special shoutout to [Bjorn Lu](https://github.com/bluwy) and [sapphi-red](https://github.com/sapphi-red) that have been a staple for the project since that initial times), we got to [expand the team to 10 members](https://vitejs.dev/team) with a variety of skills and backgrounds. The core repository [now has 900 contributors](https://github.com/vitejs/vite). This number is already impressive, but the real number of devs involved is much higher counting [all the work on plugins, integrations, and frameworks](https://www.youtube.com/watch?v=ZNPcAUaIdMw). A lot of the contributors to Vite core have been the maintainers of frameworks building on top of Vite. They have played a crucial role in the direction of Vite. In a way, we have been playing the role of moderators for the constant flow of improvements from the ecosystem. We all chose Vite as our base, and then [worked together to make it as best as we could](https://x.com/markdalgleish/status/1712609780236488771?s=20).

### Vite is constantly improving

Working with the team and ecosystem, we released 3 new Vite majors and kept a steady cadence of minors and patches. Vite gained new features, and got more solid and [performant](https://vitejs.dev/blog/announcing-vite4-3) with each release, doubling down on the extensibility story that has been fundamental for the project adoption. With so many projects depending on us, we needed a way to ensure we wouldn’t introduce regressions in each release. We set up [vite-ecosystem-ci](https://www.youtube.com/watch?v=7L4I4lDzO48), which connects the CIs of the main downstream projects to be run on demand against Vite main. This completely changed how we worked with other maintainers and gives us confidence to do bolder changes knowing we will catch regressions before they happen. Several other OSS projects have now adopted the same scheme for their ecosystems.

![Vite Team Panel in Vue.js Amsterdam 2023](/images/vite-team-panel.png)

### Advocacy

I also participated in conferences and podcasts. We were in [JS Party with Anthony Fu talking about Vitest’s origins](https://www.youtube.com/watch?v=x-GO3KVt6rA). I chatted with the [folks of PodRocket about Vite 3](https://podrocket.logrocket.com/vite-3). I gave a talk at [DevOps.js 22 about Vite build](https://www.youtube.com/watch?v=h1OOdQGE8VY). The photo above is from [the Vite Team panel](https://www.youtube.com/watch?v=im9GSGnkFDs&t=6s) at Vue.js Amsterdam 23. This conference was very special, as most of the Vite team met IRL for the first time there. I joined the last two editions of [Vue Fes Japan](https://vuefes.jp/2023/). Here is my [Vite 3 and beyond Vue Fes Japan 22 online talk](https://www.youtube.com/watch?v=HsBTx36c_kA&t=24932s). We also did panels in the last two editions of Nuxt Nation ([with the Nuxt team in 22](https://www.youtube.com/watch?v=kkYo1AJb-tY), and [focusing on Vite in 23](https://www.youtube.com/watch?v=cRr24T5hXQg)).

![Vue Fes Japan 23](/images/vue-fes-japan-23.jpeg)

I never imagined we would end up on the organizers' side though. Let’s get into that part of the story.

## The making of ViteConf

In one of our first brainstorming sessions, Eric proposed we host a conference about Vite. We had some discussions in the Vite community before about doing a meetup, but we lacked the knowledge and resources. StackBlitz was willing not only to sponsor the event but also to put the time and expertise from others in their team to do logistics, marketing, and more. We consulted with Evan and the team. And ViteConf was born. In October 2022 after a lot of learning and tons of work with the ViteConf team and the community, we held [the first edition with 40 speakers](https://www.youtube.com/watch?v=Znd11rVHQOE&list=PLqGQbXn_GDmkI_lwbq5LsVYMEoX2ilKfI) from the main projects in the Vite ecosystem.

The event was a key milestone for Vite. It helped to showcase how much the ecosystem had grown in the past years. The next year, we repeated the feat with an even bigger event. More than 20k devs registered for each edition. So far, ViteConf talks had over 220K views. We used [Vite’s Discord to chat live with the speakers](https://discord.com/channels/804011606160703521/1158755325084712970) and in the last edition included interactive examples to play with the talk’s code while watching the stream. You can see it in action it the [ViteConf 23 replayer here](https://viteconf.org/23/replay). I would love to tell you all about what we have in store for ViteConf 24, but we’ll need to wait a bit with that one.

<YouTubeVideo videoId="veCxKeLl35A" />

## Funding Open Source work

I've been lucky to find a home in StackBlitz from where to work on OSS sustainably. I also want to thank [my sponsors](../sponsors.md) who have been with me since I started my journey. I have been forwarding half of what I get through GitHub Sponsors [to other OSS devs](https://github.com/patak-dev?tab=sponsoring). I hope this helped some of them in their paths. If you feel like sponsoring some OSS devs today, these are awesome maintainers to reward for their hard work.

With time, it was clear to me that StackBlitz hiring me was part of a bigger strategy. By helping push Vite forward, we helped all the frameworks and tools built on top of it. Vite showed that a bigger shared base was effective, avoiding the need for each framework to reimplement common features and giving them a [platform to collaborate on and improve together](https://www.youtube.com/watch?v=G5vwaoXck_g). But StackBlitz was willing to go further and sponsor other efforts too. 

### Volar

At the beginning of 2023, [Johnson Chu](https://github.com/johnsoncodehk) was working on making [Volar](https://volarjs.dev/) framework-agnostic so his incredible work on [Vue language tools](https://github.com/vuejs/language-tools) could be extended to benefit everyone. Features like auto-completion, typing info, and refactoring tools are a must-have for frameworks. But proper IDE support, especially with Typescript in the mix, is a very hard problem that [every project had to maintain in isolation](https://www.youtube.com/watch?v=veCxKeLl35A). Johnson was embarking on a quest to fix this dire landscape by providing a common base everyone else could build on top of. We saw many parallels with Vite’s story, so we decided to help him with the resources he needed to make Volar a reality, so [StackBlitz became Volar’s main sponsor for the last year](https://blog.vuejs.org/posts/volar-a-new-beginning). Johnson did an incredible job in this new stage of Volar. The project now has a very active team. Astro and MDX have moved their IDE support to the Volar platform, and some other projects may switch soon. Some weeks ago, [Volar 2 was released](https://github.com/volarjs/volar.js/releases/tag/v2.0.0), another big leap forward. Johnson and the team are doing a massive service to web devs, that will now have high-fidelity IDE support, with better performance and reduced memory consumption (in projects like Astro that also use the MDX and Vue extensions).

### Vitest

Another project that has been making big strides is Vitest. I think that Vitest is another big piece of the web dev puzzle. It expands the unified processing pipeline to the test environment. So projects can now unified experience for dev, build, and tests. A lot of moving pieces were removed compared to alternatives while offering more features, flexibility, and support for modern standards. Last year, StackBlitz started sponsoring [Vladimir Sheremet](https://github.com/sheremet-va) and [Anthony Fu](https://antfu.me) for their work on Vitest. Vladimir Sheremet joined the team in the initial effervescent months of the project and has become a huge force for the project. And you may know Anthony Fu as the maintainer of half the packages we all enjoy and depend on. Lately, Anthony got even more fans inside StackBlitz after he built the future Nuxt tutorial using [WebContainers API](https://webcontainers.io/) [live in his latest Youtube Series](https://www.youtube.com/watch?v=Jh-jPx5ef8g&list=PL4ETc_mXFfxUGiY852jH3ctljnI2e9Rax).

### Wasm

In parallel to these efforts, the WebContainers team at StackBlitz had already been sponsoring other maintainers like Long Yinan, the creator of napi-rs, a framework for building pre-compiled **Node.js** addons in Rust. Looking to improve performance, many projects in the web ecosystem have started to adopt native languages. Vite uses esbuild (written in Go), Rollup (that in version 4 started to use Rust and SWC for parsing), and [Lightning CSS](https://lightningcss.dev/). All of these projects have an excellent Wasm story, so they can be run in WebContainers or any other platform not covered by the binaries distributed by the projects. The WebContainers team at StackBlitz has been advocating for improving WebAssembly support. They helped maintainers set up Wasm targets for their projects and sponsor low-level work on critical missing pieces, like [wasm support of Sharp](https://blog.stackblitz.com/posts/bringing-sharp-to-wasm-and-webcontainers/). StackBlitz also [started sponsoring](https://x.com/elmd_/status/1751987358084333817?s=20) [Toyo Li](https://github.com/toyobayashi). His work on [emnapi](https://emnapi-docs.vercel.app/), which powers [napi-rs](https://napi.rs/) and was used to enable the official Sharp Wasm target, is invaluable.

We’ll keep working to find opportunities to help OSS projects in the Web ecosystem. I’ll have some interesting news to share on both the Vite and Wasm fronts in the coming months.

## It takes a Village

I feel very grateful to everyone on StackBlitz team for the opportunity they gifted me this past two years. It feels like such a short time for everything that has happened. I feel lucky to be in a position where not only I can do OSS full time surrounded by amazing developers, but also because we can help others in their Open Source journey.

I also want to thank all the devs with whom I have had the pleasure to work during these years, doing OSS is very demanding, but we are surrounded by incredible folks in our teams and the ecosystem that makes it feel rewarding and enjoyable. A project like Vite couldn’t have reached this moment without so many bright and dedicated individuals pouring their time and passion into a common goal.

I'm happy to see many other companies and individuals supporting Vite. Special shoutout to [Astro](https://astro.build/), which hires Bjorn Lu, and [Nuxt Labs](https://nuxtlabs.com/) which hires Anthony Fu. And to all the sponsors of the project. There is a chance that Vite will pass webpack’s npm downloads in a year, and we are all still wrapping our heads around this possibility. The Vite team is in a great place to scale to match this growth, collaborating with so many other maintainers from the ecosystem. Evan You is also now [leading a new team that is building Rolldown](https://www.youtube.com/watch?v=hrdwQHoAp0M), a Rust-based API-compatible version of Rollup. Once ready, it could replace both Rollup and esbuild in Vite, greatly simplifying Vite internals. There are many open fronts to keep innovating and improving Vite. Making it faster, more stable, and even more flexible.

## Let's collaborate

I still feel like Vite is just getting started. 2024 seems like is going to be even more interesting for both Vite and StackBlitz. There is so much to do ahead of us. If you are enjoying Vite or other OSS projects, I hope to see you in [our repos](https://github.com/vitejs/vite) and [communities](https://chat.vitejs.dev). There are surely a lot of things you can give back to the OSS projects you love, and make them even better for you and others. If you don't know where to get started, join their Discord communities and use your experience to help others solve their hurdles. And go to the project repositories and help answer questions in Discussions and triaging issues. If you're looking into diving into Vite, we have a [#contributing channel](https://discord.gg/vite-land-804011606160703521) where you're encouraged to share your journey with us.

Get out in the field. See you there!

![Zorro in the snow](/images/patak-winter.jpeg)

_Last updated: 2024-02-08_
