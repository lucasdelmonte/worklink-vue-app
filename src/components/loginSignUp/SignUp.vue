<template>
  <div class="sign-up">
    <div class="sign-up__container">
      <form @submit.prevent="handleSubmit" class="sign-up__form form">
        <h1 class="form__title">Create Account</h1>
        <div class="form__social">
          <a @click="handleSubmitFacebook" class="social"><i class="fab fa-facebook-f"></i></a>
          <a @click="handleSubmitGoogle" class="social"><i class="fab fa-google-plus-g"></i></a>
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
        <!-- General fields -->
        <div class="field">
          <input v-model.trim="generalData.email" class="field__input" id="email" type="email" name="email" />
          <label class="field__label" for="email">Email*</label>
        </div>
        <div class="field">
          <input v-model.trim="generalData.password" class="field__input" id="password" type="password" name="password" />
          <label class="field__label" for="password">Password*</label>
        </div>
        <div class="field">
          <input v-model.trim="generalData.password_confirm" class="field__input" id="password_confirm" type="password" name="password_confirm" />
          <label class="field__label" for="password_confirm">Password again*</label>
        </div>
        <button class="button button--primary-black" :class="{ 'button--loading': userStore.loadingUser }">
          Sign Up
          <IconSpinner :width="20" :height="20" :stroke='"#000000"' />
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, Ref } from 'vue'
  import { useUserStore } from '../../stores/user'
  import IconSpinner from '@/components/icons/IconSpinner.vue'

  const userStore = useUserStore()

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

  const handleSubmitFacebook = (): void => {
    // Facebook register
    console.log('Register using facebook')
  }
  const handleSubmitGoogle = (): void => {
    // Google register
    console.log('Register using google')
  }
  const handleSubmit = async (): Promise<void> => {
    if(generalData.value.password !== generalData.value.password_confirm) return

    switch (userType.value) {
      case 'client':
        if(!clientData.value.name || !generalData.value.email || !generalData.value.password || !generalData.value.password_confirm)
        console.log('Client');
        await userStore.registerUser(generalData.value.email, generalData.value.password, clientData.value.name)
        break;

      case 'provider':
        if(!providerData.value.name || !generalData.value.email || !generalData.value.password || !generalData.value.password_confirm)
        userStore.registerUser(generalData.value.email, generalData.value.password, providerData.value.name)
        break;

      case 'business':
        if(!businessData.value.name || !generalData.value.email || !generalData.value.password || !generalData.value.password_confirm)
        userStore.registerUser(generalData.value.email, generalData.value.password, businessData.value.name)
        break;

      default:
        break;
    }
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