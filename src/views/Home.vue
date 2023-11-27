<template>
  <header class="header">
    <div @click="toggleMenu" class="header__menu" :open="menuState">
      <div></div>
      <div></div>
    </div>
    <h1 class="header__title">Work<span>Link</span></h1>
    <div class="header__user">
      <IconWishlist :width="17" :height="16" />
      <IconUser :width="12" :height="18" />
    </div>
  </header>
  <div class="main-content">
    <div class="megamenu" :open="menuState">
      <nav class="megamenu__nav">
        <ul class="megamenu__list-first-level">
          <li><a>Menu 1</a></li>
          <li><a>Menu 2</a></li>
          <li><a>Menu 3</a></li>
          <li><a>Menu 4</a></li>
        </ul>
        <div>
          <ul class="megamenu__list-second-level">
            <li><a class="hover-underline hover-underline--right">Opción 1</a></li>
            <li><a class="hover-underline hover-underline--right">Opción 2</a></li>
            <li><a class="hover-underline hover-underline--right">Opción 3</a></li>
            <li><a class="hover-underline hover-underline--right">Opción 4</a></li>
            <li><a class="hover-underline hover-underline--right">Opción 5</a></li>
            <li><a class="hover-underline hover-underline--right">Opción 6</a></li>
            <li><a class="hover-underline hover-underline--right">Opción 7</a></li>
            <li><a class="hover-underline hover-underline--right">Opción 8</a></li>
            <li><a class="hover-underline hover-underline--right">Opción 9</a></li>
            <li><a class="hover-underline hover-underline--right">Opción 10</a></li>
            <li><a class="hover-underline hover-underline--right">Opción 11</a></li>
            <li><a class="hover-underline hover-underline--right">Opción 12</a></li>
            <li><a class="hover-underline hover-underline--right">Opción 13</a></li>
          </ul>
        </div>
      </nav>
    </div>
    <h2>Content</h2>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '@/stores/user'
  import { ref, Ref } from 'vue'
  import IconUser from '@/components/icons/IconUser.vue'
  import IconWishlist from '@/components/icons/IconWishlist.vue'

  const menuState: Ref<boolean> = ref(false)
  const toggleMenu = () => {
    menuState.value = !menuState.value
  }
  const userStore = useUserStore()
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
      @include fontBold(3rem, 0rem, 3rem, $color-primary-2);
      span {
        -webkit-text-stroke: .1rem $color-primary-2;
        color: transparent;
      }
    }
    &__user {
      text-align: right;
      @include fontBold(1.6rem, 0rem, 2rem, $color-primary-2);
      @include display-flex(row, flex-end, center, nowrap, 0 1.6rem);
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
      max-height: 20rem;
      @include display-flex(row, flex-start, flex-start, wrap, 1.6rem);

      li {
        padding: 0 0 1.6rem 0;
        @include fontRegular(1.4rem, 0, 2rem, $color-black);
        min-width: 12rem;
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