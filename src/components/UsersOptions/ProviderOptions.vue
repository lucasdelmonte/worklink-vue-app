<template>
  <div v-if="creatingBudget && drawerRequest.requestData.estado == 'PENDIENTE'" class="drawer__create-budget drawer__create-budget--provider" :class="{ 'drawer__create-budget--open': creatingBudget }">
    <div class="scroll-budgets">
      <h2 class="form__title form__title--left">Presupuesto</h2>
      <div class="field">
        <input v-model="budgetDate" class="field__input" id="budget-date" type="date" />
        <label class="field__label" for="budget-date">Fecha de realización*</label>
      </div>
      <div class="field">
        <input v-model="budgetAmount" class="field__input" id="budget-amount" type="number" />
        <label class="field__label" for="budget-amount">Presupuesto*</label>
      </div>
    </div>
    <template v-if="creatingBudget">
      <div class="drawer__create-buttons">
        <button class="drawer__create-request button button--primary-black" @click.prevent="createBudget(drawerRequest.requestData._id)">Crear</button>
        <button class="drawer__create-request button button--primary-black" @click.prevent="toggleBudget">Volver</button>
      </div>
    </template>
  </div>
  <template v-if="!creatingBudget && drawerRequest.requestData.estado === 'PENDIENTE'">
    <button class="drawer__create-request button button--primary-black" @click.prevent="toggleBudget()">Crear presupuesto</button>
  </template>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { useDrawerRequestStore } from '../../stores/drawerRequest'

  const drawerRequest = useDrawerRequestStore()
  const creatingBudget = ref(false) as Ref<boolean>
  const budgetAmount = ref(0) as Ref<number>
  const budgetDate = ref('') as Ref<string>

  const toggleBudget = () => { 
    creatingBudget.value = !creatingBudget.value
  }

  const createBudget = async (id: string | undefined) => { 
    console.log(id, budgetAmount.value, budgetDate.value)
    if(!drawerRequest.requestData || !id) return
    await drawerRequest.createBudget(id, budgetAmount.value, budgetDate.value)
  }
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .drawer {
    .form {
      padding-top: .8rem;
      position: relative;
      @include display-flex(column, space-between, stretch, nowrap, 0);
    }
    &__create-buttons {
      @include display-flex(column, center, center, nowrap, .8rem);
    }
    &__create-budget {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: $color-white;
      display: flex;
      flex-direction: column;
      transform: translateX(+150%);
      transition: transform 400ms ease;

      &--open {
        transform: translateX(0%);
      }
      .field__input[type=number]::-webkit-inner-spin-button, 
      .field__input[type=number]::-webkit-outer-spin-button { 
        -webkit-appearance: none;
      }
    }
    .scroll-budgets {
      max-height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
      height: 100%;

      &::-webkit-scrollbar {
        width: .4rem;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
      }

      &::-webkit-scrollbar-thumb {
        background: $color-grey-15;
        border-top-right-radius: .5rem;
        border-bottom-right-radius: .5rem;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: $color-grey-50;
      }
    }
    .button {
      min-height: 4rem;
      margin: 0;
    }
  }
</style>