<template>
  <div>
    <svg id="check-circle-fill" xmlns="http://www.w3.org/2000/svg" :width="reactiveProps.width" :height="reactiveProps.height" viewBox="0 0 16.125 16.125">
      <path id="Trazado_12295" data-name="Trazado 12295" d="M16.125,8.062A8.062,8.062,0,1,1,8.062,0a8.062,8.062,0,0,1,8.062,8.062Zm-4-3.053a.756.756,0,0,0-1.088.022L7.535,9.49,5.426,7.38A.756.756,0,0,0,4.358,8.449l2.666,2.667a.756.756,0,0,0,1.088-.02l4.023-5.029a.756.756,0,0,0-.01-1.058Z" fill="#a8c599" fill-rule="evenodd"/>
    </svg>
  </div>
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