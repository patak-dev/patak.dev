import{_ as n,c as i,J as e,V as a,o as s,a3 as h,a4 as l,a5 as c,a6 as d,E as t}from"./chunks/framework.bqR4XwKe.js";const V=JSON.parse('{"title":"Open Source at StackBlitz","description":"","frontmatter":{"title":"Open Source at StackBlitz","author":{"name":"Matias Capeletto"},"date":"2024-02-08T00:00:00.000Z","head":[["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:title","content":"Open Source at StackBlitz"}],["meta",{"property":"og:image","content":"https://www.patak.dev/images/open-source-at-stackblitz.png"}],["meta",{"property":"og:url","content":"https://www.patak.dev/blog/open-source-at-stackblitz.html"}],["meta",{"property":"og:description","content":"A retrospective on my first two years doing full-time open source at StackBlitz"}],["meta",{"name":"twitter:card","content":"summary_large_image"}]]},"headers":[],"relativePath":"blog/open-source-at-stackblitz.md","filePath":"blog/open-source-at-stackblitz.md"}'),p={name:"blog/open-source-at-stackblitz.md"},m=a('<h1 id="open-source-at-stackblitz" tabindex="-1">Open Source at StackBlitz <a class="header-anchor" href="#open-source-at-stackblitz" aria-label="Permalink to &quot;Open Source at StackBlitz&quot;">​</a></h1><p>Two years have passed <a href="https://blog.stackblitz.com/posts/stackblitz-welcomes-patak/" target="_blank" rel="noreferrer">since joining StackBlitz</a> now, and I want to take the opportunity to reflect on them. The day I joined StackBlitz, I said the opportunity they were giving me to work full-time on Vite felt like a dream. How reality evolved has been even more interesting than I expected.</p><h2 id="the-vite-team" tabindex="-1">The Vite team <a class="header-anchor" href="#the-vite-team" aria-label="Permalink to &quot;The Vite team&quot;">​</a></h2><p>Before we go on, I’m Matias Capeletto. You probably know me as <a href="https://github.com/patak-dev" target="_blank" rel="noreferrer">patak</a> online. At the end of 2020, I was working as Head of Culture at a fast-growing agency. As part of the internal education programs we were running, we had an Open Source club where we shared notes on how to participate in the OSS process of the packages we used. If done right, collaborating in OSS is an incredible tool to help developers level up their skills. I was trying to help others make healthy contributions, so I started to contribute myself to showcase how to do it to the group. I sent a few PRs to VueUse, then VitePress, and then I posed my eyes on Vite. Thanks to how encouraging maintainers were with my contributions, my passion for OSS quickly took over and I saw myself spending as much time as I could get on these projects. At that point, Evan You was at the end of a massive sprint to release <a href="https://vitejs.dev/blog/announcing-vite2" target="_blank" rel="noreferrer">Vite 2</a>. I helped build the Discord community and worked on triaging and reviews in the repo. A few months later, I became one of the first Vite team members once <a href="https://github.com/vitejs/vite/discussions/2601" target="_blank" rel="noreferrer">Evan set up the governance structure</a> for the project. I spent that first year working on Vite in my free time. With a focus on helping others get involved, solidifying the team and our contributors base, and helping folks in the incipient ecosystem.</p><p>By the end of 2021, Vite was starting to show its potential. There were many pain points, but there were a lot of smart folks now working together to improve things. <a href="https://svelte.dev/blog/sveltekit-beta#from-snowpack-to-vite" target="_blank" rel="noreferrer">SvelteKit</a> and <a href="https://astro.build/blog/astro-021-preview/" target="_blank" rel="noreferrer">Astro</a> have moved to Vite, triggering a <a href="https://patak.dev/vite/ecosystem.html" target="_blank" rel="noreferrer">wave of projects joining the ecosystem</a>. <a href="https://github.com/antfu" target="_blank" rel="noreferrer">Anthony Fu</a> started hacking on <a href="https://vitest.dev/" target="_blank" rel="noreferrer">Vitest</a>, one of the last big pieces we were missing, and I joined him to work together on the community and build up a team there too. Doing Open Source in Vite was incredible. Apart from learning from Evan and other team members, it allowed me to get to know so many other maintainers in the ecosystem. I decided I would quit my job and do it full-time. I couldn’t do it sustainably for long though.</p><h2 id="stackblitz-gets-into-the-game" tabindex="-1">StackBlitz gets into the game <a class="header-anchor" href="#stackblitz-gets-into-the-game" aria-label="Permalink to &quot;StackBlitz gets into the game&quot;">​</a></h2><p>Here is where StackBlitz appears in the story. StackBlitz <a href="https://blog.stackblitz.com/posts/introducing-webcontainers/" target="_blank" rel="noreferrer">released WebContainers</a> to the public in May 2021. Running node in the browser still gets to me every time I run <a href="https://vite.new/" target="_blank" rel="noreferrer">https://vite.new</a>. Vite was an amazing match for WebContainers. Vite was very lightweight so install times were reduced compared to alternatives, and the bundle-less dev server started as soon as the dependencies were ready. StackBlitz took a bet and <a href="https://blog.stackblitz.com/posts/why-were-backing-vite/" target="_blank" rel="noreferrer">became the largest backer of Vite</a>. At the end of the year, <a href="https://twitter.com/ericsimons40" target="_blank" rel="noreferrer">Eric Simons</a> reached out with an incredible offer: to work full-time on Vite as part of the StackBlitz team. It was and still is hard to believe this could be a possibility. To give a reference point, Vite was at 0.5M npm weekly downloads at that point. It was a big bet for StackBlitz two years ago. I have an equally hard time believing that last week <a href="https://x.com/vite_js/status/1751967627482661255?s=20" target="_blank" rel="noreferrer">we celebrated the 10M mark</a>.</p><p><img src="'+h+'" alt="Vite 10M weekly npm downloads"></p><p>I said yes to Eric, and it was a great call. Working at StackBlitz has been amazing. Everyone in the team was very welcoming. There is a high level of trust and a lot of collaboration. I love seeing firsthand the crazy stuff they are working on, as WebContainers. While my focus has been on Vite, it was great to be able to give quick feedback from a maintainers&#39; POV while they developed new tools. We had been heavy users of StackBlitz since the beginning of the project. You can search in <a href="https://chat.vitejs.dev" target="_blank" rel="noreferrer">our Discord community</a> how many times “Would you provide a minimal reproduction using <a href="https://vite.new" target="_blank" rel="noreferrer">vite.new</a>?” was asked by Vite team members. We use StackBlitz to gather reproductions in our repository and for <a href="https://vitejs.dev/guide/#trying-vite-online" target="_blank" rel="noreferrer">our online starters in the docs</a>. So there has been a lot of mutual benefit in having a close relationship to work things out when needed. Last year, we added <a href="https://github.com/apps/stackblitz" target="_blank" rel="noreferrer">the StackBlitz’s GitHub App</a> to the Vite repo, which adds a button to fix issues or review PRs using StackBlitz new editor.</p><h3 id="connections" tabindex="-1">Connections <a class="header-anchor" href="#connections" aria-label="Permalink to &quot;Connections&quot;">​</a></h3><p>With proper time on my hands, I doubled down on helping make connections in the ecosystem and aiding new contributors so they could become more involved if they were interested. With the way the user base was growing, we needed to scale our resources quickly and get as much help as we could get. Thanks to the work of a growing number of maintainers (special shoutout to <a href="https://github.com/bluwy" target="_blank" rel="noreferrer">Bjorn Lu</a> and <a href="https://github.com/sapphi-red" target="_blank" rel="noreferrer">sapphi-red</a> that have been a staple for the project since that initial times), we got to <a href="https://vitejs.dev/team" target="_blank" rel="noreferrer">expand the team to 10 members</a> with a variety of skills and backgrounds. The core repository <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">now has 900 contributors</a>. This number is already impressive, but the real number of devs involved is much higher counting <a href="https://www.youtube.com/watch?v=ZNPcAUaIdMw" target="_blank" rel="noreferrer">all the work on plugins, integrations, and frameworks</a>. A lot of the contributors to Vite core have been the maintainers of frameworks building on top of Vite. They have played a crucial role in the direction of Vite. In a way, we have been playing the role of moderators for the constant flow of improvements from the ecosystem. We all chose Vite as our base, and then <a href="https://x.com/markdalgleish/status/1712609780236488771?s=20" target="_blank" rel="noreferrer">worked together to make it as best as we could</a>.</p><h3 id="vite-is-constantly-improving" tabindex="-1">Vite is constantly improving <a class="header-anchor" href="#vite-is-constantly-improving" aria-label="Permalink to &quot;Vite is constantly improving&quot;">​</a></h3><p>Working with the team and ecosystem, we released 3 new Vite majors and kept a steady cadence of minors and patches. Vite gained new features, and got more solid and <a href="https://vitejs.dev/blog/announcing-vite4-3" target="_blank" rel="noreferrer">performant</a> with each release, doubling down on the extensibility story that has been fundamental for the project adoption. With so many projects depending on us, we needed a way to ensure we wouldn’t introduce regressions in each release. We set up <a href="https://www.youtube.com/watch?v=7L4I4lDzO48" target="_blank" rel="noreferrer">vite-ecosystem-ci</a>, which connects the CIs of the main downstream projects to be run on demand against Vite main. This completely changed how we worked with other maintainers and gives us confidence to do bolder changes knowing we will catch regressions before they happen. Several other OSS projects have now adopted the same scheme for their ecosystems.</p><p><img src="'+l+'" alt="Vite Team Panel in Vue.js Amsterdam 2023"></p><h3 id="advocacy" tabindex="-1">Advocacy <a class="header-anchor" href="#advocacy" aria-label="Permalink to &quot;Advocacy&quot;">​</a></h3><p>I also participated in conferences and podcasts. We were in <a href="https://www.youtube.com/watch?v=x-GO3KVt6rA" target="_blank" rel="noreferrer">JS Party with Anthony Fu talking about Vitest’s origins</a>. I chatted with the <a href="https://podrocket.logrocket.com/vite-3" target="_blank" rel="noreferrer">folks of PodRocket about Vite 3</a>. I gave a talk at <a href="https://www.youtube.com/watch?v=h1OOdQGE8VY" target="_blank" rel="noreferrer">DevOps.js 22 about Vite build</a>. The photo above is from <a href="https://www.youtube.com/watch?v=im9GSGnkFDs&amp;t=6s" target="_blank" rel="noreferrer">the Vite Team panel</a> at Vue.js Amsterdam 23. This conference was very special, as most of the Vite team met IRL for the first time there. I joined the last two editions of <a href="https://vuefes.jp/2023/" target="_blank" rel="noreferrer">Vue Fes Japan</a>. Here is my <a href="https://www.youtube.com/watch?v=HsBTx36c_kA&amp;t=24932s" target="_blank" rel="noreferrer">Vite 3 and beyond Vue Fes Japan 22 online talk</a>. We also did panels in the last two editions of Nuxt Nation (<a href="https://www.youtube.com/watch?v=kkYo1AJb-tY" target="_blank" rel="noreferrer">with the Nuxt team in 22</a>, and <a href="https://www.youtube.com/watch?v=cRr24T5hXQg" target="_blank" rel="noreferrer">focusing on Vite in 23</a>).</p><p><img src="'+c+'" alt="Vue Fes Japan 23"></p><p>I never imagined we would end up on the organizers&#39; side though. Let’s get into that part of the story.</p><h2 id="the-making-of-viteconf" tabindex="-1">The making of ViteConf <a class="header-anchor" href="#the-making-of-viteconf" aria-label="Permalink to &quot;The making of ViteConf&quot;">​</a></h2><p>In one of our first brainstorming sessions, Eric proposed we host a conference about Vite. We had some discussions in the Vite community before about doing a meetup, but we lacked the knowledge and resources. StackBlitz was willing not only to sponsor the event but also to put the time and expertise from others in their team to do logistics, marketing, and more. We consulted with Evan and the team. And ViteConf was born. In October 2022 after a lot of learning and tons of work with the ViteConf team and the community, we held <a href="https://www.youtube.com/watch?v=Znd11rVHQOE&amp;list=PLqGQbXn_GDmkI_lwbq5LsVYMEoX2ilKfI" target="_blank" rel="noreferrer">the first edition with 40 speakers</a> from the main projects in the Vite ecosystem.</p><p>The event was a key milestone for Vite. It helped to showcase how much the ecosystem had grown in the past years. The next year, we repeated the feat with an even bigger event. More than 20k devs registered for each edition. So far, ViteConf talks had over 220K views. We used <a href="https://discord.com/channels/804011606160703521/1158755325084712970" target="_blank" rel="noreferrer">Vite’s Discord to chat live with the speakers</a> and in the last edition included interactive examples to play with the talk’s code while watching the stream. You can see it in action it the <a href="https://viteconf.org/23/replay" target="_blank" rel="noreferrer">ViteConf 23 replayer here</a>. I would love to tell you all about what we have in store for ViteConf 24, but we’ll need to wait a bit with that one.</p>',21),u=a('<h2 id="funding-open-source-work" tabindex="-1">Funding Open Source work <a class="header-anchor" href="#funding-open-source-work" aria-label="Permalink to &quot;Funding Open Source work&quot;">​</a></h2><p>I&#39;ve been lucky to find a home in StackBlitz from where to work on OSS sustainably. I also want to thank <a href="./../sponsors.html">my sponsors</a> who have been with me since I started my journey. I have been forwarding half of what I get through GitHub Sponsors <a href="https://github.com/patak-dev?tab=sponsoring" target="_blank" rel="noreferrer">to other OSS devs</a>. I hope this helped some of them in their paths. If you feel like sponsoring some OSS devs today, these are awesome maintainers to reward for their hard work.</p><p>With time, it was clear to me that StackBlitz hiring me was part of a bigger strategy. By helping push Vite forward, we helped all the frameworks and tools built on top of it. Vite showed that a bigger shared base was effective, avoiding the need for each framework to reimplement common features and giving them a <a href="https://www.youtube.com/watch?v=G5vwaoXck_g" target="_blank" rel="noreferrer">platform to collaborate on and improve together</a>. But StackBlitz was willing to go further and sponsor other efforts too.</p><h3 id="volar" tabindex="-1">Volar <a class="header-anchor" href="#volar" aria-label="Permalink to &quot;Volar&quot;">​</a></h3><p>At the beginning of 2023, <a href="https://github.com/johnsoncodehk" target="_blank" rel="noreferrer">Johnson Chu</a> was working on making <a href="https://volarjs.dev/" target="_blank" rel="noreferrer">Volar</a> framework-agnostic so his incredible work on <a href="https://github.com/vuejs/language-tools" target="_blank" rel="noreferrer">Vue language tools</a> could be extended to benefit everyone. Features like auto-completion, typing info, and refactoring tools are a must-have for frameworks. But proper IDE support, especially with Typescript in the mix, is a very hard problem that <a href="https://www.youtube.com/watch?v=veCxKeLl35A" target="_blank" rel="noreferrer">every project had to maintain in isolation</a>. Johnson was embarking on a quest to fix this dire landscape by providing a common base everyone else could build on top of. We saw many parallels with Vite’s story, so we decided to help him with the resources he needed to make Volar a reality, so <a href="https://blog.vuejs.org/posts/volar-a-new-beginning" target="_blank" rel="noreferrer">StackBlitz became Volar’s main sponsor for the last year</a>. Johnson did an incredible job in this new stage of Volar. The project now has a very active team. Astro and MDX have moved their IDE support to the Volar platform, and some other projects may switch soon. Some weeks ago, <a href="https://github.com/volarjs/volar.js/releases/tag/v2.0.0" target="_blank" rel="noreferrer">Volar 2 was released</a>, another big leap forward. Johnson and the team are doing a massive service to web devs, that will now have high-fidelity IDE support, with better performance and reduced memory consumption (in projects like Astro that also use the MDX and Vue extensions).</p><h3 id="vitest" tabindex="-1">Vitest <a class="header-anchor" href="#vitest" aria-label="Permalink to &quot;Vitest&quot;">​</a></h3><p>Another project that has been making big strides is Vitest. I think that Vitest is another big piece of the web dev puzzle. It expands the unified processing pipeline to the test environment. So projects can now unified experience for dev, build, and tests. A lot of moving pieces were removed compared to alternatives while offering more features, flexibility, and support for modern standards. Last year, StackBlitz started sponsoring <a href="https://github.com/sheremet-va" target="_blank" rel="noreferrer">Vladimir Sheremet</a> and <a href="https://antfu.me" target="_blank" rel="noreferrer">Anthony Fu</a> for their work on Vitest. Vladimir Sheremet joined the team in the initial effervescent months of the project and has become a huge force for the project. And you may know Anthony Fu as the maintainer of half the packages we all enjoy and depend on. Lately, Anthony got even more fans inside StackBlitz after he built the future Nuxt tutorial using <a href="https://webcontainers.io/" target="_blank" rel="noreferrer">WebContainers API</a> <a href="https://www.youtube.com/watch?v=Jh-jPx5ef8g&amp;list=PL4ETc_mXFfxUGiY852jH3ctljnI2e9Rax" target="_blank" rel="noreferrer">live in his latest Youtube Series</a>.</p><h3 id="wasm" tabindex="-1">Wasm <a class="header-anchor" href="#wasm" aria-label="Permalink to &quot;Wasm&quot;">​</a></h3><p>In parallel to these efforts, the WebContainers team at StackBlitz had already been sponsoring other maintainers like Long Yinan, the creator of napi-rs, a framework for building pre-compiled <strong>Node.js</strong> addons in Rust. Looking to improve performance, many projects in the web ecosystem have started to adopt native languages. Vite uses esbuild (written in Go), Rollup (that in version 4 started to use Rust and SWC for parsing), and <a href="https://lightningcss.dev/" target="_blank" rel="noreferrer">Lightning CSS</a>. All of these projects have an excellent Wasm story, so they can be run in WebContainers or any other platform not covered by the binaries distributed by the projects. The WebContainers team at StackBlitz has been advocating for improving WebAssembly support. They helped maintainers set up Wasm targets for their projects and sponsor low-level work on critical missing pieces, like <a href="https://blog.stackblitz.com/posts/bringing-sharp-to-wasm-and-webcontainers/" target="_blank" rel="noreferrer">wasm support of Sharp</a>. StackBlitz also <a href="https://x.com/elmd_/status/1751987358084333817?s=20" target="_blank" rel="noreferrer">started sponsoring</a> <a href="https://github.com/toyobayashi" target="_blank" rel="noreferrer">Toyo Li</a>. His work on <a href="https://emnapi-docs.vercel.app/" target="_blank" rel="noreferrer">emnapi</a>, which powers <a href="https://napi.rs/" target="_blank" rel="noreferrer">napi-rs</a> and was used to enable the official Sharp Wasm target, is invaluable.</p><p>We’ll keep working to find opportunities to help OSS projects in the Web ecosystem. I’ll have some interesting news to share on both the Vite and Wasm fronts in the coming months.</p><h2 id="it-takes-a-village" tabindex="-1">It takes a Village <a class="header-anchor" href="#it-takes-a-village" aria-label="Permalink to &quot;It takes a Village&quot;">​</a></h2><p>I feel very grateful to everyone on StackBlitz team for the opportunity they gifted me this past two years. It feels like such a short time for everything that has happened. I feel lucky to be in a position where not only I can do OSS full time surrounded by amazing developers, but also because we can help others in their Open Source journey.</p><p>I also want to thank all the devs with whom I have had the pleasure to work during these years, doing OSS is very demanding, but we are surrounded by incredible folks in our teams and the ecosystem that makes it feel rewarding and enjoyable. A project like Vite couldn’t have reached this moment without so many bright and dedicated individuals pouring their time and passion into a common goal.</p><p>I&#39;m happy to see many other companies and individuals supporting Vite. Special shoutout to <a href="https://astro.build/" target="_blank" rel="noreferrer">Astro</a>, which hires Bjorn Lu, and <a href="https://nuxtlabs.com/" target="_blank" rel="noreferrer">Nuxt Labs</a> which hires Anthony Fu. And to all the sponsors of the project. There is a chance that Vite will pass webpack’s npm downloads in a year, and we are all still wrapping our heads around this possibility. The Vite team is in a great place to scale to match this growth, collaborating with so many other maintainers from the ecosystem. Evan You is also now <a href="https://www.youtube.com/watch?v=hrdwQHoAp0M" target="_blank" rel="noreferrer">leading a new team that is building Rolldown</a>, a Rust-based API-compatible version of Rollup. Once ready, it could replace both Rollup and esbuild in Vite, greatly simplifying Vite internals. There are many open fronts to keep innovating and improving Vite. Making it faster, more stable, and even more flexible.</p><h2 id="let-s-collaborate" tabindex="-1">Let&#39;s collaborate <a class="header-anchor" href="#let-s-collaborate" aria-label="Permalink to &quot;Let&#39;s collaborate&quot;">​</a></h2><p>I still feel like Vite is just getting started. 2024 seems like is going to be even more interesting for both Vite and StackBlitz. There is so much to do ahead of us. If you are enjoying Vite or other OSS projects, I hope to see you in <a href="https://github.com/vitejs/vite" target="_blank" rel="noreferrer">our repos</a> and <a href="https://chat.vitejs.dev" target="_blank" rel="noreferrer">communities</a>. There are surely a lot of things you can give back to the OSS projects you love, and make them even better for you and others. If you don&#39;t know where to get started, join their Discord communities and use your experience to help others solve their hurdles. And go to the project repositories and help answer questions in Discussions and triaging issues. If you&#39;re looking into diving into Vite, we have a <a href="https://discord.gg/vite-land-804011606160703521" target="_blank" rel="noreferrer">#contributing channel</a> where you&#39;re encouraged to share your journey with us.</p><p>Get out in the field. See you there!</p><p><img src="'+d+'" alt="Zorro in the snow"></p><p><em>Last updated: 2024-02-08</em></p>',19);function g(f,b,w,k,v,y){const o=t("BlogCover"),r=t("YouTubeVideo");return s(),i("div",null,[e(o,{src:"/images/open-source-at-stackblitz.png"}),m,e(r,{videoId:"veCxKeLl35A"}),u])}const S=n(p,[["render",g]]);export{V as __pageData,S as default};