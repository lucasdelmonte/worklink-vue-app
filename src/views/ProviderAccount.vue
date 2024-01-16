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
      <div class="card__rating" :class="`rating--${ Math.round(userStore.userData.puntuacion) }`">
        <span class="star--1">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F9CB52" aria-hidden="true" class="w-4 h-4 text-green-500">
            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
          </svg>
        </span>
        <span class="star--2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F9CB52" aria-hidden="true" class="w-4 h-4 text-green-500">
            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
          </svg>
        </span>
        <span class="star--3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F9CB52" aria-hidden="true" class="w-4 h-4 text-green-500">
            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
          </svg>
        </span>
        <span class="star--4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F9CB52" aria-hidden="true" class="w-4 h-4 text-green-500">
            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
          </svg>
        </span>
        <span class="star--5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F9CB52" aria-hidden="true" class="w-4 h-4 text-green-500">
            <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
          </svg>
        </span>
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
              <div class="card__rating" :class="`rating--5`">
                <span class="star--1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F9CB52" aria-hidden="true" class="w-4 h-4 text-green-500">
                    <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
                  </svg>
                </span>
                <span class="star--2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F9CB52" aria-hidden="true" class="w-4 h-4 text-green-500">
                    <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
                  </svg>
                </span>
                <span class="star--3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F9CB52" aria-hidden="true" class="w-4 h-4 text-green-500">
                    <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
                  </svg>
                </span>
                <span class="star--4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F9CB52" aria-hidden="true" class="w-4 h-4 text-green-500">
                    <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
                  </svg>
                </span>
                <span class="star--5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F9CB52" aria-hidden="true" class="w-4 h-4 text-green-500">
                    <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
                  </svg>
                </span>
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
  import type { IBusiness } from '../interfaces/BusinessInterfaces';
  

  const userStore = useUserStore()
  const isLoading: Ref<boolean> = ref(false)
  const business: Ref<[]> = ref([])

  const getBusiness = async () => { 
    isLoading.value = true
    try {
      const URL = `http://localhost:4000/negocios?proveedor=${ userStore.userData._id }`
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