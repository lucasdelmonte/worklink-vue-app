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
    <div class="grid grid--desktop-4 grid--tablet-3 grid--mobile-1">
      <template v-if="!providerStore.isLoading" v-for="business in (businessFiltered as IBusinessFiltered[])">
        <div class="card">
          <div class="card__content" style="background-image: url('https://cdn.shopify.com/s/files/1/0618/8115/5826/files/white-black-digital-art-monochrome-abstract-reflection-206803-wallhere.com.jpg?v=1701723919');">
            <div class="card__wishlist">
              <IconWishlist :width="17" :height="16" />
            </div>
            <img class="card__media" src="https://cdn.shopify.com/s/files/1/0618/8115/5826/files/user.jpg?v=1701717572" alt="Provider" lazyload>
          </div>
          <div class="card__information">
            <div class="card__rating" :class="`rating--${ Math.round(business.rating) }`">
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
            <h4 class="card__title">{{ business.name }}</h4>
            <p class="card__description">{{ business.description }}</p>
            <button @click="toggleModal(business)" class="card__view-more">{{ langStore.lang.card.btn_details }} <IconArrowRight :width="16" :height="16" :fill="'#000000'" /></button>
          </div>
          <div class="card__gradient"></div>
        </div>
      </template>
      <template v-else>
        <IconSpinner :width="40" :height="40" :stroke='"#000000"' />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import type { Ref } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useLangStore } from '../stores/language'
  import { useRoute } from 'vue-router'
  import { useProviderStore } from '../stores/provider'
  import Header from '../components/layout/Header.vue'
  import Megamenu from '../components/layout/Megamenu.vue'
  import IconArrowRight from '@/components/icons/IconArrowRight.vue'
  import { useModalProviderCardStore } from '@/stores/modalProviderCard'
  import IconWishlist from '@/components/icons/IconWishlist.vue'
  import type { IBusinessFiltered } from '@/interfaces/BusinessInterfaces'
  import IconSpinner from '@/components/icons/IconSpinner.vue'

  const providerCard = useModalProviderCardStore()

  const toggleModal = (business: IBusinessFiltered) => {
    providerCard.state = !providerCard.state
    providerCard.provider_id = business.provider.id
    providerCard.provider_name = business.provider.full_name
    providerCard.provider_business_description = business.description
    providerCard.provider_business_category = business.category
    providerCard.provider_business_rating = business.rating
  }

  const userStore = useUserStore()
  const providerStore = useProviderStore()
  const route = useRoute()
  const category = ref('')
  const businessFiltered = ref<IBusinessFiltered[] | undefined>([])

  const menuState: Ref<boolean> = ref(false)
  const userOptionsState: Ref<boolean> = ref(false)
  const langStore = useLangStore()

  onMounted(async () => {
    category.value = route.params.category as string
    businessFiltered.value = await providerStore.getBusinessFiltered(category.value)
  })

  watch(() => route.params.category, async (newCategory) => {
    category.value = newCategory as string;
    businessFiltered.value = await providerStore.getBusinessFiltered(newCategory as string);
  });

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

    h2 {
      margin: 0 0 2rem 0;
      @include fontRegular(2.8rem, 0, 3.6rem, $color-black);
    }
    .grid {
      position: relative;
    }
  }
</style>