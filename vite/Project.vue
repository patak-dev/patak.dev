<template>
  <div class="card">
    <div class="logo-wrapper">
      <img class="logo" :src="`/images/ecosystem/${logo || name + '.svg'}`" />
    </div>
    <div class="main">
      <div class="header">
        <h3 class="title" :id="name">
          <a class="header-anchor" :href="`#${name}`" aria-hidden="true">#</a>
          {{ " " + (title || name) }}
        </h3>
        <span class="links">
          <a class="link" v-if="github" :href="`https://github.com/${github}`">
            <img src="/images/github.svg" />
          </a>
          <a class="link" v-if="npm" :href="`https://www.npmjs.com/package/${npm}`">
            <img src="/images/npm.svg" />
          </a>
          <a class="link" v-if="home" :href="`https://${home}`">
            <img src="/images/homepage.svg" />
          </a>
          <a class="link" v-if="twitter" :href="`https://twitter.com/${twitter}`">
            <img src="/images/twitter.svg" />
          </a>
          <a class="link" v-if="discord" :href="`https://${discord}`">
            <img src="/images/discord.svg" />
          </a>
          <a class="link" v-if="slack" :href="`https://${slack}`">
            <img src="/images/slack.svg" />
          </a>
          <a class="link" v-if="vite" :href="`https://github.com/${vite}`">
            <img src="/images/vite.svg" />
          </a>
          <a class="link stackblitz" v-if="stackblitz" :href="`https://${stackblitz}`">
            <span>{{ stackblitz.includes('stackblitz') ? 'Open in StackBlitz' : stackblitz }}</span>
            <img src="/images/stackblitz.svg" />
          </a>
        </span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'title', 'logo', 'home', 'vite', 'github', 'npm', 'discord', 'slack', 'twitter', 'stackblitz']
};
</script>

<style scoped>
.card {
  margin-top: 3em;
  margin-bottom: 2em;
  display: flex;
  gap: 2.25em;
}

.header {
  display: flex;
  justify-content: space-between;
}

h3.title {
  display: inline-block;
  font-size: 1.75em;
  padding: 0;
  margin: 0;
}

.log-wrapper {
  display: grid;
  justify-items: center;
  height: 5em;
  width: 5em;
}
img.logo {
  height: 5em;
  width: 5em;
  object-fit: contain;
  border-radius: 0.25em;
}

.link {
  filter: grayscale(1);
  opacity: 0.35;
  padding: 0.5em;
  margin: 0.1em;
}
.link:hover {
  filter: grayscale(0);
  opacity: 1;
}

.link img {
  color: #dedede;
  height: 1.5em;
  width: 1.5em;
  object-fit: contain;
}

.stackblitz {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.stackblitz span {
  display: none;
  color: #71aeeb;
}

.links {
  display: flex;
  flex-direction: row-reverse;
}

.link:hover {
  border-radius: 0.3em;
  background-color: hsla(0, 100%, 100%, 0.08);
  box-shadow:
		/* offset-x | offset-y | blur-radius | spread-radius | color */ 0px
      3px 4px 0px hsla(0, 0%, 0%, 0.14),
    0px 3px 3px -2px hsla(0, 0%, 0%, 0.12), 0px 1px 8px 0px hsla(0, 0%, 0%, 0.2);
}

@media (min-width: 620px) {
  .stackblitz:hover span {
    display: inline-block;
    vertical-align: middle;
    line-height: normal;
    margin-left: 0.5em;
    margin-right: 0.5em;
    font-weight: 500;
  }
}

.main {
  width: calc(100% - 7.25em);
}

@media (max-width: 720px) {
  .card {
    flex-direction: column;
    gap: 1.5em;
  }

  .main {
    width: 100%;
  }
}
</style>