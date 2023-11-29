<template>
  <div class="overlay" :open="reactiveProps.containerOpen">
    <div class="title">
      <h2 class="title__left">Work</h2>
      <h2 class="title__right">Link</h2>
    </div>
    <div class="overlay__left">
      <h1 class="overlay__title">{{ langStore.lang.login.overlay.title }}</h1>
      <p class="overlay__subtext">{{ langStore.lang.login.overlay.subtitle }}</p>
      <button class="button button--tertiary-black" @click="$emit('toggleContainer')">{{ langStore.lang.login.overlay.button }}</button>
    </div>
    <div class="overlay__right">
      <h1 class="overlay__title">{{ langStore.lang.register.overlay.title }}</h1>
      <p class="overlay__subtext">{{ langStore.lang.register.overlay.subtitle }}</p>
      <button class="button button--tertiary-black" @click="$emit('toggleContainer')">{{ langStore.lang.register.overlay.button }}</button>
    </div>
    <div class="language">
      <p class="language__title">{{ langStore.lang.login.overlay.language }}</p>
      <div class="form__switch">
        <input @change="(evt) => setStoreLanguage(evt.target as HTMLInputElement | null)" type="radio" id="en" name="lang" value="en" :checked="enInput" />
        <label for="en">En</label>
        <input @change="(evt) => setStoreLanguage(evt.target as HTMLInputElement | null)" type="radio" id="es" name="lang" value="es" :checked="esInput" />
        <label for="es">Es</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useLangStore } from '../../stores/language'
  import { ref, onMounted, computed } from 'vue'

  const langStore = useLangStore()
  const props = defineProps({
    containerOpen: Boolean,
	})
  const reactiveProps = computed(() => props)

  const enInput = ref(false)
  const esInput = ref(false)

  onMounted(() => {
    const dataString: string | null = localStorage.getItem('worklink-lang-selected')
    if(dataString && dataString === 'en') {
      enInput.value = true
      esInput.value = false
      return
    }
    enInput.value = false
    esInput.value = true

    if(dataString) langStore.setLanguage(dataString)
  })

  const setStoreLanguage = ( target: HTMLInputElement | null ) => {
    if(!target) return
    langStore.setLanguage(target.value)
  }
</script>

<style scoped lang="scss">
  @import '../styles/main.scss';

  .overlay {
    display: block;
    background-color: $color-black;
    position: absolute;
    width: 100%;
    height: 100%;
    max-width: 42rem;
    top: 50%;
    transform: translateY(-50%);
    transition: all 350ms ease;
    
    &[open=true] {
      .overlay {
        &__left {
          opacity: 1;
        }
        &__right {
          opacity: 0;
        }
      }
    }
    &[open=false] {
      .overlay {
        &__left {
          opacity: 0;
        }
        &__right {
          scale: 1;
        }
      }
    }
    &__left,
    &__right {
      position: absolute;
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      max-width: 26rem;
      margin: 0 auto;
      width: 100%;
      transition: all 450ms ease;
    } 
    &__title {
      margin-top: 0;
      text-align: center;
      @include fontBold(3.2rem, 0, 5.4rem, $color-primary-1);
    }
    &__subtext {
      margin: 0;
      text-align: center;
      @include fontRegular(1.4rem, 0, 1.8rem, $color-primary-1);
    }
    .button {
      margin-top: 2.8rem;
      min-height: 4rem;
    }
    .title {
      position: absolute;
      top: 3rem;
      left: 50%;
      translate: -50% 0;
      @include display-flex(row, center, center, nowrap, 0 .2rem);

      &__left,
      &__right {
        margin: 0;
        @include fontBold(3.6rem, 0rem, 3rem, $color-primary-1);
      }
      &__right {
        -webkit-text-stroke: .1rem $color-primary-1;
        color: transparent;
      }
    }
    .language {
      position: absolute;
      bottom: 3rem;
      left: 50%;
      translate: -50% 0;
      @include display-flex(column, center, center, nowrap, 0 .2rem);

      &__title {
        margin: 0 0 .8rem 0;
        text-align: center;
        @include fontRegular(1.4rem, 0, 1.8rem, $color-primary-1);
      }
    }
    .form {
      &__switch {
        height: 3rem;
        width: 100%;
        box-shadow: .2rem .2rem 1rem #0000000D;
        padding: .3rem .4rem;
        margin-bottom: 2.7rem;
        border-radius: 1.9rem;
        background: $color-primary-3;
        @include display-flex(row, space-between, center, nowrap, 0);
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0 .6rem;

        input {
          display: none;

          &:checked + label {
            background: $color-primary-2;
            color: $color-primary-1;
          }
        }
        label {
          cursor: pointer;
          transition: background 350ms ease, color 350ms ease;
          height: 100%;
          background: $color-primary-3;
          border-radius: 2rem;
          padding: 0 1rem;
          @include display-flex(row, center, center, nowrap, 0);
          @include fontRegular(1.4rem, 0, 1.7rem, $color-primary-2)
        }
      }
    }
  }
</style>