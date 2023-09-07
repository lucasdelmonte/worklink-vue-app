<script setup lang="ts">
  import MainLoginSignUp from './components/loginSignUp/MainLoginSignUp.vue'
</script>

<template>
  <main>
    <MainLoginSignUp />
  </main>
</template>

<style lang="scss">
  @import '../styles/main.scss';

  main {
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    position: relative;
  }
</style>
