<template>
  <div class="gallery__image">
    <img v-for="(url, index) in images" :src="url" :key="index" alt="Image" />
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from "vue"

  const { images } = defineProps(["images"])
</script>

<style scoped lang="scss">
  .gallery {
    &__image {
    flex: 0 0 40%;
    width: 40%;
    object-fit: cover;
    scroll-snap-align: center;
    display: flex;
    gap: 0 0.8rem;

    img {
      width: 100%;
      object-fit: contain;
    }
  }
  }
</style>