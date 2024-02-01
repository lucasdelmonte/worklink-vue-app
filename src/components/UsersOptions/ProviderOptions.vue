<template>
  <div v-if="creatingBudget && drawerRequest.requestData.estado == 'PENDIENTE'" class="drawer__create-budget drawer__create-budget--provider" :class="{ 'drawer__create-budget--open': creatingBudget }">
    <div class="scroll-budgets">
      <h2 class="form__title form__title--left">Presupuesto</h2>
      <div class="field">
        <input v-model="budgetDate" class="field__input" id="budget-date" type="date" />
        <label class="field__label" for="budget-date">Fecha de realización*</label>
      </div>
      <div class="field">
        <input v-model="budgetTime" class="field__input" id="budget-time" type="time" />
        <label for="budget-time"></label>
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
  <div v-if="showingBudget && drawerRequest.requestAction != 'CREATE'" class="drawer__show-budget drawer__show-budget--provider" :class="{ 'drawer__show-budget--open': showingBudget }">
    <div class="scroll-budgets">
      <h2 class="form__title form__title--left">Presupuestos</h2>
      <template v-if="responseBudgets && responseBudgets.length > 0" v-for="(budget, index) in responseBudgets">
        <div class="budget">
          <div class="field">
            <input :value="parseDate(budget.fecha)" class="field__input" :id="`budget-date-${ index }`" type="date" disabled />
            <label class="field__label" :for="`budget-date-${ index }`">Fecha de realización</label>
          </div>
          <div class="field">
            <input :value="parseTime(budget.fecha)" class="field__input" :id="`budget-time-${ index }`" type="time" disabled />
            <label class="field__label" :for="`budget-time-${ index }`">Hora</label>
          </div>
          <div class="field">
            <input :value="`$${ budget.monto }`" class="field__input" :id="`budget-amount-${ index }`" type="amount" disabled />
            <label class="field__label" :for="`budget-amount-${ index }`">Monto</label>
          </div>
          <div class="field">
            <input v-model="budget.estado" class="field__input" :id="`budget-state-${ index }`" type="state" disabled />
            <label class="field__label" :for="`budget-state-${ index }`">Estado</label>
          </div>
        </div>
        <div class="field-divider">
          <div class="line"></div>
          <div class="circle"></div>
          <div class="line"></div>
        </div>
      </template>
      <template v-else>
        <p class="budget-void">No hay presupuestos</p>
      </template>
    </div>
    <template v-if="showingBudget">
      <button class="drawer__create-request button button--primary-black" @click.prevent="toggleBudgets">Volver</button>
    </template>
  </div>
  <template v-if="!creatingBudget && drawerRequest.requestData.estado === 'PENDIENTE'">
    <button class="drawer__create-request button button--primary-black" @click.prevent="toggleBudget()">Crear presupuesto</button>
  </template>
  <template v-if="!showingBudget && drawerRequest.requestAction != 'CREATE'">
    <button class="drawer__create-request button button--primary-black" @click.prevent="toggleBudgets">Ver presupuestos</button>
  </template>
  <template v-if="!showingBudget && drawerRequest.requestData.estado === 'ACEPTADA'">
    <button class="button button--primary-black" @click.prevent="toggleChat(drawerRequest.requestData)">Chat</button>
  </template>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'
  import type { Ref } from 'vue'
  import { useDrawerRequestStore } from '../../stores/drawerRequest'
  import type { IBudget } from '../../interfaces/BudgetInterfaces'
  import { useModalChatStore } from '../../stores/modalChat'
  import type { IChat } from '../../interfaces/ChatInterfaces'
  import type { IServiceRequestGet } from '../../interfaces/ServiceRequestInterfaces'

  const modalChat = useModalChatStore()
  const drawerRequest = useDrawerRequestStore()
  const creatingBudget = ref(false) as Ref<boolean>
  const budgetAmount = ref(0) as Ref<number>
  const budgetDate = ref('') as Ref<string>
  const budgetTime = ref('') as Ref<string>
  const responseBudgets = ref([]) as Ref<IBudget[]> | undefined
  const showingBudget = ref(false) as Ref<boolean>

  const toggleBudget = () => { 
    creatingBudget.value = !creatingBudget.value
  }

  const createBudget = async (id: string | undefined) => { 
    if(!drawerRequest.requestData || !id || !budgetDate.value || !budgetTime.value || !budgetAmount.value) return
    await drawerRequest.createBudget(id, budgetAmount.value, `${ budgetDate.value }T${ budgetTime.value }:00.000Z`)
  }

  const toggleChat = (service: IServiceRequestGet) => {
    modalChat.serviceRequest = service
    modalChat.chat = [] as IChat[]
    modalChat.toggleModal()
    modalChat.startUpdatingChats()
  }

  const toggleBudgets = async () => { 
    showingBudget.value = !showingBudget.value
    if(!responseBudgets) return
    responseBudgets.value = await drawerRequest.getBudgets(drawerRequest.requestData._id) as IBudget[]
  }

  const getBudgets = async () => { 
    if(!responseBudgets) return
    responseBudgets.value = await drawerRequest.getBudgets(drawerRequest.requestData._id) as IBudget[]
  }

  const parseDate = (dateString: string) => {
    const date = new Date(dateString)
    const [year, month, day] = date.toISOString().split('T')[0].split('-')

    return `${year}-${month}-${day}`
  }

  const parseTime = (dateString: string) => {
    const date = new Date(dateString)
    const [hour, minute] = date.toISOString().split('T')[1].split(':')

    return `${hour}:${minute}`
  }

  watch(() => drawerRequest.requestData, async (newValue, oldValue) => {
    if(newValue != oldValue) {
      await getBudgets()
    }
  })
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .drawer {
    .form {
      padding-top: .8rem;
      position: relative;
      @include display-flex(column, space-between, stretch, nowrap, 0);
    }
    .budget-void {
      width: 100%;
      text-align: center;
      margin: 0;
      @include fontRegular(1.6rem, 0, 2rem, $color-black);
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
    &__show-budget {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background: $color-white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transform: translateX(+150%);
      transition: transform 400ms ease;
      overflow-y: auto;
      max-height: 100%;
      box-sizing: border-box;

      .field-divider:last-of-type {
        display: none;
      }

      &--open {
        transform: translateX(0%);
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