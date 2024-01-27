<template>
  <!-- :width="props.width" :height="props.height" :fill="props.fill" -->
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