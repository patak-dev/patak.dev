<template>
  <div class="project-links">
    <QuickLink name="vite" />
    <QuickLink name="rollup" />
    <QuickLink name="esbuild" />
    <QuickLink name="postcss" />
    <QuickLink name="snowpack" />
    <QuickLink name="wmr" />
    <QuickLink name="modern-web" />
    <QuickLink name="vue" />
    <QuickLink name="react" />
    <QuickLink name="preact" />
    <QuickLink name="svelte" />
    <QuickLink name="marko" />
    <QuickLink name="solid" />
    <QuickLink name="angular" />
    <QuickLink name="lit" />
    <QuickLink name="nuxt" />
    <QuickLink name="sveltekit" logo="sveltekit.png" />
    <QuickLink name="vitepress" logo="vitepress.png" />
    <QuickLink name="hydrogen" logo="hydrogen.png" />
    <QuickLink name="astro" />
    <QuickLink name="vite-ruby" />
    <QuickLink name="laravel" />
    <QuickLink name="fastify" />
    <QuickLink name="vitest" />
    <QuickLink name="vite-plugin-pwa" />
    <QuickLink name="stackblitz" />
    <QuickLink name="cypress" />
    <QuickLink name="playwright" />
    <QuickLink name="storybook" />
    <QuickLink name="slidev" />
  </div>
</template>

<script>
import QuickLink from './QuickLink.vue'

export default {
  components: {
    QuickLink
  },
  props: ['name', 'logo']
};
</script>

<style scoped>
.project-links {
  margin-top: 2.5em;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-content: space-around;
}

@media (max-width: 680px) {
  .project-links {
    margin-top: 2.5em;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>