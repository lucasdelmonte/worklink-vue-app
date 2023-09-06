<template>
  <div>
    <h2>Main</h2>
    <Login />
    <SignUp />
  </div>
</template>

<script setup lang="ts">
  import Login from './Login.vue';
  import SignUp from './SignUp.vue';
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';
</style>