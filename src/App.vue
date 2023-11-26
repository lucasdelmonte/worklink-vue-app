<script setup lang="ts">
  import MainLoginSignUp from './components/loginSignUp/MainLoginSignUp.vue'
  import PopUp from './components/notificationPopUp/PopUp.vue'
</script>

<template>
  <main>
    <MainLoginSignUp />
    <PopUp :show="true" :operationStatus="true" :messaje="'Successful operation'" />
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
