<template>
  <div class="modal-action" 
    :class="{ 
      'modal-action--open': reactiveProps.show,
      'modal-action--drawer': reactiveProps.inDrawer
    }"
  >
    <div class="modal-action__content">
      <p class="modal-action__message">{{ reactiveProps.message }}</p>
      <template v-if="reactiveProps.currentAction === 'SERVICE'">
        <span class="modal-action__service-title">{{ reactiveProps.currentService.titulo }}</span>
        <div class="modal-action__buttons">
          <button class="button button--secondary-black" @click.prevent="$emit('setModal', false)" >Cancelar</button>
          <button class="button button--primary-black" @click.prevent="$emit('updateState', [reactiveProps.currentService._id, reactiveProps.newState])">Aceptar</button>
        </div>
      </template>
      <template v-else-if="reactiveProps.currentAction === 'BUDGET'">
        <span class="modal-action__budget-title">{{ reactiveProps.currentService.titulo }}</span>
        <div class="modal-action__buttons">
          <button class="button button--secondary-black" @click.prevent="$emit('setModal', false)" >Cancelar</button>
          <button class="button button--primary-black" @click.prevent="$emit('updateBudgetData', [reactiveProps.currentBudget._id, reactiveProps.currentBudget, reactiveProps.newState])">Aceptar</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from '@vue/reactivity'

  const emit = defineEmits(['setModal', 'updateState', 'updateBudgetData'])

  const props = defineProps({
    inDrawer: {
      type: Boolean,
      default: false
    },
    newState: {
      type: String,
      default: ''
    },
    currentService: {
      type: Object,
      default: {}
    },
    currentBudget: {
      type: Object,
      default: {}
    },
    currentAction: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    }
  })

  const reactiveProps = computed(() => props)
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .modal-action {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: -1;
    opacity: 0;
    background-color: rgba(0, 0, 0, .4);
    @include display-flex(row, center, center, nowrap, 0);

    &--open {
      z-index: 3;
      opacity: 1;

      .modal-action__content {
        transform: translateY(0%);
      }
    }
    &:not(.modal-action--open) {
      .modal-action__content {
        transform: translateY(-350%);
      }
    }
    &--drawer {
      border-bottom-left-radius: 1.6rem;
      border-top-left-radius: 1.6rem;
      background-color: $color-white;

      .modal-action__content {
        transform: translateY(0%);
        scale: 1;
      }
      &:not(.modal-action--open) {
      .modal-action__content {
        transform: translateY(0);
        scale: 0;
      }
    }
    }
    &__content {
      background-color: $color-white;
      padding: 2.4rem 1.6rem 1.6rem 1.6rem;
      border-radius: 1.6rem;
      width: calc(100% - 3.2rem);
      max-width: 60rem;
      transition: transform 350ms ease-in-out, scale 350ms ease-in-out;
    }
    &__message {
      margin: 0 auto 2.4rem auto;
      text-align: center;
      max-width: 53rem;
      @include fontMedium(1.6rem, 0, 1.8rem, $color-black);
    }
    &__service-title,
    &__budget-title {
      margin: 0 auto 2.4rem auto;
      text-align: center;
      max-width: 53rem;
      display: block;
      @include fontRegular(1.4rem, 0, 1.8rem, $color-black);
    }
    &__buttons {
      @include display-flex(row, space-between, center, nowrap, 1.6rem);

      .button {
        padding: 0 .8rem;
        max-width: 10rem;
        width: 100%;
        min-height: 4rem;
      }
    }
  } 
</style>