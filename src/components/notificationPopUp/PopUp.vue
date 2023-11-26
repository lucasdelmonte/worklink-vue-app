<template>
  <div class="popup" :class="setVisibility">
    <div class="popup__image">
      <div v-if="reactiveProps.operationStatus"> 
        <IconSuccess :width="30" :height="30" />
      </div>
      <div v-else>
        <IconError :width="30" :height="30" />
      </div>
    </div>
    <div class="popup__message">
      <h2>The operation {{ reactiveProps.operationStatus ? 'was successful' : 'failed' }}.</h2>
      <p>{{ reactiveProps.messaje }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from '@vue/reactivity';
  import IconSuccess from '../icons/IconSuccess.vue';
  import IconError from '../icons/IconError.vue';

  const props = defineProps({
    show: Boolean,
    operationStatus: Boolean,
		messaje: String
	})
  
  const reactiveProps = computed(() => props)  

  const setVisibility = computed(() => {
    return reactiveProps.value.show ? 'popup--visible' : 'popup--hidden'
  })
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .popup {
    max-width: 40rem;
    width: fit-content;
    min-height: 6rem;
    padding-right: 1.4rem;
    background-color: $color-white;
    box-shadow: .5rem .5rem 2rem rgba($color: $color-primary-2, $alpha: .14);
    position: fixed;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    display: grid;
    grid-template-columns: 6rem 1fr;
    border-radius: 1rem;
    transition: translate 350ms ease;

    &--hidden {
      translate: 0 200%;
    }
    &--visible {
      translate: 0;
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