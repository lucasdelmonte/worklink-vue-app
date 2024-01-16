<template>
  <div class="sign-in">
    <div class="sign-in__container">
      <form @submit.prevent="handleSubmit" class="sign-in__form form">
        <h1 class="form__title">{{ langStore.lang.login.form.title }}</h1>
        <div class="form__social form__social--hidden">
          <a @click="handleSubmitFacebook" class="social"><i class="fab fa-facebook-f"></i></a>
          <a @click="handleSubmitGoogle" class="social"><i class="fab fa-google-plus-g"></i></a>
        </div>
        <span class="form__subtext form__subtext--hidden">or use your account</span>
        <div class="field">
          <input v-model="userData.email" class="field__input" type="email" name="email" />
          <label class="field__label" for="email">{{ langStore.lang.login.form.email_input }}</label>
        </div>
        <div class="field">
          <input v-model="userData.password" class="field__input" type="password" name="password" />
          <label class="field__label" for="password">{{ langStore.lang.login.form.password_input }}</label>
        </div>
        <a href="#" class="form__forgot hover-underline hover-underline--right">{{ langStore.lang.login.form.forgot_password }}</a>
        <button class="button button--primary-black" :class="{ 'button--loading': userStore.loadingUser }">
          {{ langStore.lang.login.form.button }}
          <IconSpinner :width="20" :height="20" :stroke="'#000000'" />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useUserStore } from '../../stores/user'
  import IconSpinner from '@/components/icons/IconSpinner.vue'
  import { useLangStore } from '../../stores/language'

  const userData = ref({
    email: 'matescarabino@gmail.com',
    password: '12345'
  })
  // const userData = ref({
  //   email: 'delmontelucas678@gmail.com',
  //   password: 'WorkLink2k23'
  // })
  const userStore = useUserStore()

  const langStore = useLangStore()
  onMounted(() => {
    const dataString: string | null = localStorage.getItem('worklink-lang-selected')
    if(dataString) langStore.setLanguage(dataString)
  })

  const handleSubmitFacebook = (): void => {
    // Facebook login
    console.log('Login using facebook')
  }
  const handleSubmitGoogle = (): void => {
    // Google login
    console.log('Login using google')
  }

  const handleSubmit = async(): Promise<void> => {
    if(!userData.value.email || !userData.value.password) return
    await userStore.loginUser(userData.value.email, userData.value.password)
  }
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .button { 
    position: relative;
    &.button--loading {
      font-size: 0;
      pointer-events: none;
      &.button--primary-black {
        background-color: $color-primary-3;
        border-color: $color-primary-3;
      }
      .spinner {
        scale: 1;
        display: flex;
      }
    }
    .spinner {
      scale: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      z-index: 1;
    }
  }
</style>