<template>
  <Header @toggleMenu="toggleMenu" @toggleUserOptions="toggleUserOptions" :menuState="menuState"></Header>

  <div class="main-content main-content--accounts">
    <Megamenu @toggleMenu="toggleMenu" :menuState="menuState"></Megamenu>
    <div class="user-options" :open="userOptionsState">
      <ul class="user-options__list">
        <li><RouterLink class="hover-underline hover-underline--right" :to="`/account/${ userStore.userData._id }`">{{ langStore.lang.header.user.view_profile }}</RouterLink></li>
        <li><RouterLink class="hover-underline hover-underline--right" @click="userStore.logoutUser" :to="'/login-register'">{{ langStore.lang.header.user.logout }}</RouterLink></li>
      </ul>
    </div>
    <div class="account" v-if="userRol === 'CLIENTE'">
      <ClientAccount />
    </div>
    <div class="account" v-else-if="userRol === 'PROVEEDOR'">
      <ProviderAccount />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '../stores/user'
  import { useLangStore } from '../stores/language'
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import router from '@/router'
  import Header from '../components/layout/Header.vue'
  import Megamenu from '../components/layout/Megamenu.vue'
  import ProviderAccount from './ProviderAccount.vue'
  import ClientAccount from './ClientAccount.vue'
  import { useRoute } from 'vue-router'
  import { useCookies } from 'vue3-cookies'

  const userStore = useUserStore()
  const langStore = useLangStore()
  const route = useRoute()
  const menuState: Ref<boolean> = ref(false)
  const userOptionsState: Ref<boolean> = ref(false)

  const cookies = useCookies()
  const userId = cookies.cookies.get('userId') as '' | undefined
  const userRol = cookies.cookies.get('userRol') as 'CLIENTE' | 'PROVEEDOR' | undefined

  if (route.params.id != userId && userId != undefined) {
    router.push(`/account/${ userId }`)
  } else if (!userId) {
    router.push('/login-user')
  }

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

    &--accounts {
      padding: 0;
      border: .1rem solid $color-black;
    }

    h2 {
      margin: 0 0 2rem 0;
      @include fontRegular(2.8rem, 0, 3.6rem, $color-black);
    }
    .grid {
      position: relative;
    }

    .account {
      height: 100%;
      box-sizing: border-box;
    }
  }
</style>