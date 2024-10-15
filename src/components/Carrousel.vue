<template>
  <div :id="name" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <slot></slot>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      :data-bs-target="'#'+name"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      :data-bs-target="'#'+name"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Carrousel",
  props: {
    name: { type: String, required: true },
  },
});
</script>
