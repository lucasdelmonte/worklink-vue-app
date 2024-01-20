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

    <h2 class="main-content__title">Solicitudes</h2>

    <div class="grid grid--desktop-4 grid--tablet-3 grid--mobile-1">
      <div class="card-service" v-for="service in (servicesRequest as IServiceRequest[])">
        <header>
          <span class="card-service__date">Desde el {{ parseDate(service.fechaCreacion) }} hasta el {{ parseDate(service.fechaLimite) }}</span>
          <span class="card-service__state">{{ service.estado }}</span>
        </header>
        <p class="card-service__title">{{ service.titulo }}</p>
        <p class="card-service__category">{{ service.categoria }}</p>
        <p class="card-service__description">{{ service.descripcion }}</p>

        <template v-if="service.estado === 'PENDIENTE'">
          <button>Cancelar</button>
          <button>Ver detalles</button>
        </template>
        <template v-else-if="service.estado === 'CANCELADA'">
          <button>Ver detalles</button>
        </template>
        <template v-else-if="service.estado === 'ACEPTADA'">
          <button>Ver detalles</button>
        </template>
        <template v-else-if="service.estado === 'FINALIZADA'">
          <button>Pagar</button>
          <button>Ver detalles</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import type { Ref } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useLangStore } from '../stores/language'
  import Header from '../components/layout/Header.vue'
  import Megamenu from '../components/layout/Megamenu.vue'
  import type { IServiceRequest } from '../interfaces/ServiceRequestInterfaces'

  const userStore = useUserStore()
  const servicesRequest = ref<IServiceRequest[] | undefined>([])

  const menuState: Ref<boolean> = ref(false)
  const userOptionsState: Ref<boolean> = ref(false)
  const langStore = useLangStore()

  const parseDate = (dateString: string | undefined) => {
    if(!dateString) return
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  onMounted(async () => {
    servicesRequest.value = await userStore.getServicesRequest() as IServiceRequest[]
    console.log(servicesRequest.value);
  })

  const toggleMenu = () => menuState.value = !menuState.value
  const toggleUserOptions = () => userOptionsState.value = !userOptionsState.value
</script>

<style scoped lang="scss">
  @import '../../styles/main.scss';
  .main-content {
    overflow: hidden;
    position: relative;
    background: $color-white;
    border-radius: 1rem;
    padding: 1.6rem;
    box-shadow: .5rem .5rem 2rem rgba($color: $color-primary-2, $alpha: .14);
    height: 100%;

    &__title {
      margin: 0 0 4rem 0;
      @include fontBold(3.4rem, 0, 4rem, $color-black);
    }
    .grid {
      position: relative;
    }
  }
</style>