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
    
    <h2 class="main-content__title">Negocios del tipo: {{ category }}</h2>

    <div class="grid grid--desktop-4 grid--tablet-3 grid--mobile-1">
      <template v-if="!providerStore.isLoading" v-for="business in (businessFiltered as IBusinessFiltered[])">
        <div class="card" v-if="business.is_active">
          <div class="card__content" :style="`background-image: url('${ business.images[0] }');`">
            <div class="card__wishlist">
              <IconWishlist :width="17" :height="16" />
            </div>
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
              <span>{{ business.rating }}</span>
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
  import { useModalBusinessStore } from '@/stores/modalProviderCard'
  import IconWishlist from '@/components/icons/IconWishlist.vue'
  import type { IBusinessFiltered } from '@/interfaces/BusinessInterfaces'
  import IconSpinner from '@/components/icons/IconSpinner.vue'

  const modalBusiness = useModalBusinessStore()

  const toggleModal = (business: IBusinessFiltered) => {
    modalBusiness.state = !modalBusiness.state
    modalBusiness.provider_id = business.provider.id
    modalBusiness.provider_name = business.provider.full_name
    modalBusiness.provider_business_id = business.id
    modalBusiness.provider_business_description = business.description
    modalBusiness.provider_business_category = business.category
    modalBusiness.provider_business_rating = business.rating ? business.rating : 0
    modalBusiness.provider_business_images = business.images ? business.images : []
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
    businessFiltered.value = await providerStore.getBusinessFiltered(newCategory as string)
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

    &__title {
      margin: 0 0 4rem 0;
      @include fontBold(3.4rem, 0, 4rem, $color-black);
    }
    .grid {
      position: relative;
    }
  }
</style>