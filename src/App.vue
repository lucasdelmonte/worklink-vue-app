<template>
  <main>
    <router-view></router-view>
    <ModalBusinessDetails />
    <DrawerRequest />
    <ToastAlertCustom />
  </main>
</template>

<script setup lang="ts">
  import ToastAlertCustom from './components/notificationPopUp/ToastAlertCustom.vue'
  import ModalBusinessDetails from './components/modals/ModalBusinessDetails.vue'
  import DrawerRequest from './components/drawers/DrawerRequest.vue'
  import { onMounted } from 'vue'
  import { useCookies } from 'vue3-cookies'
  import { useUserStore } from './stores/user';

  const userStore = useUserStore()

  const cookies = useCookies()
  const userId = cookies.cookies.get('userId') as '' | undefined
  const userRol = cookies.cookies.get('userRol') as 'CLIENTE' | 'PROVEEDOR' | undefined
  const userNombreApellido = cookies.cookies.get('userNombreApellido') as '' | undefined
  const userPuntuacion = cookies.cookies.get('userPuntuacion') as '' | undefined
  const userTelefono = cookies.cookies.get('userTelefono') as '' | undefined
  const userIsActive = cookies.cookies.get('userIsActive') as '' | undefined
  const userEmail = cookies.cookies.get('userEmail') as '' | undefined

  onMounted(() => {
    if(Object.keys(userStore.userData).length > 0 || !userId) return

    userStore.userData._id = !userId ? '' : userId
    userStore.userData.rol = !userRol ? '' : userRol
    userStore.userData.nombre_apellido = !userNombreApellido ? '' : userNombreApellido
    userStore.userData.puntuacion = !userPuntuacion ? 0 : userPuntuacion
    userStore.userData.telefono = !userTelefono ? '' : `${ userTelefono }`
    userStore.userData.isActive = !userIsActive ? false : userIsActive
    userStore.userData.email = !userEmail ? '' : userEmail
  })
</script>

<style lang="scss">
  @import '../styles/main.scss';

  main {
    overflow: hidden;
    width: calc(100vw - 3.2rem);
    height: calc(100vh - 3.2rem);
    position: relative;
    padding: 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem 0;
    align-items: stretch;
    @include display-flex(column, flex-start, stretch, nowrap, 1.6rem 0);
  }
</style>
