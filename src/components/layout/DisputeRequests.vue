<template>
  <div>
    <h2 class="main-content__title">Solicitudes en disputa</h2>
    <div class="grid grid--desktop-4 grid--tablet-3 grid--mobile-1">
      <template v-for="service in (servicesRequest as IServiceRequestGet[])">
        <div class="card-service">
          <header>
            <span class="card-service__date">{{ service.categoria }}</span>
            <span class="card-service__state">{{ service.estado }}</span>
          </header>
          <p class="card-service__client">Cliente: <span>{{ service.cliente?.nombre_apellido }}</span></p>
          <p class="card-service__business">Negocio: <span>{{ service.negocio.nombre }}</span></p>

          <div class="card-service__buttons">
            <button @click="toggleDrawer(service.estado, service)" class="button button--primary-black button--right">Detalles</button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted } from 'vue'
  import { useCookies } from 'vue3-cookies'
  import type { IServiceRequestGet } from '../../interfaces/ServiceRequestInterfaces'
  import { useDrawerRequestStore } from '../../stores/drawerRequest'
  import { useUserStore } from '../../stores/user'

  const cookies = useCookies()
  const drawerRequest = useDrawerRequestStore()
  const userStore = useUserStore()

  const userRol = cookies.cookies.get('userRol')

  const servicesRequest = ref<IServiceRequestGet[] | undefined>([])

  const toggleDrawer = (requestState: string | undefined, requestData: IServiceRequestGet) => {
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

  watch(() => userStore.servicesRequest, async (newValue, oldValue) => {
    if(newValue !== oldValue) {
      servicesRequest.value = await userStore.getServicesRequestByState('PENDIENTE') as IServiceRequestGet[]
    }
  })

  onMounted(async () => {
    servicesRequest.value = await userStore.getServicesRequestByState('PENDIENTE') as IServiceRequestGet[]
  })
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .main-content {
    &__title {
      margin: 0rem 0 2rem 0;
      @include fontBold(3.4rem, 0, 4rem, $color-black);
    }
    .grid {
      position: relative;
    }
  }
</style>