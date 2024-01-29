<template>
  <div class="megamenu" :open="menuState">
    <!-- User type client -->
    <nav class="megamenu__nav" v-if="userRol === 'CLIENTE'">
      <div class="megamenu__nav-first-level">
        <ul class="megamenu__list-first-level">
          <li><a>Negocios</a></li>
        </ul>
        <div>
          <ul class="megamenu__list-second-level">
            <li v-for="category in CategoriasType">
              <RouterLink @click="$emit('toggleMenu')" class="hover-underline hover-underline--right" :to="`/business/${category}`">{{ category }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="megamenu__nav-first-level">
        <ul class="megamenu__list-first-level">
          <li><RouterLink :to="`/services-request`">Solicitudes</RouterLink></li>
        </ul>
      </div>
    </nav>
    <!-- User type provider -->
    <nav class="megamenu__nav" v-else>
      <div class="megamenu__nav-first-level">
        <ul class="megamenu__list-first-level">
          <li><RouterLink :to="`/services-request`">Solicitudes</RouterLink></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { useLangStore } from '../../stores/language'
  import { onMounted } from 'vue'
  import { CategoriasType } from '../../interfaces/CategoriesInterfaces'
  import { useCookies } from 'vue3-cookies'

  const cookies = useCookies()

  const userRol = cookies.cookies.get('userRol') as 'CLIENTE' | 'PROVEEDOR' | undefined

  const langStore = useLangStore()

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