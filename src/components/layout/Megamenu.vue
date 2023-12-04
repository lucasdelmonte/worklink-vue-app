<template>
  <div class="megamenu" :open="menuState">
    <!-- User type client or business -->
    <nav class="megamenu__nav" v-if="ROLE === 'client'">
      <ul class="megamenu__list-first-level">
        <li><a>{{ langStore.lang.header.megamenu.provider_categories.title }}</a></li>
      </ul>
      <div>
        <ul class="megamenu__list-second-level">
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/a-c">{{ langStore.lang.header.megamenu.provider_categories.categories.a_c }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/construction">{{ langStore.lang.header.megamenu.provider_categories.categories.construction_worker }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/architect">{{ langStore.lang.header.megamenu.provider_categories.categories.architect }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/cars">{{ langStore.lang.header.megamenu.provider_categories.categories.cars }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/beauty">{{ langStore.lang.header.megamenu.provider_categories.categories.beauty }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/welfare">{{ langStore.lang.header.megamenu.provider_categories.categories.welfare }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/carpenter">{{ langStore.lang.header.megamenu.provider_categories.categories.carpenter }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/locksmith">{{ langStore.lang.header.megamenu.provider_categories.categories.locksmith }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/setter">{{ langStore.lang.header.megamenu.provider_categories.categories.setter }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/pest-control">{{ langStore.lang.header.megamenu.provider_categories.categories.pest_control }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/caregivers">{{ langStore.lang.header.megamenu.provider_categories.categories.caregivers }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/decorator">{{ langStore.lang.header.megamenu.provider_categories.categories.decorator }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/electrician">{{ langStore.lang.header.megamenu.provider_categories.categories.electrician }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/events">{{ langStore.lang.header.megamenu.provider_categories.categories.events }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/gasman">{{ langStore.lang.header.megamenu.provider_categories.categories.gasman }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/blacksmith">{{ langStore.lang.header.megamenu.provider_categories.categories.blacksmith }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/gardener">{{ langStore.lang.header.megamenu.provider_categories.categories.gardener }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/cleaning">{{ langStore.lang.header.megamenu.provider_categories.categories.cleaning }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/pets">{{ langStore.lang.header.megamenu.provider_categories.categories.pets }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/mover">{{ langStore.lang.header.megamenu.provider_categories.categories.mover }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/pools">{{ langStore.lang.header.megamenu.provider_categories.categories.pools }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/painter">{{ langStore.lang.header.megamenu.provider_categories.categories.painter }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/plumber">{{ langStore.lang.header.megamenu.provider_categories.categories.plumber }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/reforms">{{ langStore.lang.header.megamenu.provider_categories.categories.reforms }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/upholsterer">{{ langStore.lang.header.megamenu.provider_categories.categories.upholsterer }}</RouterLink></li>
          <li><RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" to="/categories/technical">{{ langStore.lang.header.megamenu.provider_categories.categories.technical }}</RouterLink></li>
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

  const langStore = useLangStore()

  const ROLE = 'client' // Dinamic role
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