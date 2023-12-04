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
    
    <h2>Home page</h2>
  </div>
</template>

<script setup lang="ts">
  import { ref, Ref, onMounted } from 'vue'
  import { useUserStore } from '../stores/user'
  import { useLangStore } from '../stores/language'
  import Header from '../components/layout/Header.vue'
  import Megamenu from '../components/layout/Megamenu.vue'

  const userStore = useUserStore()
  const menuState: Ref<boolean> = ref(false)
  const userOptionsState: Ref<boolean> = ref(false)
  const langStore = useLangStore()

  onMounted(() => {
    const dataString: string | null = localStorage.getItem('worklink-lang-selected')
    if(dataString) langStore.setLanguage(dataString)
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
  .megamenu {
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    z-index: 1;
    width: 100%;
    transition: translate 350ms ease;
    translate: 0 -110%;

    &[open="true"] {
      transition: translate 350ms ease;
      translate: 0 0;
    }
    &__nav {
      background: $color-white;
      border-radius: 1rem;
      padding: 2rem 1.6rem;
      box-shadow: .5rem .5rem 2rem rgba($color: $color-primary-2, $alpha: .14);
      display: grid;
      grid-template-columns: 22rem 1fr;
    }
    &__list-first-level {
      margin: 0;
      padding: 0;
      list-style: none;
      width: 100%;
      max-width: 25rem;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: .1rem;
        background: $color-grey-15;
      }
      li {
        padding: 0 0 1.6rem 0;
        @include fontRegular(1.6rem, 0, 2rem, $color-black);

        a {
          cursor: pointer;
          padding-bottom: .4rem;
        }
      }
      li:last-child {
        padding-bottom: 0;
      }
    }
    &__list-second-level {
      margin: 0;
      padding: 0;
      list-style: none;
      width: 100%;
      padding-left: 2rem;
      @include display-flex(row, space-between, flex-start, wrap, 1.6rem);

      li {
        padding: 0 0 1.6rem 0;
        min-width: 14rem;
        a {
          @include fontRegular(1.4rem, 0, 2rem, $color-black);
          cursor: pointer;
          padding-bottom: .6rem;
          text-decoration: none;
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
      margin: 0;
      @include fontBold(3.4rem, 0, 4rem, $color-black);
    }
  }
</style>