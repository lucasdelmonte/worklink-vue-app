<template>
  <div>
    <button class="button button--primary-black">Intervenir</button>
  </div>
</template>

<script setup lang="ts">
  import { useDrawerRequestStore } from '../../stores/drawerRequest'
  const drawerRequest = useDrawerRequestStore()
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .drawer {
    .form {
      padding-bottom: .8rem;
      position: relative;
      @include display-flex(column, space-between, stretch, nowrap, 0);
    }
    .button {
      min-height: 4rem;
      margin: 0;
    }
  }
</style>