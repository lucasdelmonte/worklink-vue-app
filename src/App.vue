<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
  import { useUserStore } from './stores/user'
  const userStore = useUserStore()
</script>

<style lang="scss">
  @import '../styles/main.scss';

  main {
    overflow: hidden;
    width: calc(100vw - 3.2rem);
    height: calc(100vh - 3.2rem);
    position: relative;
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem 0;
    align-items: stretch;
    @include display-flex(column, flex-start, stretch, nowrap, 1.6rem 0);
  }
</style>
