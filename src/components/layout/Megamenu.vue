<template>
  <div class="megamenu" :open="menuState">
    <!-- User type client -->
    <nav class="megamenu__nav" v-if="ROLE === 'CLIENT'">
      <ul class="megamenu__list-first-level">
        <li><a>{{ langStore.lang.header.megamenu.provider_categories.title }}</a></li>
      </ul>
      <div>
        <ul class="megamenu__list-second-level">
          <li v-for="category in CategoriasType">
            <RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" :to="`/categories/${category}`">{{ category }}</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
    <!-- User type provider -->
    <nav class="megamenu__nav" v-else>
      <ul class="megamenu__list-first-level">
        <li></li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { useLangStore } from '../../stores/language'
  import { onMounted } from 'vue'
  import { CategoriasType } from '../../interfaces/CategoriesInterfaces'

  const langStore = useLangStore()
  const ROLE = 'CLIENT' // Dinamic role

  defineProps({
    menuState: Boolean
  })
  onMounted(() => {
    const dataString: string | null = localStorage.getItem('worklink-lang-selected')
    if(dataString) langStore.setLanguage(dataString)
  })
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

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
      grid-template-columns: 1fr;
      grid-template-rows: 3rem auto;
      gap: 1.4rem 0;

      @include desktop-up {
        grid-template-columns: 22rem 1fr;
        grid-template-rows: auto;
        gap: 0;
      }
    }
    &__list-first-level {
      margin: 0;
      padding: 0;
      list-style: none;
      width: 100%;
      position: relative;
      @include desktop-up {
        max-width: 25rem;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: .1rem;
        width: 100%;
        background: $color-grey-15;
        @include desktop-up {
          top: 0;
          right: 0;
          bottom: unset;
          left: unset;
          height: 100%;
          width: .1rem;
        }
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
      @include display-flex(row, flex-start, flex-start, wrap, 1.6rem);
      @include desktop-up {
        padding-left: 2rem;
      }

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
</style>