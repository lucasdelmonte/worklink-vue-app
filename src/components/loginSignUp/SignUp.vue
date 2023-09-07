<template>
  <div class="sign-up">
    <div class="sign-up__container">
      <form action="#" class="sign-up__form form">
        <h1 class="form__title">Create Account</h1>
        <div class="form__social">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
        </div>
        <span class="form__subtext">or use your email for registration</span>
        <div class="field">
          <input class="field__input" type="text" />
          <label class="field__label" for="name">Name*</label>
        </div>
        <div class="field">
          <input class="field__input" type="text" name="lastname" />
          <label class="field__label" for="lastname">Lastname*</label>
        </div>
        <div class="field">
          <input class="field__input" type="email" name="email" />
          <label class="field__label" for="email">Email*</label>
        </div>
        <div class="field">
          <input class="field__input" type="password" name="password" />
          <label class="field__label" for="password">Password</label>
        </div>
        <button class="button button--primary-black">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';
</style>