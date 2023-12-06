<template>
  <Header @toggleMenu="toggleMenu" @toggleUserOptions="toggleUserOptions" :menuState="menuState"></Header>

  <div class="main-content">
    <Megamenu @toggleMenu="toggleMenu" :menuState="menuState"></Megamenu>

    <div class="user-options" :open="userOptionsState">
      <ul class="user-options__list">
        <li><a>{{ langStore.lang.header.user.view_profile }}</a></li>
        <li><a class="hover-underline hover-underline--right" @click="userStore.logoutUser">{{ langStore.lang.header.user.logout }}</a></li>
      </ul>
    </div>
    <div class="grid grid--desktop-4 grid--tablet-3 grid--mobile-1">
      <template v-for="provider in (providersFiltered as IProviderFiltered[])">
        <div class="card">
          <div class="card__content" style="background-image: url('https://cdn.shopify.com/s/files/1/0618/8115/5826/files/white-black-digital-art-monochrome-abstract-reflection-206803-wallhere.com.jpg?v=1701723919');">
            <div class="card__wishlist">
              <IconWishlist :width="17" :height="16" />
            </div>
            <img class="card__media" src="https://cdn.shopify.com/s/files/1/0618/8115/5826/files/user.jpg?v=1701717572" alt="Provider" lazyload>
          </div>
          <div class="card__information">
            <div class="card__rating" :class="`rating--${ Math.round(provider.business[0].rating) }`">
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
            <h4 class="card__title">{{ provider.full_name }}</h4>
            <p class="card__description">{{ provider.business[0].description }}</p>
            <button @click="toggleModal(provider)" class="card__view-more">{{ langStore.lang.card.btn_details }} <IconArrowRight :width="16" :height="16" :fill="'#000000'" /></button>
          </div>
          <div class="card__gradient"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, Ref, onUpdated } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useLangStore } from '../stores/language'
  import { useRoute } from 'vue-router';
  import { useProviderStore } from '../stores/provider'
  import Header from '../components/layout/Header.vue'
  import { IProviderFiltered } from '../interfaces/ProviderInterfaces'
  import Megamenu from '../components/layout/Megamenu.vue'
  import IconArrowRight from '@/components/icons/IconArrowRight.vue'
  import { useModalProviderCardStore } from '@/stores/modalProviderCard'
  import IconWishlist from '@/components/icons/IconWishlist.vue'

  const providerCard = useModalProviderCardStore()

  const toggleModal = (provider: any) => {
    providerCard.state = !providerCard.state
    providerCard.provider_id = provider.id
    providerCard.provider_name = provider.full_name
    providerCard.provider_business_description = provider.business[0].description
    providerCard.provider_business_category = provider.business[0].category
    providerCard.provider_business_rating = provider.business[0].rating
  }

  const userStore = useUserStore()
  const providerStore = useProviderStore()
  const route = useRoute()
  const category = ref('')
  const providersFiltered: Ref<{}> = ref({
    id: 0,
    full_name: '',
    business: {
      id: 0,
      name: '',
      category: '',
      description: '',
      rating: 0
    }
  })
  category.value = route.params.category as string
  providersFiltered.value = providerStore.getProviders(category.value)

  const menuState: Ref<boolean> = ref(false)
  const userOptionsState: Ref<boolean> = ref(false)
  const langStore = useLangStore()


  onUpdated(() => {
    if(category.value === route.params.category) return
    category.value = route.params.category as string
    providersFiltered.value = providerStore.getProviders(category.value)
  })

  const toggleMenu = () => menuState.value = !menuState.value
  const toggleUserOptions = () => userOptionsState.value = !userOptionsState.value
</script>

<style scoped lang="scss">
  @import '../../styles/main.scss';

  .user-options {
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    z-index: 2;
    min-width: 16rem;
    text-align: right;
    transition: translate 350ms ease;
    translate: 0 -110%;

    &[open="true"] {
      transition: translate 350ms ease;
      translate: 0 0;
    }
    &__list {
      margin: 0;
      padding: 0;
      list-style: none;
      background: $color-white;
      border-radius: 1rem;
      padding: 2rem 1.6rem;
      box-shadow: .5rem .5rem 2rem rgba($color: $color-primary-2, $alpha: .14);

      li {
        padding: 0 0 1.6rem 0;
        margin: 0;
        
        a {
          @include fontRegular(1.6rem, 0rem, 2rem, $color-primary-2);
          text-decoration: none;
          padding-bottom: .6rem;
          cursor: pointer;
        }
      }
      li:last-child {
        padding-bottom: 0;
      }
    }
  }
  .main-content {
    overflow: hidden;
    position: relative;
    background: $color-white;
    border-radius: 1rem;
    padding: 1.6rem;
    box-shadow: .5rem .5rem 2rem rgba($color: $color-primary-2, $alpha: .14);
    height: 100%;

    h2 {
      margin: 0 0 2rem 0;
      @include fontRegular(2.8rem, 0, 3.6rem, $color-black);
    }
  }

  .card {
    border-radius: 1.6rem;
    border: .1rem solid $color-grey-15;
    overflow: hidden;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 6rem 1fr 1rem;
    box-shadow: .5rem .5rem 2rem rgba(0, 0, 0, 0.14);
    &:hover {
      .card__view-more {
        svg {
          transform: translateX(.4rem);
        }
      }
    }
    &__wishlist {
      position: absolute;
      top: .4rem;
      left: .4rem;
      z-index: 0;
      background-color: rgba($color: $color-white, $alpha: 1);
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      @include display-flex(row, center, center, nowrap, 0);
      cursor: pointer;
      box-shadow: 0 .3rem .6rem #00000014;

      svg {
        width: 100%;
      }
    }
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
      padding: 2.2rem 1.6rem 1rem 1.6rem;
      display: flex;
      flex-direction: column;
    }
    &__rating {
      margin: .6rem 0;
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
      margin: 0 0 .8rem 0;
      @include fontBold(1.6rem, 0, 2rem, $color-black);
    }
    &__description {
      margin: 0 0 .8rem 0;
      height: 100%;
      @include fontRegular(1.2rem, 0, 2rem, $color-black);
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
    }
    &__view-more {
      border: 0;
      background-color: $color-white;
      width: fit-content;
      height: 2rem;
      text-align: right;
      padding: 0;
      margin-left: auto;
      cursor: pointer;
      @include fontRegular(1.2rem, 0, 1.8rem, $color-black);
      @include display-flex(row, flex-end, center, nowrap, 0 .4rem);

      svg {
        transition: all 350ms ease;
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
</style>