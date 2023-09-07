<template>
  <div class="container" open>
    <div class="container__column container__column--sign-in">
      <Login />
    </div>
    <div class="container__column container__column--sign-up">
      <SignUp />
    </div>
    <Overlay />
  </div>
</template>

<script setup lang="ts">
  import Login from './Login.vue';
  import SignUp from './SignUp.vue';
  import Overlay from './Overlay.vue';
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .container {
    background-color: $color-white;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    max-width: 95rem;
    max-height: 55rem;
    height: 100%;
    width: calc(100% - 5rem);
    box-shadow: .5rem .5rem 2rem rgba($color: $color-primary-2, $alpha: .14);
    border-radius: 1rem;
    display: grid;
    place-items: center;
    overflow: hidden;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(2, 1fr); 

    &[open] {
      .overlay {
        left: 100%;
        translate: -100%;
      }
    }
    &:not([open]) {
      .overlay {
        left: 0%;
        translate: 0;
      }
    }
    &__column {
      max-width: 30rem;
      padding: 0 1.6rem;
      width: 100%;
      margin: 0 auto;
      transition: translate 350ms ease;

      &--sign-in {
        translate: .95rem 0;
      }
      &--sign-up {
        translate: -.95rem 0;
      }
    }
  }
</style>