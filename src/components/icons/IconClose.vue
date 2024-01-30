<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="props.width" :height="props.height" :fill="props.fill" viewBox="0 0 17.414 17.414">
    <g id="Grupo_3745" data-name="Grupo 3745" transform="translate(0.707 0.707)">
      <line id="Línea_396" data-name="Línea 396" y2="22.627" transform="translate(16 0) rotate(45)" fill="none" stroke="#000" stroke-width="2"/>
      <line id="Línea_397" data-name="Línea 397" y2="22.627" transform="translate(0 0) rotate(-45)" fill="none" stroke="#000" stroke-width="2"/>
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