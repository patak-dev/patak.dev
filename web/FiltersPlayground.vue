<template>
  <div class="filters-playground">
    <img
      src="/images/vite-2.jpg"
      alt="Vue in Markdown, CSS Filters Playground"
      :style="{ filter: filters.map((f) => `${f.name}(${f.c()})`).join(' ') }"
    />
    <div class="filters">
      <div v-for="f in filters" :key="f.name" class="filter">
        <label :for="f.name">{{ f.name }}</label>
        <input
          type="range"
          :id="f.name"
          :name="f.name"
          :min="f.min"
          :max="f.max"
          v-model="f.v"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

function percentage() {
  return this.v + "%";
}
function rem() {
  return this.v / 100 + "rem";
}
function angle() {
  return (this.v / 100) * 360 + "deg";
}

function fr(name, c = percentage, v = 0, min = 0, max = 100) {
  return { name, v, c, min, max };
}

export default {
  setup() {
    return {
      filters: ref([
        fr("blur", rem),
        fr("hue-rotate", angle),
        fr("invert"),
        fr("grayscale"),
        fr("sepia"),
        fr("saturate", percentage, 100, 0, 200),
        fr("brightness", percentage, 100, 0, 200),
        fr("contrast", percentage, 100, 0, 200),
        fr("opacity", percentage, 100),
      ]),
    };
  },
};
</script>

<style scoped>
.filters-playground {
  position: relative;
}
.filters {
  padding: 18px;
  margin: 18px;
  display: flex;
  gap: 6px;
  flex-direction: column;
  opacity: 0.5;
  position: absolute;
  width: 250px;
  background: #12121288;
  right: 0;
  bottom: 0;
  border-radius: 10px;
}
.filters-playground:hover .filters {
  opacity: 1;
}
.filter {
  display: flex;
}
.filter label {
  width: 40%;
}
.filter input {
  width: 60%;
}

@media screen and (max-width: 719px) {
  .filters {
    position: initial;
    opacity: 1;
    width: 100%;
    margin: 0px;
    padding: 20px;
  }
}
</style>