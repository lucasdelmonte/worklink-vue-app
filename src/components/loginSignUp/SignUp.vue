<template>
  <div class="sign-up">
    <div class="sign-up__container">
      <form @submit.prevent="handleSubmit" class="sign-up__form form">
        <h1 class="form__title">Create Account</h1>
        <div class="form__social">
          <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
        </div>
        <span class="form__subtext">or use your email for registration</span>
        <div class="form__switch">
            <input @change="setType('client')" type="radio" id="client" name="client-type" value="client" checked />
            <label for="client">Client</label>
            <input @change="setType('provider')" type="radio" id="provider" name="client-type" value="provider" />
            <label for="provider">Provider</label>
            <input @change="setType('business')" type="radio" id="business" name="client-type" value="business" />
            <label for="business">Business</label>
        </div>
        <template v-if="userType == 'client'">
          <!-- Client fields -->
          <div class="field">
            <input v-model="clientData.name" class="field__input" id="name" type="text" />
            <label class="field__label" for="name">Name and lastname*</label>
          </div>
        </template>
        <template v-else-if="userType == 'provider'">
          <!-- Provider fields -->
          <div class="field">
            <input v-model="providerData.name" class="field__input" id="name" type="text" />
            <label class="field__label" for="name">Name and lastname*</label>
          </div>
        </template>
        <template v-else>
          <!-- Business fields -->
          <div class="field">
            <input v-model="providerData.name" class="field__input" id="name" type="text" />
            <label class="field__label" for="name">Business name*</label>
          </div>
        </template>
        <div class="field">
          <input v-model="generalData.email" class="field__input" id="email" type="email" name="email" />
          <label class="field__label" for="email">Email*</label>
        </div>
        <div class="field">
          <input v-model="generalData.password" class="field__input" id="password" type="password" name="password" />
          <label class="field__label" for="password">Password*</label>
        </div>
        <div class="field">
          <input v-model="generalData.password_confirm" class="field__input" id="password_confirm" type="password" name="password_confirm" />
          <label class="field__label" for="password_confirm">Password again*</label>
        </div>
        <button class="button button--primary-black">Sign Up</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, Ref } from 'vue'

  const userType: Ref<string> = ref('client')
  const clientData = ref({
    name: 'Client data'
  })
  const providerData = ref({
    name: 'Provider data'
  })
  const businessData = ref({
    name: 'Business data'
  })
  const generalData = ref({
    email: 'delmontelucas678@gmail.com',
    password: 'WorkLink2k23',
    password_confirm: 'WorkLink2k23',
  })

  const setType = (type: string): void => {
    userType.value = type
  }

  const handleSubmit = (): void => {
    switch (userType.value) {
      case 'client':
        console.log(clientData.value)
        console.log(generalData.value)
        break;
      case 'provider':
        console.log(providerData.value)
        console.log(generalData.value)
        break;
      case 'business':
        console.log(businessData.value)
        console.log(generalData.value)
        break;

      default:
        break;
    }
  }
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .form {
    &__switch {
      height: 3.7rem;
      width: 100%;
      box-shadow: .2rem .2rem 1rem #0000000D;
      padding: .3rem .4rem;
      margin-bottom: 2.7rem;
      border-radius: 1.9rem;
      background: $color-primary-2;
      @include display-flex(row, space-between, center, nowrap, 0);
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0 .6rem;

      input {
        display: none;

        &:checked + label {
          background: $color-primary-3;
          color: $color-primary-2;
        }
      }
      label {
        cursor: pointer;
        transition: background 350ms ease, color 350ms ease;
        height: 100%;
        background: $color-primary-2;
        border-radius: 2rem;
        padding: 0 1.6rem;
        @include display-flex(row, center, center, nowrap, 0);
        @include fontRegular(1.4rem, 0, 1.7rem, $color-primary-1)
      }
    }
  }
</style>