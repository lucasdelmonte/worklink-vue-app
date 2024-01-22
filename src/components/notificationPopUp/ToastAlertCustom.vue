<template>
  <div class="toast" :class="{ 'toast--hidden': !toastAlertStore.state }">
    <div class="toast__image">
      <div v-if="toastAlertStore.actionResult"> 
        <IconSuccess :width="30" :height="30" />
      </div>
      <div v-else>
        <IconError :width="30" :height="30" />
      </div>
    </div>
    <div class="toast__message">
      <h2>{{ toastAlertStore.title }}</h2>
      <p>{{ toastAlertStore.message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import IconSuccess from '../icons/IconSuccess.vue'
  import IconError from '../icons/IconError.vue'
  import { useToastAlertStore } from '../../stores/toastAlert'
  import { watch } from 'vue'

  const toastAlertStore = useToastAlertStore()

  watch(() => toastAlertStore.state, () => {
    setTimeout(() => {
      toastAlertStore.state = false
    }, 3000);
  }, { deep: true })
</script> 

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .toast {
    max-width: 40rem;
    width: fit-content;
    min-height: 6rem;
    padding: .8rem 1.4rem .8rem 0;
    background-color: $color-white;
    box-shadow: .5rem .5rem 2rem rgba($color: $color-primary-2, $alpha: .14);
    position: fixed;
    bottom: .6rem;
    left: 50%;
    transform: translateX(-50%);
    display: grid;
    grid-template-columns: 6rem 1fr;
    border-radius: 1rem;
    transition: translate 350ms ease;
    translate: 0;
    z-index: 3;
    &--hidden {
      translate: 0 200%;
    }
    &__image {
      @include display-flex(row, center, center, nowrap, 0);
    }
    &__message {
      padding-left: .4rem;
      @include display-flex(column, center, flex-start, nowrap, 0);
      h2 {
        margin: 0;
        @include fontBold(1.4rem, 0, 2rem, $color-black);
      }
      p {
        margin: 0;
        @include fontRegular(1.4rem, 0, 2rem, $color-black);
      } 
    }
  }
</style>