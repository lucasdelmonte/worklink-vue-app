<template>
  <MainLoginSignUp />
  <PopUp :show="true" :operationStatus="true" :messaje="'Successful operation'" />
</template>

<script setup lang="ts">
  import MainLoginSignUp from '@/components/loginSignUp/MainLoginSignUp.vue'
  import PopUp from '@/components/notificationPopUp/PopUp.vue';
</script>

<style scoped>

</style>