<template>
  <div class="bg-gray-700 p-3 grid place-items-center">
    <span class="flex items-center space-x-3 select-none text-gray-50">
      <button @click="() => modifyMonth(-1)"> 
        Left 
      </button>
      <span>{{ cMonth }}</span>
      <button @click="() => modifyMonth(1)">
        Right
      </button>
    </span>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import { ref, computed } from 'vue'

  const monthEmit = defineEmits<{ (e: 'selected', v: number): void }>()

  const month = ref<number>(dayjs().month())

  const cMonth = computed(()=>dayjs().month(month.value).format('MMMM')) 


  function modifyMonth(v: number) {
    month.value += v
    monthEmit('selected', month.value)
  }
</script>

<style scoped lang="scss">

</style>