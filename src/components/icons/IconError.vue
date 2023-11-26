<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" :width="reactiveProps.width" :height="reactiveProps.height" viewBox="0 0 16.188 16.188">
      <path id="close-filled" d="M10.344,2.25a8.094,8.094,0,1,0,8.094,8.094A8.044,8.044,0,0,0,10.344,2.25Zm3.122,12.141-3.122-3.122L7.222,14.391,6.3,13.466l3.122-3.122L6.3,7.222,7.222,6.3l3.122,3.122L13.466,6.3l.925.925-3.122,3.122,3.122,3.122Z" transform="translate(-2.25 -2.25)" fill="#cb2222"/>
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