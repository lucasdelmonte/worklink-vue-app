<template>
  <div v-if="showingBudget && drawerRequest.requestAction != 'CREATE' && drawerRequest.requestData.estado === 'ACEPTADA'" class="drawer__show-budget drawer__show-budget--client" :class="{ 'drawer__show-budget--open': showingBudget }">
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
          <div class="budget__buttons" v-if="budget.estado === 'PENDIENTE'">
            <button @click.prevent="updateBudgetState(budget._id, 'CANCELADO')" class="button button--tertiary-black hover-underline hover-underline--right">
              Rechazar
            </button>
            <button @click.prevent="updateBudgetState(budget._id, 'ACEPTADO')" class="button button--tertiary-black hover-underline hover-underline--right">
              Aceptar
            </button>
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
  <template v-if="drawerRequest.requestAction === 'CREATE'">
    <button class="button button--primary-black" @click.prevent="emit('createRequest')">Crear solicitud</button>
  </template>
  <template v-else-if="drawerRequest.requestAction === 'EDIT'">
    <button class="button button--primary-black" @click.prevent="emit('editRequest')">Actualizar solicitud</button>
  </template>
  <template v-if="!showingBudget && drawerRequest.requestAction != 'CREATE' && drawerRequest.requestData.estado === 'ACEPTADA'">
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

  const emit = defineEmits(['createRequest', 'editRequest'])

  const responseBudgets = ref([]) as Ref<IBudget[]> | undefined
  const showingBudget = ref(false) as Ref<boolean>

  const getBudgets = async () => { 
    if(!responseBudgets) return
    responseBudgets.value = await drawerRequest.getBudgets(drawerRequest.requestData._id) as IBudget[]
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

  const updateBudgetState = async(id: string, state: string) => {
    console.log(id, state);
    console.log(drawerRequest.requestData._id);
    /*
      PENDIENTE = "PENDIENTE",
      ACEPTADO = "ACEPTADO",
      RECHAZADO = "RECHAZADO",
      CANCELADO = "CANCELADO",
    */
    if(!id) return
    await drawerRequest.updateBudget(id, state)
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
      padding-bottom: .8rem;
      position: relative;
      @include display-flex(column, space-between, stretch, nowrap, 0);
    }
    .budget-void {
      width: 100%;
      text-align: center;
      margin: 0;
      @include fontRegular(1.6rem, 0, 2rem, $color-black);
    }
    .budget {
      position: relative;
      &__buttons {
        @include display-flex(row, center, center, nowrap, 0 1.6rem);
        button {
          border: none;
          background: transparent;
          width: fit-content;
          padding: 0;
          width: fit-content;
          padding: 0 .8rem;
          min-width: 5rem;
          min-height: 4rem;
          cursor: pointer;
          margin: 0;

          img {
            width: 100%;
          }
        }
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
    .button {
      min-height: 4rem;
      margin: 0;
    }
  }
</style>