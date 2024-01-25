<template>
  <div class="drawer" :class="{ 'drawer--open': drawerRequest.state }">
    <div class="drawer__content">
      <div class="drawer__information">
        <h4 class="drawer__title">{{ modalBusiness.provider_name || drawerRequest.requestData.negocio?.nombre }}</h4>
        <h5 class="drawer__category">Categoría {{ modalBusiness.provider_business_category || drawerRequest.requestData.categoria }}</h5>
      </div>
      <form class="form">
        <div>
          <h2 class="form__title form__title--left" :class="{ 'form__title--with-subtitle': drawerRequest.requestState }">Solicitud</h2>
          <h4 class="form__subtitle form__title--left" v-if="drawerRequest.requestState">{{ drawerRequest.requestState }}</h4>
          <h4 class="form__subtitle form__title--left" v-if=" drawerRequest.requestData.estado === 'ACEPTADA'">Cotización: $23499</h4>
          <div class="field">
            <input v-model="date" class="field__input" id="date" type="date" :disabled="validateEdit" />
            <label class="field__label" for="date">Fecha</label>
          </div>
          <div class="field">
            <input v-model="title" class="field__input" id="title" type="text" :disabled="validateEdit" />
            <label class="field__label" for="title">Título</label>
          </div>
          <div class="field field--text-area">
            <textarea v-model="description" rows="10" id="description" class="field__input field__input--text-area" name="description" :disabled="validateEdit"></textarea>
            <label class="field__label" for="description">Descripción</label>
          </div>
          <div class="field field--file" :class="{ 'hidden': validateEdit }">
            <input @change="(evt) => loadImages(evt)" class="field__input field__input--file" type="file" id="images" name="awsfiles" accept=".jpg,.jpeg,.png" multiple :disabled="validateEdit">
            <label class="field__label field__label--file" for="images">Seleccionar imagenes</label>
          </div>
        </div>

        <div v-if="cookies.cookies.get('userRol') === 'CLIENTE'">
          <button class="drawer__create-request button button--primary-black" v-if="drawerRequest.requestAction === 'CREATE'" @click.prevent="createRequest">Crear solicitud</button>
          <button class="drawer__create-request button button--primary-black" v-else-if="drawerRequest.requestAction === 'EDIT'" @click.prevent="editRequest">Actualizar solicitud</button>
        </div>
        <div class="drawer__create-budget" :class="{ 'drawer__create-budget--open': creatingBudget }">
          <h2 class="form__title form__title--left">Presupuesto</h2>
          <div class="field">
            <input v-model="budget" class="field__input" id="budget" type="number" />
            <label class="field__label" for="budget">Presupuesto</label>
          </div>
        </div>
      </form>
      <div class="drawer__buttons">
        <template v-if="cookies.cookies.get('userRol') === 'PROVEEDOR'"> 
          <button class="drawer__create-request button button--primary-black" v-if="drawerRequest.requestAction === 'EDIT'" @click="updateState(drawerRequest.requestData._id, 'ACEPTADA')">Aceptar solicitud</button>
          <template v-if="!creatingBudget">
            <button class="drawer__create-request button button--primary-black" v-if="drawerRequest.requestAction === 'SEE' && drawerRequest.requestData.estado === 'ACEPTADA'" @click="toggleBudget()">Crear presupuesto</button>
          </template>
          <template v-else>
            <button class="drawer__create-request button button--primary-black" v-if="drawerRequest.requestAction === 'SEE'" @click="createBudget(drawerRequest.requestData._id)">Crear</button>
            <button class="drawer__create-request button button--primary-black" v-if="drawerRequest.requestAction === 'SEE'" @click="toggleBudget()">Volver</button>
          </template>
        </template>
        <button @click="toggleDrawer" class="drawer__back button button--primary-white">Cerrar</button>
      </div>
    </div>
    <div class="drawer__close" @click="closeClickModal"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue'
  import type { Ref } from 'vue'
  import { useModalBusinessStore } from '../../stores/modalProviderCard'
  import { useDrawerRequestStore } from '../../stores/drawerRequest'
  import { useUserStore } from '@/stores/user'
  import type { IServiceRequestPost, IServiceRequestUpdate } from '../../interfaces/ServiceRequestInterfaces'
  import { useCookies } from 'vue3-cookies'

  const cookies = useCookies()

  const userStore = useUserStore()
  const modalBusiness = useModalBusinessStore()
  const drawerRequest = useDrawerRequestStore()

  const date = ref('') as Ref<string>
  const title = ref('') as Ref<string>
  const description = ref('') as Ref<string>
  const images = ref([]) as Ref<string[]>
  const budget = ref(0) as Ref<number>
  const creatingBudget = ref(false) as Ref<boolean>

  const toggleBudget = () => { 
    creatingBudget.value = !creatingBudget.value
   }

  const loadImages = (evt: Event) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement || null
    images.value = []
    const files = target.files;
    if(!files) return
    const array = [...files].map((file) => {
      return file.name
    })
    images.value = array as []
  }

  const createBudget = async (id: string | undefined) => { 
    console.log(id, budget.value)
    if(!drawerRequest.requestData) return
    // await drawerRequest.createBudget(id, budget.value)
  }

   const closeClickModal = () => {
    drawerRequest.state = false
    creatingBudget.value = false
    drawerRequest.resetAttributes()
  }

  const updateState = async (id: string | undefined, state: string) => {
    if(!id) return
    const result = await drawerRequest.updateState(id, state)

    if(result) drawerRequest.requestAction = 'SEE'
  }

  const validateEdit = computed(() => {
    return drawerRequest.requestAction === 'SEE' || cookies.cookies.get('userRol') === 'PROVEEDOR'
  })

  const closeDrawer = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape') {
      drawerRequest.state = false
      creatingBudget.value = false
      drawerRequest.resetAttributes()
    }
  }

  const toggleDrawer = () => {
    drawerRequest.state = !drawerRequest.state
    creatingBudget.value = false
    drawerRequest.resetAttributes()
  }

  const createRequest = () => {
    if(!date.value || !title.value || !description.value || !images.value) return
    const data: IServiceRequestPost = {
      cliente: userStore.userData._id as string,
      categoria: modalBusiness.provider_business_category as string,
      fechaLimite: date.value as string,
      titulo: title.value as string,
      descripcion: description.value as string,
      imagenes: images.value as string[],
      negocio: modalBusiness.provider_business_id as string
    }
    drawerRequest.createRequest(data)
  }

  const editRequest = () => {
    if(!date.value || !title.value || !description.value || !images.value) return
    const data: IServiceRequestUpdate = {
      fechaLimite: date.value as string,
      titulo: title.value as string,
      descripcion: description.value as string,
      imagenes: images.value as string[]
    }
    drawerRequest.editRequest(data)
  }

  const parseDate = (dateString: string) => {
    const date = new Date(dateString)
    const [year, month, day] = date.toISOString().split('T')[0].split('-')

    return `${year}-${month}-${day}`
  }

  watch(() => drawerRequest.requestData, (newValue, oldValue) => {
    if(!newValue || Object.keys(newValue).length === 0 || drawerRequest.requestAction === 'CREATE') {
      if (date.value !== '' || title.value !== '' || description.value !== '' || images.value.length !== 0) {
        date.value = ''
        title.value = ''
        description.value = ''
        images.value = []
        drawerRequest.resetAttributes()
      }
      return
    }
    budget.value = 0
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      date.value = parseDate(newValue.fechaLimite as string) as string
      title.value = newValue.titulo as string
      description.value = newValue.descripcion as string
      images.value = newValue.imagenes
    }
  })

  onMounted(() => {
    budget.value = 0
    window.addEventListener('keydown', closeDrawer)
  })
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .drawer {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: -1;
    opacity: 0;
    background-color: rgba(0, 0, 0, .4);
    @include display-flex(row, flex-end, center, nowrap, 0);

    &__close {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      cursor: url('../../assets/Icons/icons8-cancelar-50.png'), auto;
    }
    &--open {
      z-index: 3;
      opacity: 1;

      .drawer__content {
        transform: translateX(0%);
      }
    }
    &:not(.drawer--open) {
      .drawer__content {
        transform: translateX(+150%);
      }
    }
    .form {
      padding-bottom: .8rem;
      position: relative;
      @include display-flex(column, space-between, stretch, nowrap, 0);
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
    &__content {
      box-sizing: border-box;
      transition: transform 400ms ease;
      width: calc(100% - 3.2rem);
      height: calc(100% - 3.2rem);
      border-bottom-left-radius: 1.6rem;
      border-top-left-radius: 1.6rem;
      box-shadow: .5rem .5rem 2rem rgba(0, 0, 0, 0.14);
      max-width: 45rem;
      background-color: $color-white;
      padding: 1.6rem 1.6rem;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto;
    }
    &__information {
      margin-bottom: 1.6rem;
      border-bottom: .1rem solid $color-grey-15;
    }
    &__title {
      margin: 0 0 .4rem 0;
      @include fontBold(1.8rem, 0, 2rem, $color-black);
    }
    &__category {
      margin: 0 0 1.4rem 0;
      @include fontRegular(1.4rem, 0, 2rem, $color-black);
    }
    &__buttons {
      display: grid;
      grid-template-rows: 4rem;
      gap: .8rem 0;
      .button {
        min-height: 4rem;
      }
    }
    &__create-request {
      text-align: center;
    }
  }
</style>