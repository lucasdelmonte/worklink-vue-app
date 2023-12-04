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

    <h2 class="page-title">Category: {{ category }}</h2>
    <div class="grid grid--desktop-4 grid--tablet-3 grid--mobile-1">
      <template v-for="provider in (providersFiltered as IProviderFiltered[])">
        <div class="card">
          <div class="card__content">
            <img class="card__media" src="" alt="Provider" lazyload>
          </div>
          <div class="card__information">
            <h4 class="card__title">{{ provider.full_name }}</h4>
            <p class="card__description">{{ provider.business[0].description }}</p>
            <p class="card__rating">{{ provider.business[0].rating }}</p>
          </div>
          <div class="card__gradient"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, Ref, onMounted, onUpdated } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useLangStore } from '../stores/language'
  import { useRoute } from 'vue-router';
  import { useProviderStore } from '../stores/provider'
  import Header from '../components/layout/Header.vue'
  import { IProviderFiltered } from '../interfaces/ProviderInterfaces'
  import Megamenu from '../components/layout/Megamenu.vue'


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
        }
        span {
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
      @include fontBold(3rem, 0, 4rem, $color-black);
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

    &__content {
      padding: 0;
      margin: 0;
      height: 6rem;
      width: 100%;
      position: relative;
      border-bottom: .1rem solid $color-grey-15;
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
    }
    &__information {
      padding: 2.2rem 1.6rem 1rem 1.6rem;
    }
    &__title {
      margin: 0 0 .8rem 0;
      @include fontBold(1.6rem, 0, 2rem, $color-black);
    }
    &__description {
      margin: 0 0 .8rem 0;
      @include fontRegular(1.2rem, 0, 2rem, $color-black);
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 5;
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