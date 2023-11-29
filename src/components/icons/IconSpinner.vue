<template>
  <span class="spinner">
    <svg class="spinner__svg" :stroke="reactiveProps.stroke" :width="reactiveProps.width" :height="reactiveProps.height" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
    </svg>
  </span>
</template>

<script setup lang="ts">
  import { computed } from '@vue/reactivity'

  const props = defineProps({
    width: Number,
    height: Number,
    stroke: String
  })

  const reactiveProps = computed(() => props)  
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  $offset: 187;
  $duration: 1.4s;

  .spinner {
    @include display-flex(row, center, center, nowrap, 0);

    &__svg {
      animation: rotator $duration linear infinite;
    }
    .path {
      stroke-dasharray: $offset;
      stroke-dashoffset: 0;
      transform-origin: center;
      animation:
        dash $duration ease-in-out infinite;
    }
  }
  
  @keyframes rotator {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(270deg); }
  }

  @keyframes dash {
    0% { stroke-dashoffset: $offset; }
    50% {
      stroke-dashoffset: calc($offset / 4);
      transform:rotate(135deg);
    }
    100% {
      stroke-dashoffset: $offset;
      transform:rotate(450deg);
    }
  }
</style>