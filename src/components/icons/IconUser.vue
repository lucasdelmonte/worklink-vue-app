<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="reactiveProps.width" :height="reactiveProps.height" viewBox="0 0 10 15">
    <g id="user" transform="translate(-9 -4.5)">
      <path id="Trazado_12473" data-name="Trazado 12473" d="M18.667,7.833A3.333,3.333,0,1,1,15.333,4.5a3.333,3.333,0,0,1,3.333,3.333ZM17,7.833a1.667,1.667,0,1,1-1.667-1.667A1.667,1.667,0,0,1,17,7.833Z" transform="translate(-1.333)" fill-rule="evenodd"/>
      <path id="Trazado_12474" data-name="Trazado 12474" d="M17.333,20.5a.833.833,0,0,0-.833-.833h-5a.833.833,0,0,0-.833.833v5H9v-5A2.5,2.5,0,0,1,11.5,18h5A2.5,2.5,0,0,1,19,20.5v5H17.333Z" transform="translate(0 -6)"/>
    </g>
  </svg>
</template>

<script setup lang="ts">
  import { computed } from '@vue/reactivity'

  const props = defineProps({
    width: Number,
		height: Number
	})

  const reactiveProps = computed(() => props)  
</script>

<style scoped>

</style>