<template>
  <div class="modal-card" :class="{ 'modal-card--open' : providerCard.state }">
    <div class="card">
      <div class="card__content" style="background-image: url('https://cdn.shopify.com/s/files/1/0618/8115/5826/files/white-black-digital-art-monochrome-abstract-reflection-206803-wallhere.com.jpg?v=1701723919');">
        <img class="card__media" src="https://cdn.shopify.com/s/files/1/0618/8115/5826/files/user.jpg?v=1701717572" alt="Provider" lazyload>
      </div>
      <div class="card__information">
        <div class="card__rating" :class="`rating--${ Math.round(providerCard.provider_business_rating) }`">
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
        <h4 class="card__title">{{ providerCard.provider_name }}</h4>
        <h5 class="card__category">Category {{ providerCard.provider_business_category }}</h5>
        <p class="card__description">{{ providerCard.provider_business_description }}</p>
      </div>
      <div class="card__buttons">
        <button @click="toggleModal" class="card__create-request button button--primary-white">Close</button>
        <button @click="toggleRequest" class="card__create-request button button--primary-black">Create Request <IconArrowRight :width="16" :height="16" :fill="'#FFFFFF'" /></button>
      </div>
      <div class="card__gradient"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import IconArrowRight from '@/components/icons/IconArrowRight.vue'
  import { useModalProviderCardStore } from '../../stores/modalProviderCard'
  import { useDrawerProviderRequestStore } from '../../stores/drawerProviderRequest'

  const providerCard = useModalProviderCardStore()
  const providerRequest = useDrawerProviderRequestStore()

  const toggleModal = () => {
    providerCard.state = !providerCard.state
    providerCard.resetAttributes()
  }
  const toggleRequest = () => {
    providerRequest.state = !providerRequest.state
    providerCard.state = !providerCard.state
  }
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';
</style>