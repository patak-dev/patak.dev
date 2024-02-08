<template>
  <a :href="`#${name}`">
    <img class="logo" :src="`/images/ecosystem/${logo || (name + '.svg')}`" />
  </a>
</template>

<script>
export default {
  props: ['name', 'logo']
};
</script>

<style scoped>
.logo {
  height: 5em;
  width: 5em;
  object-fit: contain;
  margin: 1.2em;
  border-radius: 0.2em;
}

.logo:hover {
  transition: transform 0.1s;
  transform: scale(1.2);
}

@media (max-width: 580px) {
  .logo {
    height: 4em;
    width: 4em;
    margin: 0.25em auto;
  }
}
</style>