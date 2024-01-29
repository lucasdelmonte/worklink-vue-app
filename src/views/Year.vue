<template>
  <div class="bg-gray-950 p-3 rounded-t-md grid place-items-center">
    <span class="flex items-center space-x-3 select-none text-gray-50">
      <button @click="() => modifyYear(-1)">
        Left
      </button>
      <span>{{ year }}</span>
      <button @click="() => modifyYear(1)">
        Right
      </button>
    </span>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import { ref } from 'vue'

  const yearEmit = defineEmits<{ (e: 'selected', v: number): void }>()

  const year = ref<number>(dayjs().year())

  function modifyYear(v: number) {
    year.value += v
    yearEmit('selected', year.value)
  }
</script>

<style scoped lang="scss">

</style>