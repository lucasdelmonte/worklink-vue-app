<template>
  <header class="header">
    <div @click="$emit('toggleMenu')" class="header__menu" :open="props.menuState">
      <div></div>
      <div></div>
    </div>
    <h1 class="header__title"><RouterLink to="/">Work<span>Link</span></RouterLink></h1>
    <div class="header__user">
      <a href="/"><IconWishlist :width="17" :height="16" /></a>
      <a @click="$emit('toggleUserOptions')"><IconUser :width="12" :height="18" /></a>
    </div>
  </header>
</template>

<script setup lang="ts">
  import IconUser from '../icons/IconUser.vue'
  import IconWishlist from '../icons/IconWishlist.vue'

  const props = defineProps({
    menuState: Boolean
  })
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

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
</style>