<template>
  <div class="account__hero-banner">
    <img src="https://cdn.shopify.com/s/files/1/0618/8115/5826/files/white-black-digital-art-monochrome-abstract-reflection-206803-wallhere.com.jpg?v=1701723919" alt="Test image">
    
    <div class="account__user-panel">
      <button class="button button--primary-white">Detalle de la cuenta</button>
      <div class="account__user-image">
        <img src="https://cdn.shopify.com/s/files/1/0618/8115/5826/files/user.jpg?v=1701717572" :alt="userStore.userData.nombre_apellido" lazyload="lazy">
      </div>
      <button class="button button--primary-white">Crear negocio</button>
    </div>
  </div>
  <div class="account__main">
    <header class="account__heading">
      <h1 class="account__title">{{ userStore.userData.nombre_apellido }}</h1>
      <div class="card__rating">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <clipPath id="star">
              <path d="M12 16.743L17.562 20.1L16.086 13.773L21 9.516L14.529 8.967L12 3L9.471 8.967L3 9.516L7.914 13.773L6.438 20.1L12 16.743Z" fill="black"></path>
            </clipPath>
          </defs>
          <rect x="0" y="0" fill="black" width="100%" height="100%" clip-path="url(#star)"></rect>
          <rect x="100" y="0" fill="#DDDDDD" width="100%" height="100%" clip-path="url(#star)"></rect>
        </svg>
        <span>{{ userStore.userData.puntuacion }}</span>
      </div>
    </header>
    <div class="account__content">
      <h2>Negocios</h2>
      <div class="grid grid--desktop-4 grid--tablet-3 grid--mobile-1">
        <template v-if="!isLoading" v-for="businessItem in (business as IBusiness[])">
          <div class="card">
            <div class="card__content" style="background-image: url('https://cdn.shopify.com/s/files/1/0618/8115/5826/files/white-black-digital-art-monochrome-abstract-reflection-206803-wallhere.com.jpg?v=1701723919');">
              <img class="card__media" src="https://cdn.shopify.com/s/files/1/0618/8115/5826/files/user.jpg?v=1701717572" alt="Provider" lazyload>
            </div>
            <div class="card__information">
              <div class="card__rating">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <clipPath id="star">
                      <path d="M12 16.743L17.562 20.1L16.086 13.773L21 9.516L14.529 8.967L12 3L9.471 8.967L3 9.516L7.914 13.773L6.438 20.1L12 16.743Z" fill="black"></path>
                    </clipPath>
                  </defs>
                  <rect x="0" y="0" fill="black" width="100%" height="100%" clip-path="url(#star)"></rect>
                  <rect x="100" y="0" fill="#DDDDDD" width="100%" height="100%" clip-path="url(#star)"></rect>
                </svg>
                <span>{{ businessItem.puntuacion }}</span>
              </div>
              <h4 class="card__title">{{ businessItem.nombre }}</h4>
              <p class="card__description">{{ businessItem.descripcion }}</p>
              <div class="card__buttons">
                <button class="button button--secondary-black">Eliminar</button>
                <button class="button button--primary-black">Editar</button>
              </div>
            </div>
            <div class="card__gradient"></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '../stores/user'
  import { ref, onMounted } from 'vue'
  import type { Ref } from 'vue'
  import type { IBusiness } from '../interfaces/BusinessInterfaces'
  import { useCookies } from 'vue3-cookies'
  import router from '@/router'
  
  const userStore = useUserStore()
  const isLoading: Ref<boolean> = ref(false)
  const business: Ref<[]> = ref([])
  const cookies = useCookies()
  const userId = cookies.cookies.get('userId') as '' | undefined
  const userRol = cookies.cookies.get('userRol') as 'CLIENTE' | 'PROVEEDOR' | undefined

  if (!userId || userId === '' || !userRol || userRol === 'CLIENTE') router.push('/login-register')

  const getBusiness = async () => { 
    isLoading.value = true
    try {
      const URL = `http://localhost:4000/negocios?proveedor=${ userId }`
      const response = await fetch(URL)

      if (!response.ok) throw new Error('Request error')

      const dataRes = await response.json()
      const data = dataRes.data

      business.value = data
    } catch (error) {
      console.log(error); 
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    getBusiness()
  })
</script>

<style scoped lang="scss">
  @import '../../styles/main.scss';

  .account {
    height: 100%;
    width: 100%;
    .card {
      &__buttons {
        margin-top: 2rem;
        width: 100%;
        padding: 0;
        @include display-flex(row, space-between, center, nowrap, 0);
        .button {
          width: fit-content;
          min-width: 10rem;
          min-height: 4.5rem;
        }
      }
    }
    &__hero-banner {
      height: 20rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }


    &__user-panel {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -3rem;
      @include display-flex(row, center, center, nowrap, 0 2rem);

      .button {
        width: fit-content;
        min-width: 16.6rem;
        min-height: 4.5rem;
        padding: 0 .8rem;
      }
    }

    &__user-image {
      border-radius: 50%;
      overflow: hidden;
      width: 16rem;
      height: 16rem;
      border: .1rem solid $color-black;
    }

    &__heading {
      height: fit-content;
      margin-bottom: 4rem;
      @include display-flex(row, space-between, center, nowrap, 0);
    }

    &__title {
      margin: 0;
      @include fontBold(2rem, 0, 2.4rem, $color-black)
    }

    &__content {
      width: 100%;
      height: 100%;
      box-sizing: border-box;

      h2 {
        margin: 0 0 2rem 0;
        @include fontBold(2.8rem, 0, 3.6rem, $color-black);
      }
    }

    &__main {
      padding: 2rem 1.6rem;
    }
  }
</style>