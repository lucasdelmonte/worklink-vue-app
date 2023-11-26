<template>
  <div class="overlay" :open="reactiveProps.containerOpen">
    <div class="title">
      <h2 class="title__left">Work</h2>
      <h2 class="title__right">Link</h2>
    </div>
    <div class="overlay__left">
      <h1 class="overlay__title">Welcome Back!</h1>
      <p class="overlay__subtext">Please login with your account info</p>
      <button class="button button--tertiary-black" @click="$emit('toggleContainer')">Sign Up</button>
    </div>
    <div class="overlay__right">
      <h1 class="overlay__title">Hello!</h1>
      <p class="overlay__subtext">Enter your data and be part of our network</p>
      <button class="button button--tertiary-black" @click="$emit('toggleContainer')">Sign In</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from '@vue/reactivity'

  const props = defineProps({
    containerOpen: Boolean,
	})

  const reactiveProps = computed(() => props)
</script>

<style scoped lang="scss">
  @import '../styles/main.scss';

  .overlay {
    display: block;
    background-color: $color-black;
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 42rem;
    top: 50%;
    transform: translateY(-50%);
    transition: all 350ms ease;
    
    &[open=true] {
      .overlay {
        &__left {
          opacity: 1;
        }
        &__right {
          opacity: 0;
        }
      }
    }
    &[open=false] {
      .overlay {
        &__left {
          opacity: 0;
        }
        &__right {
          scale: 1;
        }
      }
    }
    &__left,
    &__right {
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      max-width: 26rem;
      margin: 0 auto;
      width: 100%;
      transition: all 450ms ease;
    } 
    &__title {
      margin-top: 0;
      text-align: center;
      @include fontBold(3.2rem, 0, 5.4rem, $color-primary-1);
    }
    &__subtext {
      margin: 0;
      text-align: center;
      @include fontRegular(1.4rem, 0, 1.8rem, $color-primary-1);
    }
    .button {
      margin-top: 2.8rem;
      min-height: 4rem;
    }
    .title {
      position: absolute;
      top: 2rem;
      left: 50%;
      translate: -50% 0;
      @include display-flex(row, center, center, nowrap, 0 .2rem);

      &__left,
      &__right {
        margin: 0;
        @include fontBold(3.6rem, 0rem, 3rem, $color-primary-1);
      }
      &__right {
        -webkit-text-stroke: .1rem $color-primary-1;
        color: transparent;
      }
    }
  }
</style>