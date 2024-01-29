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
    
    <template v-if="userRol === 'CLIENTE'">
      <h2 class="main-content__title">Categorías</h2>
      <div class="main-content__categories">
        <div class="category">
          <img src="../assets/Icons/icons8-fontanero-50.png" alt="Categoria 1">
          <p>Plomero</p>
          <RouterLink class="category__anchor" :to="`/business/PLOMERO`"></RouterLink>
        </div>
        <div class="category">
          <img src="../assets/Icons/icons8-aire-acondicionado-central-50.png" alt="Categoria 2">
          <p>A-A</p>
          <RouterLink class="category__anchor" :to="`/business/AIRE_ACONDICIONADO`"></RouterLink>
        </div>
        <div class="category">
          <img src="../assets/Icons/icons8-compás-2-50.png" alt="Categoria 3">
          <p>Albañil</p>
          <RouterLink class="category__anchor" :to="`/business/ALBAÑIL`"></RouterLink>
        </div>
        <div class="category">
          <img src="../assets/Icons/icons8-arquitecto-50.png" alt="Categoria 4">
          <p>Arquitecto</p>
          <RouterLink class="category__anchor" :to="`/business/ARQUITECTO`"></RouterLink>
        </div>
        <div class="category">
          <img src="../assets/Icons/icons8-cepillo-barbero-50.png" alt="Categoria 5">
          <p>Barbero</p>
          <RouterLink class="category__anchor" :to="`/business/BARBERO`"></RouterLink>
        </div>
        <div class="category">
          <img src="../assets/Icons/icons8-llavero-50.png" alt="Categoria 6">
          <p>Cerrajero</p>
          <RouterLink class="category__anchor" :to="`/business/CERRAJERO`"></RouterLink>
        </div>
        <div class="category">
          <img src="../assets/Icons/icons8-carpintero-50.png" alt="Categoria 7">
          <p>Carpintero</p>
          <RouterLink class="category__anchor" :to="`/business/CARPINTERO`"></RouterLink>
        </div>
        <div class="category">
          <img src="../assets/Icons/icons8-cuidado-del-césped-50.png" alt="Categoria 8">
          <p>Jardinero</p>
          <RouterLink class="category__anchor" :to="`/business/JARDINERO`"></RouterLink>
        </div>
        <div class="category">
          <img src="../assets/Icons/icons8-cámara-privada-para-montaje-en-pared-50.png" alt="Categoria 9">
          <p>Seguridad</p>
          <RouterLink class="category__anchor" :to="`/business/SEGURIDAD`"></RouterLink>
        </div>
        <div class="category">
          <img src="../assets/Icons/icons8-enchufe-50.png" alt="Categoria 10">
          <p>Electricista</p>
          <RouterLink class="category__anchor" :to="`/business/ELECTRICISTA`"></RouterLink>
        </div>
        <div class="category">
          <img src="../assets/Icons/icons8-perro-caminando-50.png" alt="Categoria 11">
          <p>Mascotas</p>
          <RouterLink class="category__anchor" :to="`/business/MASCOTAS`"></RouterLink>
        </div>
        <div class="category">
          <img src="../assets/Icons/icons8-servicio-de-coche-50.png" alt="Categoria 12">
          <p>Vehiculos</p>
          <RouterLink class="category__anchor" :to="`/business/PINTOR`"></RouterLink>
        </div>
        <div class="category">
          <img src="../assets/Icons/icons8-rodillo-50.png" alt="Categoria 13">
          <p>Pintor</p>
          <RouterLink class="category__anchor" :to="`/business/VEHICULOS`"></RouterLink>
        </div>
        <div class="category">
          <img src="../assets/Icons/icons8-mantenimiento-50.png" alt="Categoria 14">
          <p>Tecnico</p>
          <RouterLink class="category__anchor" :to="`/business/TECNICO`"></RouterLink>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type { Ref } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useLangStore } from '../stores/language'
  import Header from '../components/layout/Header.vue'
  import Megamenu from '../components/layout/Megamenu.vue'
  import { useCookies } from 'vue3-cookies'

  const cookies = useCookies()

  const userRol = cookies.cookies.get('userRol')

  const userStore = useUserStore()
  const menuState: Ref<boolean> = ref(false)
  const userOptionsState: Ref<boolean> = ref(false)
  const langStore = useLangStore()

  onMounted(() => {
    const dataString: string | null = localStorage.getItem('worklink-lang-selected')
    if(dataString) langStore.setLanguage(dataString)
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

    &__categories {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr));
      grid-gap: 2rem;
      .category {
        width: 100%;
        max-width: 25rem;
        position: relative;
        @include display-flex(column, center, center, nowrap, 1.6rem 0);

        p {
          margin: 0;
          @include fontRegular(1.4rem, 0, 1.8rem, $color-black);
        }
        &__anchor {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>