// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import BlogCover from './components/BlogCover.vue'
import BlogPost from './components/BlogPost.vue'
import YouTubeVideo from './components/YouTubeVideo.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('BlogCover', BlogCover)
    app.component('BlogPost', BlogPost)
    app.component('YouTubeVideo', YouTubeVideo)
    // ...
  }
} satisfies Theme
