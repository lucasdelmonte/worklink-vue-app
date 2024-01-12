<template>
  <div class="sign-up">
    <div class="sign-up__container">
      <form @submit.prevent="handleSubmit" class="sign-up__form form">
        <h1 class="form__title">{{ langStore.lang.register.form.title }}</h1>
        <div class="form__social form__social--hidden">
          <a @click="handleSubmitFacebook" class="social"><i class="fab fa-facebook-f"></i></a>
          <a @click="handleSubmitGoogle" class="social"><i class="fab fa-google-plus-g"></i></a>
        </div>
        <span class="form__subtext form__subtext--hidden">or use your email for registration</span>
        <div class="form__switch">
          <input @change="setType('client')" type="radio" id="client" name="client-type" value="client" checked />
          <label for="client">{{ langStore.lang.register.form.switch.client }}</label>
          <input @change="setType('provider')" type="radio" id="provider" name="client-type" value="provider" />
          <label for="provider">{{ langStore.lang.register.form.switch.provider }}</label>
        </div>
        <div class="field">
          <input v-model="generalData.full_name" class="field__input" id="name" type="text" />
          <label class="field__label" for="name">{{ langStore.lang.register.form.name_lastname_input }}</label>
        </div>
        <div class="field">
          <input v-model.trim="generalData.email" class="field__input" id="email" type="email" name="email" />
          <label class="field__label" for="email">{{ langStore.lang.register.form.email_input }}</label>
        </div>
        <div class="field">
          <input v-model.trim="generalData.phone" class="field__input" id="phone" type="phone" name="phone" />
          <label class="field__label" for="phone">{{ langStore.lang.register.form.phone_input }}</label>
        </div>
        <div class="field">
          <input v-model.trim="generalData.password" class="field__input" id="password" type="password" name="password" />
          <label class="field__label" for="password">{{ langStore.lang.register.form.password_input }}</label>
        </div>
        <div class="field">
          <input v-model.trim="generalData.password_confirm" class="field__input" id="password_confirm" type="password" name="password_confirm" />
          <label class="field__label" for="password_confirm">{{ langStore.lang.register.form.password_again_input }}</label>
        </div>
        <button class="button button--primary-black" :class="{ 'button--loading': userStore.loadingUser }">
          {{ langStore.lang.register.form.button }}
          <IconSpinner :width="20" :height="20" :stroke='"#000000"' />
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

  const userStore = useUserStore()
  const langStore = useLangStore()
  onMounted(() => {
    const dataString: string | null = localStorage.getItem('worklink-lang-selected')
    if(dataString) langStore.setLanguage(dataString)
  })

  const userType = ref('client')

  const generalData = ref({
    full_name: 'Lucas Delmonte',
    email: 'delmontelucas678@gmail.com',
    phone: '3476589504',
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
    if(!generalData.value.full_name || !generalData.value.email || !generalData.value.password || !generalData.value.password_confirm || !generalData.value.phone) return
    switch (userType.value) {
      case 'client':
        await userStore.registerUser('CLIENTE', generalData.value.email, generalData.value.password, generalData.value.full_name, generalData.value.phone)
        break;

      case 'provider':
        await userStore.registerUser('PROVEEDOR', generalData.value.email, generalData.value.password, generalData.value.full_name, generalData.value.phone)
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
      grid-template-columns: repeat(2, 1fr);
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