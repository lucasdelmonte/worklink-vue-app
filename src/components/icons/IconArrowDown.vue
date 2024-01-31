<template>
  <svg xmlns="http://www.w3.org/2000/svg"  :width="props.width" :height="props.height" :fill="props.fill" viewBox="0 0 24 24">
    <g id="icon-arrow-butom" transform="translate(24) rotate(90)">
      <g id="arrow-ios-forward">
        <rect id="Rectángulo_289" data-name="Rectángulo 289" width="24" height="24" transform="translate(0 24) rotate(-90)" opacity="0"/>
        <path id="Trazado_347" data-name="Trazado 347" d="M10,19a1,1,0,0,1-.77-1.64L13.71,12,9.39,6.63A1.022,1.022,0,1,1,11,5.37l4.83,6a1,1,0,0,1,0,1.27l-5,6A1,1,0,0,1,10,19Z"/>
      </g>
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