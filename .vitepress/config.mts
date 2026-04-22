import { defineConfig } from 'vitepress'

const ogDescription = `Patak's blog, talks, and projects`
const ogImage = 'https://patak.cat/og-image.png'
const ogTitle = `Patak's home`
const ogUrl = 'https://patak.cat/images/patak-banner.jpg'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "patak",
  description: "patak's home",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Blog', link: '/blog' },
      { 
        text: 'More', items: [
          // { text: 'Projects', link: '/projects' },
          { text: 'Talks', link: '/talks' },
          { text: 'Sponsors', link: '/sponsors' },
          { text: 'Resources', link: '/resources' },
        ]
      }
    ],

    sidebar: [],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/patak-cat' },
      { icon: 'bluesky', link: 'https://bsky.app/profile/patak.cat' },
    ],

    footer: {
      message: `Released under the MIT License`,
      copyright: 'Copyright © 2020-present Matias Capeletto',
    },
  },
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/images/patak-icon.png' }],
    ['link', { rel: 'me', href: 'https://m.webtoo.ls/@patak' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { name: 'theme-color', content: '#7eaf90' }],
  ],
})
