<template>
  <div v-if="creatingBudget && drawerRequest.requestData.estado == 'ACEPTADA'" class="drawer__create-budget drawer__create-budget--provider" :class="{ 'drawer__create-budget--open': creatingBudget }">
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
      <div class="field field--text-area">
        <textarea v-model="budgetDetail" rows="10" id="detail" class="field__input field__input--text-area" name="detail"></textarea>
        <label class="field__label" for="detail">Detalle*</label>
      </div>
      <div class="field field--file">
        <input @change="seletedDocuments" class="field__input field__input--file" type="file" id="document" name="awsfiles" accept=".pdf" multiple>
        <label class="field__label" for="detail">Sólo se puede cargar un archivo por presupuesto</label>
      </div>
    </div>
    <template v-if="creatingBudget">
      <div class="drawer__create-buttons">
        <button class="drawer__create-request button button--primary-black" @click.prevent="createBudget(drawerRequest.requestData._id)">Crear</button>
        <button class="drawer__create-request button button--primary-black" @click.prevent="toggleBudget">Volver</button>
      </div>
    </template>
  </div>
  <div v-if="showingBudget && drawerRequest.requestAction != 'CREATE' && drawerRequest.requestData.estado == 'ACEPTADA'" class="drawer__show-budget drawer__show-budget--provider" :class="{ 'drawer__show-budget--open': showingBudget }">
    <div class="scroll-budgets">
      <h2 class="form__title form__title--left">Presupuestos</h2>
      <template v-if="responseBudgets && responseBudgets.length > 0" v-for="(budget, index) in responseBudgets">
        <div class="budget">
          <div class="field">
            <input :value="parseDate(budget.fecha)" @input="updateDate($event, budget)" class="field__input" :id="`budget-date-${ index }`" type="date" :disabled="validateInput(budget.estado)" />
            <label class="field__label" :for="`budget-date-${ index }`">Fecha de realización</label>
          </div>
          <div class="field">
            <input :value="parseTime(budget.fecha)" @input="updateTime($event, budget)"  class="field__input" :id="`budget-time-${ index }`" type="time" :disabled="validateInput(budget.estado)" />
            <label class="field__label" :for="`budget-time-${ index }`">Hora</label>
          </div>
          <div class="field">
            <input v-model="budget.monto" class="field__input" :id="`budget-amount-${ index }`" type="amount" :disabled="validateInput(budget.estado)" />
            <label class="field__label" :for="`budget-amount-${ index }`">Monto</label>
          </div>
          <div class="field field--text-area" v-if="budget.detalle && budget.detalle != ''">
            <textarea v-model="budget.detalle" rows="10" id="detail" class="field__input field__input--text-area" name="detail" :disabled="validateInput(budget.estado)"></textarea>
            <label class="field__label" for="detail">Detalle</label>
          </div>
          <div class="field field--file">
            <input @change="seletedDocuments" class="field__input field__input--file" type="file" id="document" name="awsfiles" accept=".pdf" multiple>
            <label class="field__label" for="detail">Sólo se puede cargar un archivo por presupuesto, el nuevo archivo reemplazará al anterior.</label>
          </div>
          <div class="field" v-if="budget.documentos && budget.documentos?.length === 1">
            <template v-for="documento in budget.documentos" :key="index">
              <a download :href="documento" class="field__download">Descargar archivo adjunto</a>
            </template>
          </div>
          <div class="field">
            <input :value="budget.estado" class="field__input" :id="`budget-state-${ index }`" type="state" disabled />
            <label class="field__label" :for="`budget-state-${ index }`">Estado</label>
          </div>
          <div class="budget__buttons" v-if="budget.estado === 'PENDIENTE'">
            <button @click.prevent="setBudget(budget, 'CANCELADO', 'cancelar')" class="button button--tertiary-black hover-underline hover-underline--right">
              Cancelar
            </button>
            <button 
              @click.prevent="setBudget(budget, 'PENDIENTE', 'actualizar')"
              class="button button--tertiary-black hover-underline hover-underline--right"
            >
              Guardar cambios
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
  <template v-if="!creatingBudget && drawerRequest.requestData.estado === 'ACEPTADA'">
    <button class="drawer__create-request button button--primary-black" @click.prevent="toggleBudget()" v-if="checkBudgets">Crear presupuesto</button>
  </template>
  <template v-if="!showingBudget && drawerRequest.requestAction != 'CREATE' && drawerRequest.requestData.estado === 'ACEPTADA'">
    <button class="drawer__create-request button button--primary-black" @click.prevent="toggleBudgets">Ver presupuestos</button>
  </template>
  <template v-if="!showingBudget && drawerRequest.requestData.estado === 'ACEPTADA'">
    <button class="button button--primary-black" @click.prevent="toggleChat(drawerRequest.requestData)">Chat</button>
  </template>
  <template v-if="!showingBudget && drawerRequest.requestAction === 'EDIT'">
    <button class="button button--primary-black" @click.prevent="setService('ACEPTADA', 'aceptar')">Aceptar solicitud</button>
    <button class="button button--primary-black" @click.prevent="setService('CANCELADA', 'rechazar')">Rechazar solicitud</button>
  </template>
  <ModalConfirmAction 
    :inDrawer="true"
    :message="currentMessage"
    :show="show"
    :newState="newState"
    :currentService="drawerRequest.requestData"
    :currentBudget="currentBudget"
    :currentAction="currentAction"
    @updateBudgetData="updateBudgetData"
    @updateState="updateState"
    @setModal="setModal"
  />
</template>

<script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import type { Ref } from 'vue'
  import { useDrawerRequestStore } from '../../stores/drawerRequest'
  import type { IBudget } from '../../interfaces/BudgetInterfaces'
  import { useModalChatStore } from '../../stores/modalChat'
  import type { IChat } from '../../interfaces/ChatInterfaces'
  import type { IServiceRequestGet } from '../../interfaces/ServiceRequestInterfaces'
  import ModalConfirmAction from '@/components/modals/ModalConfirmAction.vue'
  import { useUserStore } from '../../stores/user'


  const modalChat = useModalChatStore()
  const drawerRequest = useDrawerRequestStore()
  const userStore = useUserStore()

  const show = ref(false)
  const currentService = ref({}) as Ref<IServiceRequestGet>
  const currentBudget = ref({}) as Ref<IBudget>
  const currentMessage = ref('') as Ref<string>
  const currentAction = ref('') as Ref<string>
  const newState = ref('') as Ref<string>
  const documents = ref([]) as Ref<string[]>

  const updateDate = (evt: Event, budget: IBudget) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement || null
    budget.fecha = `${ target.value }T${ parseTime(budget.fecha) }:00.000Z`
  }

  const updateTime = (evt: Event, budget: IBudget) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement || null
    budget.fecha = `${ parseDate(budget.fecha) }T${ target.value }:00.000Z`
  }

  const setModal = () => { 
    show.value = !show.value 
  }

  const seletedDocuments = (evt: Event) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement || null
    const files = target.files
    if(!files) return

    documents.value = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        documents.value.push(base64)
      }
      reader.readAsDataURL(file)
    } 

    documents.value = documents.value
  }

  const updateBudgetData = async(data: [string, IBudget, string]) => {
    if(!data || documents.value.length > 1) return
    data[1].documentos = documents.value
    const id = data[0]
    const state = data[2]
    const result: boolean | undefined = await drawerRequest.updateBudgetData(id, data[1], state)
    if(result) {
      setModal()
      await getBudgets()
    }
  }

  const checkBudgets = computed(() => {
    if(!responseBudgets?.value) return true
    const hasAccepted = responseBudgets?.value.find(x => x.estado === 'ACEPTADO')
    return hasAccepted ? false : true
  })

  const setBudget = (budget: IBudget, estado: string,actionMessage: string) => { 
    if(documents.value.length > 1) return
    newState.value = estado
    currentBudget.value = budget
    currentAction.value = 'BUDGET'
    currentMessage.value = `¿Está seguro que desea ${ actionMessage } el presupuesto?`
    setModal()
  }
  
  const setService = (action: string, actionMessage: string) => { 
    newState.value = action
    currentBudget.value = {} as unknown as IBudget
    currentService.value = drawerRequest.requestData
    currentAction.value = 'SERVICE'
    currentMessage.value = `¿Está seguro que desea ${ actionMessage } la solicitud?`
    setModal()
  }

  const updateState = async (data: string[] | undefined) => {
    if(!data) return
    const id = data[0]
    const state = data[1]
    const result: boolean = await drawerRequest.updateState(id, state)
    if(result) {
      drawerRequest.requestAction = 'SEE'
      setModal()
    }
  }

  const validateInput = (estado: string) => {
    if(estado === 'ACEPTADA' || estado === 'CANCELADA') return true

    if(estado === 'PENDIENTE' && userStore.userData.rol === 'PROVEEDOR') return false

    return true
  }

  const creatingBudget = ref(false) as Ref<boolean>
  const budgetAmount = ref(0) as Ref<number>
  const budgetDate = ref('') as Ref<string>
  const budgetTime = ref('') as Ref<string>
  const budgetDetail = ref('') as Ref<string>
  const responseBudgets = ref([]) as Ref<IBudget[]> | undefined
  const showingBudget = ref(false) as Ref<boolean>

  const toggleBudget = () => { 
    creatingBudget.value = !creatingBudget.value
  }

  const createBudget = async (id: string | undefined) => { 
    if(!drawerRequest.requestData || !id || !budgetDate.value || !budgetTime.value || !budgetAmount.value || !budgetDetail.value || documents.value.length > 1) return
    await drawerRequest.createBudget(id, budgetAmount.value, `${ budgetDate.value }T${ budgetTime.value }:00.000Z`, `${ budgetDetail.value }`, documents.value)
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

  watch(() => drawerRequest.state, async (newValue, oldValue) => {
    if(newValue === false) {
      show.value = false
      creatingBudget.value = false
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