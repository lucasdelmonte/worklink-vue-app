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
    <h2 class="main-content__title">Calendario</h2>
    <div class="main-content__grid calendar">
      <Year @selected="changeYear" />
      <Month @selected="changeMonth" />
      <Dates :selectedValues="selectedValues" :selectedDate="selectedDateValue" @selected="changeDate" />
    </div>
    <div>
      <p>Selected value: {{ selectedDateValue }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Header from '../components/layout/Header.vue'
  import Megamenu from '../components/layout/Megamenu.vue'
  import { useCookies } from 'vue3-cookies'
  import { useUserStore } from '../stores/user'
  import { useLangStore } from '../stores/language'
  import { ref, onMounted, defineAsyncComponent, reactive } from 'vue'
  import type { Ref } from 'vue'
  import dayjs from 'dayjs'

  const Year = defineAsyncComponent(() => import('./Year.vue'))
  const Month = defineAsyncComponent(() => import('./Month.vue'))
  const Dates = defineAsyncComponent(() => import('./Dates.vue'))
  const selectedDateValue = ref(dayjs().date())

  const selectedValues = reactive({
      month: dayjs().month(),
      year: dayjs().year(),
  })

  function changeMonth(v) {
      selectedDateValue.value = null
      selectedValues.month = v
  }
  function changeYear(v) {
      selectedDateValue.value= null
      selectedValues.year = v
  }
  function changeDate(v){
      selectedDateValue.value = v
  }

  const userStore = useUserStore()
  const langStore = useLangStore()
  const cookies = useCookies()
  const userId = cookies.cookies.get('userId') as '' | undefined
  const userRol = cookies.cookies.get('userRol') as 'CLIENTE' | 'PROVEEDOR' | undefined
  const userOptionsState: Ref<boolean> = ref(false)

  const menuState: Ref<boolean> = ref(false)
  const toggleMenu = () => menuState.value = !menuState.value
  const toggleUserOptions = () => userOptionsState.value = !userOptionsState.value

  onMounted(() => {
    console.log('mounted')
  })
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


    &__title {
      margin: 0;
      @include fontBold(3.4rem, 0, 4rem, $color-black);
    }
    .calendar {
      display: flex;
    }
  }
</style>