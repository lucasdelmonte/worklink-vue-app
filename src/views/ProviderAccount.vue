<template>
  <div>
    <h2>Provider account page</h2>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '../stores/user'

  const userStore = useUserStore()
</script>

<style scoped lang="scss">
  @import '../../styles/main.scss';
</style>