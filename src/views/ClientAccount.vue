<template>
  <div class="account__hero-banner">
    <img src="https://cdn.shopify.com/s/files/1/0618/8115/5826/files/white-black-digital-art-monochrome-abstract-reflection-206803-wallhere.com.jpg?v=1701723919" alt="Test image">
    
    <div class="account__user-image">
      <img src="https://cdn.shopify.com/s/files/1/0618/8115/5826/files/user.jpg?v=1701717572" :alt="userStore.userData.nombre_apellido" lazyload="lazy">
    </div>
    <h1 class="account__title">{{ userStore.userData.nombre_apellido }}</h1>
  </div>
  <div class="account__content">
    <nav class="account__nav">
      <ul class="account__nav-list">
        <li><a class="hover-underline hover-underline--right">Detalles de la cuenta</a></li>
        <li><a class="hover-underline hover-underline--right">Pagos realizados</a></li>
        <li><RouterLink class="hover-underline hover-underline--right" @click="userStore.logoutUser" :to="'/login-register'">{{ langStore.lang.header.user.logout }}</RouterLink></li>
      </ul>
    </nav>
    <div class="account__main">
      <h2>Detalles de la cuenta</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '../stores/user'
  import { useLangStore } from '../stores/language'

  const userStore = useUserStore()
  const langStore = useLangStore()
</script>

<style scoped lang="scss">
  @import '../../styles/main.scss';

  .account {
    height: 100%;
    width: 100%;
    &__hero-banner {
      height: 20rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__user-image {
      position: absolute;
      bottom: -3rem;
      right: 5rem;
      border-radius: 50%;
      overflow: hidden;
      width: 16rem;
      height: 16rem;
      border: .1rem solid $color-black;
    }

    &__title {
      margin: 0;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      padding: 1.6rem;
      background-color: $color-white;
      border: none;
      border-bottom-right-radius: 1rem;
      @include fontBold(2rem, 0, 2.4rem, $color-black)
    }

    &__content {
      display: grid;
      grid-template-columns: 26rem 1fr;
      height: 100%;
    }

    &__nav {
      width: 100%;
      height: 100%;
      padding: 2rem .8rem 2rem 1.6rem;
      border-right: .1rem solid $color-black;
      box-sizing: border-box;
      @include display-flex(column, flex-start, flex-start, nowrap, 1.6rem 0);
      &-list {
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          padding-bottom: 2rem;
          a {
            padding-bottom: .6rem;
            text-decoration: none;
            cursor: pointer;
            @include fontMedium(1.8rem, 0, 2rem, $color-black);
          }
        }
        li:last-child {
          padding-bottom: 0;
        }
      }
    }

    &__main {
      width: 100%;
      height: 100%;
      padding: 1rem .8rem 2rem 1.6rem;
      box-sizing: border-box;

      h2 {
        margin: 0;
        @include fontBold(2.8rem, 0, 3.6rem, $color-black);
      }
    }
  }
</style>