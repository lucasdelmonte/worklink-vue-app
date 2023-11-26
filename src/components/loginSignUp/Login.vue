<template>
  <div class="sign-in">
    <div class="sign-in__container">
      <form @submit.prevent="handleSubmit" class="sign-in__form form">
        <h1 class="form__title">Sign in</h1>
        <div class="form__social">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
        </div>
        <span class="form__subtext">or use your account</span>
        <div class="field">
          <input v-model="userData.email" class="field__input" type="email" name="email" />
          <label class="field__label" for="email">Email*</label>
        </div>
        <div class="field">
          <input v-model="userData.password" class="field__input" type="password" name="password" />
          <label class="field__label" for="password">Password*</label>
        </div>
        <a href="#" class="form__forgot hover-underline hover-underline--right">Forgot your password?</a>
        <button class="button button--primary-black">Sign In</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const userData = ref({
    email: '',
    password: ''
  })

  const handleSubmit = (): void => {
    console.log(userData.value);
  }
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';
</style>