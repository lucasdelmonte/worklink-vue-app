<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="reactiveProps.width" :height="reactiveProps.height" viewBox="0 0 17.199 15">
    <g id="heart" transform="translate(-2.303 -4.311)">
      <path id="Trazado_12464" data-name="Trazado 12464" d="M10.913,6.528l-.894-.894a4.52,4.52,0,1,0-6.392,6.392l7.264,7.264,0,0,.021.021,7.264-7.264a4.52,4.52,0,1,0-6.392-6.392l-.874.874Zm-.02,10.437,4.056-4.057,1.192-1.151h0l.874-.873a2.876,2.876,0,1,0-4.068-4.068L10.914,8.852l-.006-.006h0L8.857,6.8a2.876,2.876,0,1,0-4.068,4.068l2.087,2.087v0l4.015,4.015Z" transform="translate(0)" fill-rule="evenodd"/>
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