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

  .modal-card {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 3.2rem);
    height: 100vh;
    background-color: rgba(0, 0, 0, .4);
    z-index: -1;
    opacity: 0;
    padding: 1.6rem;
    @include display-flex(row, center, center, nowrap, 0);

    &--open {
      z-index: 3;
      opacity: 1;

      .card {
        transform: translateY(0%);
      }
    }
    &:not(.modal-card--open) {
      .card {
        transform: translateY(-150%);
      }
    }
    .card {
      transition: transform 400ms ease;
      max-width: 83.2rem;
      max-height: 58.2rem;
      width: 100%;
      background-color: $color-white;
      border-radius: 1.6rem;
      overflow: hidden;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 6rem 1fr 6rem 1rem;
      box-shadow: .5rem .5rem 2rem rgba(0, 0, 0, 0.14);

      &__content {
        padding: 0;
        margin: 0;
        height: 6rem;
        width: 100%;
        position: relative;
        border-bottom: .1rem solid $color-grey-15;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
      }
      &__media {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        max-width: 6rem;
        max-height: 6rem;
        position: absolute;
        bottom: -2rem;
        right: 1.6rem;
        border: .1rem solid $color-grey-15;
        background-color: $color-white;
        object-fit: contain;
      }
      &__information {
        padding: 2.2rem 1.6rem 0 1.6rem;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      &__rating {
        margin: .8rem 0;
        text-align: right;
        @include display-flex(row, flex-end, center, nowrap, 0);

        svg {
          max-width: 1.6rem;
        }
        span {
          position: relative;
          height: 1.6rem;
          width: 1.6rem;
          @include display-flex(row, center, center, nowrap, 0);
        }
        &.rating--1 {
          .star--2,
          .star--3,
          .star--4,
          .star--5 {
            &::after {
              content: "";
              position: absolute;
              top: 0;
              right: 0;
              display: block;
              width: 100%;
              height: 100%;
              z-index: 1;
              background: white;
              opacity: .8;   
            } 
          }
        }
        &.rating--2 {
          .star--3,
          .star--4,
          .star--5 {
            &::after {
              content: "";
              position: absolute;
              top: 0;
              right: 0;
              display: block;
              width: 100%;
              height: 100%;
              z-index: 1;
              background: white;
              opacity: .8;   
            } 
          }
        }
        &.rating--3 {
          .star--4,
          .star--5 {
            &::after {
              content: "";
              position: absolute;
              top: 0;
              right: 0;
              display: block;
              width: 100%;
              height: 100%;
              z-index: 1;
              background: white;
              opacity: .8;   
            } 
          }
        }
        &.rating--4 {
          .star--5 {
            &::after {
              content: "";
              position: absolute;
              top: 0;
              right: 0;
              display: block;
              width: 100%;
              height: 100%;
              z-index: 1;
              background: white;
              opacity: .8;   
            } 
          }
        }
      }
      &__title {
        margin: 0 0 .4rem 0;
        @include fontBold(1.8rem, 0, 2rem, $color-black);
      }
      &__category {
        margin: 0 0 1.4rem 0;
        @include fontRegular(1.4rem, 0, 2rem, $color-black);
      }
      &__description {
        margin: 0 0 .8rem 0;
        height: 100%;
        overflow-y: auto;
        @include fontRegular(1.4rem, 0, 2rem, $color-black);
      }
      &__buttons {
        padding: 0 1.6rem;
        width: calc(100% - 3.2rem);
        @include display-flex(row, space-between, center, wrap, 0); 
      }
      &__create-request {
        width: fit-content;
        min-height: 4rem;
        padding: 0 .8rem;
        font-size: 1.2rem;
        line-height: 1.6rem;
        @include display-flex(row, center, center, nowrap, 0);

        svg {
          transition: all 350ms ease;
        }
        &:hover {
          svg {
            fill: $color-black;
          }
        }
      }
      &__gradient {
        width: 100%;
        height: 1rem;
        display: block;
        background: rgb(0,0,0);
        background: linear-gradient(90deg, rgba(0,0,0,1) 18%, rgba(249,203,82,1) 100%);
      }
    }
  }
</style>