<template>
  <header class="header">
    <div @click="toggleMenu" class="header__menu" :open="menuState">
      <div></div>
      <div></div>
    </div>
    <h1 class="header__title"><a href="/">Work<span>Link</span></a></h1>
    <div class="header__user">
      <a href="/"><IconWishlist :width="17" :height="16" /></a>
      <a @click="toggleUserOptions"><IconUser :width="12" :height="18" /></a>
    </div>
  </header>
  <div class="main-content">
    <div class="user-options" :open="userOptionsState">
      <ul class="user-options__list">
        <li><a>View profile</a></li>
        <li><a class="hover-underline hover-underline--right" @click="userStore.logoutUser">Logout</a></li>
      </ul>
    </div>
    <div class="megamenu" :open="menuState">
      <nav class="megamenu__nav">
        <ul class="megamenu__list-first-level">
          <li><a>Categories</a></li>
        </ul>
        <div>
          <ul class="megamenu__list-second-level">
            <li><a class="hover-underline hover-underline--right" data-lang-es="A/A">A/C</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Albañil">Construction worker</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Arquitecto">Architect</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Autos">Cars</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Belleza">Beauty</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Bienestar">Welfare</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Carpintero">Carpenter</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Cerrajero">Locksmith</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Colocador">Setter</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Control de plagas">pest control</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Cuidadores">Caregivers</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Decorador">Decorator</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Electricista">Electrician</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Eventos">Events</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Gasista">Gasman</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Herrero">blacksmith</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Jardinero">Gardener</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Limpieza">Cleaning</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Mascotas">Pets</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Mudancero">Mover</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Piletas">Pools</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Pintor">Painter</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Plomero">Plumber</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Reformas">Reforms</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Tapicero">Upholsterer</a></li>
            <li><a class="hover-underline hover-underline--right" data-lang-es="Técnico">Technical</a></li>
          </ul>
        </div>
      </nav>
    </div>
    <h2>Content</h2>
  </div>
</template>

<script setup lang="ts">
  import { ref, Ref } from 'vue'
  import IconUser from '@/components/icons/IconUser.vue'
  import IconWishlist from '@/components/icons/IconWishlist.vue'
  import { useUserStore } from '../stores/user'

  const userStore = useUserStore()
  const menuState: Ref<boolean> = ref(false)
  const userOptionsState: Ref<boolean> = ref(false)

  const toggleMenu = () => menuState.value = !menuState.value
  const toggleUserOptions = () => userOptionsState.value = !userOptionsState.value
</script>

<style scoped lang="scss">
  @import '../../styles/main.scss';

  .header {
    background: $color-white;
    border-radius: 1rem;
    padding: 1.4rem 1.6rem;
    box-shadow: .5rem .5rem 2rem rgba($color: $color-primary-2, $alpha: .14);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 0;

    &__title {
      margin: 0;
      a {
        text-decoration: none;
        @include fontBold(3rem, 0rem, 3rem, $color-primary-2);
      }
      span {
        -webkit-text-stroke: .1rem $color-primary-2;
        color: transparent;
      }
    }
    &__user {
      cursor: pointer;
      text-align: right;
      @include display-flex(row, flex-end, center, nowrap, 0 1.6rem);

      a {
        @include display-flex(row, center, center, nowrap, 0)
      }
    }
    &__menu {
      width: 1.9rem;
      height: 1.5rem;
      cursor: pointer;
      @include display-flex(column, center, center, nowrap, .8rem 0);

      &[open="true"] {
        gap: 1.1rem 0;
        div:first-child {
          rotate: 45deg;
        }
        div:last-child {
          rotate: -45deg;
        }
      }
      div {
        transform-origin: left;
        transition: rotate 350ms ease;
        width: 100%;
        height: .2rem;
        border-radius: 5rem;
        background-color: $color-black;
        display: block;
      }
    }
  }
  .user-options {
    position: absolute;
    top: 0;
    right: 0;
    background: transparent;
    z-index: 1;
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
        @include fontRegular(1.6rem, 0rem, 2rem, $color-primary-2);

        a {
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
        @include fontRegular(1.4rem, 0, 2rem, $color-black);
        min-width: 14rem;
        a {
          cursor: pointer;
          padding-bottom: .6rem;
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