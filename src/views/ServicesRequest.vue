<template>
  <Header @toggleMenu="toggleMenu" @toggleUserOptions="toggleUserOptions" :menuState="menuState"></Header>

  <div class="main-content">
    <Megamenu @toggleMenu="toggleMenu" :menuState="menuState"></Megamenu>

    <div class="user-options" :open="userOptionsState">
      <ul class="user-options__list">
        <li><RouterLink class="hover-underline hover-underline--right" :to="`/account/${userStore.userData._id}`">{{ langStore.lang.header.user.view_profile }}</RouterLink></li>
        <li><RouterLink class="hover-underline hover-underline--right" @click="userStore.logoutUser" :to="'/login-register'">{{ langStore.lang.header.user.logout }}</RouterLink></li>
      </ul>
    </div>

    <div class="main-content__header-facets">
      <h2 class="main-content__title">Solicitudes</h2>
      <div class="filter">
        <label class="filter__label" for="filter-services-request">Filtro</label>
        <div class="filter__select-wrapper">
          <select @change="(evt) => setFilterState(evt)" class="filter__select" name="filter-services-request" id="filter-services-request">
            <option value="view-all" :selected="categoryFiltered === 'view-all'">Ver todas</option>
            <template v-for="category in CategoriasType" :key="category">
              <option :value="category" :selected="categoryFiltered === category">{{ category }}</option>
            </template>
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g id="icon-arrow-butom" transform="translate(24) rotate(90)">
              <g id="arrow-ios-forward">
                <rect id="Rectángulo_289" data-name="Rectángulo 289" width="24" height="24" transform="translate(0 24) rotate(-90)" opacity="0"/>
                <path id="Trazado_347" data-name="Trazado 347" d="M10,19a1,1,0,0,1-.77-1.64L13.71,12,9.39,6.63A1.022,1.022,0,1,1,11,5.37l4.83,6a1,1,0,0,1,0,1.27l-5,6A1,1,0,0,1,10,19Z"/>
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>

    <div class="grid grid--desktop-4 grid--tablet-3 grid--mobile-1">
      <template v-for="service in (servicesRequest as IServiceRequestGet[])">
        <div class="card-service" v-if="categoryFiltered === 'view-all' || categoryFiltered === service.categoria">
          <header>
            <span class="card-service__date">Desde el {{ parseDate(service.fechaCreacion) }} hasta el {{ parseDate(service.fechaLimite) }}</span>
            <span class="card-service__state">{{ service.estado }}</span>
          </header>
          <p class="card-service__title">{{ service.titulo }}</p>
          <p class="card-service__category">{{ service.categoria }}</p>
          <p class="card-service__description">{{ service.descripcion }}</p>

          <div class="card-service__buttons">
            <template v-if="service.estado === 'PENDIENTE'">
              <button @click="updateState(service._id, 'CANCELADA')" class="button button--primary-white">Cancelar</button>
              <button @click="toggleDrawer(service.estado, service)" class="button button--primary-black">Detalles</button>
            </template>
            <template v-else-if="service.estado === 'CANCELADA'">
              <button @click="toggleDrawer(service.estado, service)" class="button button--primary-black button--right">Detalles</button>
            </template>
            <template v-else-if="service.estado === 'ACEPTADA'">
              <button class="button button--primary-white" @click="toggleChat(service)">Chat</button>
              <button @click="toggleDrawer(service.estado, service)" class="button button--primary-black button--right">Detalles</button>
            </template>
            <template v-else-if="service.estado === 'FINALIZADA'">
              <button class="button button--primary-white">Pagar</button>
              <button @click="toggleDrawer(service.estado, service)" class="button button--primary-black">Detalles</button>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import type { Ref } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useLangStore } from '../stores/language'
  import Header from '../components/layout/Header.vue'
  import Megamenu from '../components/layout/Megamenu.vue'
  import type { IServiceRequestGet } from '../interfaces/ServiceRequestInterfaces'
  import { CategoriasType } from '../interfaces/CategoriesInterfaces'
  import { useRoute, useRouter } from 'vue-router'
  import { useDrawerRequestStore } from '../stores/drawerRequest'
  import { useModalChatStore } from '../stores/modalChat'
  import type { IChat } from '../interfaces/ChatInterfaces'

  const modalChat = useModalChatStore()
  const drawerRequest = useDrawerRequestStore()

  const route = useRoute()
  const router = useRouter()

  const userStore = useUserStore()
  const servicesRequest = ref<IServiceRequestGet[] | undefined>([])

  const menuState: Ref<boolean> = ref(false)
  const userOptionsState: Ref<boolean> = ref(false)
  const langStore = useLangStore()
  const categoryFiltered = ref('view-all') as Ref<string>

  const toggleDrawer = (requestState: string, requestData: IServiceRequestGet) => {
    drawerRequest.state = !drawerRequest.state
    drawerRequest.requestState = requestState as string
    drawerRequest.requestData = requestData as IServiceRequestGet
    switch (requestState) {
      case 'PENDIENTE':
        drawerRequest.requestAction = 'EDIT'
        break;
      case 'CANCELADA':
        drawerRequest.requestAction = 'SEE'
        break;
      case 'ACEPTADA':
        drawerRequest.requestAction = 'SEE'
        break;
      case 'FINALIZADA':
        drawerRequest.requestAction = 'SEE'
        break;
    
      default:
        break;
    }
  }

  const toggleChat = (service: IServiceRequestGet) => {
    modalChat.serviceRequest = service
    modalChat.chat = [] as IChat[]
    modalChat.toggleModal()
    modalChat.startUpdatingChats()
  }

  const setFilterState = (evt: Event) => {
    const select = evt.target as HTMLSelectElement
    categoryFiltered.value = select.selectedOptions[0].value
    if(categoryFiltered.value === 'view-all') {
      router.push('/services-request')
    } else {
      router.replace({ name: 'services-request', params: { category: select.selectedOptions[0].value }});
    }
  }

  const updateState = async (id: string | undefined, state: string) => {
    if(!id) return
    await drawerRequest.updateState(id, state)
  }

  const parseDate = (dateString: string | undefined) => {
    if(!dateString) return
    const date = new Date(dateString)
    const [year, month, day] = date.toISOString().split('T')[0].split('-')
    return `${day}/${month}/${year}`
  }

  onMounted(async () => {
    servicesRequest.value = await userStore.getServicesRequest() as IServiceRequestGet[]
    if(route.params.category && typeof route.params.category === 'string') {
      const upCase = route.params.category.toUpperCase();
      categoryFiltered.value = upCase as string
    } else {
      categoryFiltered.value = 'view-all' as string
    }
  })

  watch(() => userStore.servicesRequest, async (newValue, oldValue) => {
    if(newValue !== oldValue) {
      servicesRequest.value = await userStore.getServicesRequest() as IServiceRequestGet[]
    }
  })

  const toggleMenu = () => menuState.value = !menuState.value
  const toggleUserOptions = () => userOptionsState.value = !userOptionsState.value
</script>

<style scoped lang="scss">
  @import '../../styles/main.scss';
  .main-content {
    overflow: hidden;
    overflow-y: auto;
    position: relative;
    background: $color-white;
    border-radius: 1rem;
    padding: 1.6rem;
    box-shadow: .5rem .5rem 2rem rgba($color: $color-primary-2, $alpha: .14);
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

    .filter {
      @include display-flex(row, flex-end, center, wrap, 0 1.6rem);
      &__label {
        @include fontRegular(1.6rem, 0, 1.8rem, $color-black);
      }
      &__select {
        @include fontRegular(1.6rem, 0, 1.8rem, $color-black);
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background: none;
        border: .1rem solid $color-grey-30;
        border-radius: .5rem;
        padding: .8rem 1.6rem;
        margin: 0;
        min-width: 16rem;
        cursor: pointer;
      }
      &__select-wrapper {
        position: relative;
        cursor: pointer;

        svg {
          position: absolute;
          top: 50%;
          right: 1.2rem;
          transform: translateY(-50%);
        }
      }
    }
    &__title {
      margin: 0;
      @include fontBold(3.4rem, 0, 4rem, $color-black);
    }
    &__header-facets {
      margin: 0 0 4rem 0;
      @include display-flex(row, space-between, center, wrap, 0);
    }
    .grid {
      position: relative;
    }
  }
</style>