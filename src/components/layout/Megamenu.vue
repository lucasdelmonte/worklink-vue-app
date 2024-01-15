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
</style>