<template>
  <div class="modal-slider" 
    :class="{ 
      'modal-slider--open': reactiveProps.show
    }"
  >
    <div class="modal-slider__content">
      <carousel :items-to-show="1">
        <slide v-for="(url, index) in reactiveProps.currentImages" :key="index">
          <img v-if="url" :src="url" alt="Image" />
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel>
      <button @click.prevent="emit('setModalSlider')" class="button button--primary-black">Cerrar galería</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from '@vue/reactivity'
  import { watch } from 'vue'
  import 'vue3-carousel/dist/carousel.css'
  import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

  const emit = defineEmits(['setModalSlider'])

  const props = defineProps(['show', 'currentImages'])

  const reactiveProps = computed(() => props)
</script>

<style lang="scss">
  @import '../../../styles/main.scss';

  .modal-slider {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: -1;
    opacity: 0;
    background-color: rgba(0, 0, 0, .4);
    border-radius: 0;
    border-top-left-radius: 1.6rem;
    border-bottom-left-radius: 1.6rem;
    @include display-flex(row, center, center, nowrap, 0);

    &--open {
      z-index: 3;
      opacity: 1;

      .modal-slider__content {
        transform: translateY(0%);
      }
    }
    &:not(.modal-slider--open) {
      .modal-slider__content {
        transform: translateY(-350%);
      }
    }
    &__content {
      background-color: $color-white;
      padding: 2.4rem 1.6rem 1.6rem 1.6rem;
      border-radius: 1.6rem;
      width: calc(100% - 3.2rem);
      max-width: 60rem;
      transition: transform 350ms ease-in-out, scale 350ms ease-in-out;

      img {
        width: 100%;
        object-fit: contain;
      }
    }
  }
  .carousel__prev,
  .carousel__next {
    margin: 0 0.6rem;
    background: $color-white;
    border-radius: 0.5rem;

    &:hover {
      color: $color-black;
    }
    &--disabled {
      display: none;
    }
  }
  .carousel__pagination {
    padding: 0;
  }
  .carousel__pagination-button {
    &::after {
      border: .1rem solid $color-black;
      width: .8rem;
      height: .8rem;
      background-color: $color-white;
      border-radius: 50%;
      scale: 1;
      transition: all 350ms ease;
    }
    &--active {
      &::after {
        scale: 1.1;
        background-color: $color-black;
      }
    }
  }
</style>