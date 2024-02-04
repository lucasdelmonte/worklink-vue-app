<template>
  <div class="modal-card" :class="{ 'modal-card--open' : modalBusiness.state }">
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
          <span>{{ modalBusiness.provider_business_rating }}</span>
        </div>
        <h4 class="card__title">{{ modalBusiness.provider_name }}</h4>
        <h5 class="card__category">{{ modalBusiness.provider_business_category }}</h5>
        <p class="card__description">{{ modalBusiness.provider_business_description }}</p>
      </div>
      <div class="card__buttons">
        <button @click="toggleModal" class="card__create-request button button--primary-white">Cerrar</button>
        <button @click="toggleRequest" class="card__create-request button button--primary-black">Crear solicitud<IconArrowRight :width="16" :height="16" :fill="'#FFFFFF'" /></button>
      </div>
      <div class="card__gradient"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import IconArrowRight from '@/components/icons/IconArrowRight.vue'
  import { useModalBusinessStore } from '../../stores/modalProviderCard'
  import { useDrawerRequestStore } from '../../stores/drawerRequest'

  const modalBusiness = useModalBusinessStore()
  const drawerRequest = useDrawerRequestStore()

  const toggleModal = () => {
    modalBusiness.state = !modalBusiness.state
    modalBusiness.resetAttributes()
  }
  const toggleRequest = () => {
    drawerRequest.state = !drawerRequest.state
    drawerRequest.requestAction = 'CREATE'
    modalBusiness.state = !modalBusiness.state
  }
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';
</style>