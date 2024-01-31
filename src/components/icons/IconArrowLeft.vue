<template>
  <svg id="icon-arrow-02" xmlns="http://www.w3.org/2000/svg" :width="props.width" :height="props.height" :fill="props.fill" viewBox="0 0 24 24">
    <g id="arrow-ios-back">
      <rect id="Rectángulo_288" data-name="Rectángulo 288" width="24" height="24" transform="translate(24) rotate(90)" opacity="0"/>
      <path id="Trazado_346" data-name="Trazado 346" d="M13.83,19a1,1,0,0,1-.78-.37l-4.83-6a1,1,0,0,1,0-1.27l5-6a1,1,0,0,1,1.54,1.28L10.29,12l4.32,5.36A1,1,0,0,1,13.83,19Z"/>
    </g>
  </svg>
</template>

<script setup lang="ts">
  import { computed } from '@vue/reactivity'

  const props = defineProps({
    width: Number,
    height: Number,
    fill: String
  })

  const reactiveProps = computed(() => props)  
</script>