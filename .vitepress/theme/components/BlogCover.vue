<script setup>
defineProps({
  src: String
})
</script>

<template>
  <img :src="src" />
</template>

<style scoped>
img {
  width: 100%;
  max-height: 20rem;
  object-fit: cover;
  margin-bottom: 4rem;
  border-radius: 0.5rem;
}

@media (min-width: 1460px) {
  img {
    margin-top: -7rem;
    border-radius: 0 0 0.5rem 0.5rem;
  }
}
</style>