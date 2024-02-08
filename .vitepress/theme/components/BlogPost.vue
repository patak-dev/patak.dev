<script setup>
defineProps({
  image: String
})
</script>

<template>
  <div class="container">
    <img :src="image" />
    <div>
      <slot />
    </div>    
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 2rem;
  margin-top: 3rem;
  margin-bottom: 3rem;
  background-color: var(--vp-c-bg-alt);
  border-radius: 0.5rem;
  align-items: center;
  div {
    padding-right: 1rem;
  }
}
img {
  width: 30%;
  height: 10rem;
  object-fit: cover;
  border-radius: 0.5rem 0 0 0.5rem;
}

@media (max-width: 1260px) {
  img {
    display: none;
  }
  .container {
    margin-bottom: 0;
    margin-top: 0;
  }
}
</style>