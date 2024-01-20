<template>
  <div class="drawer" :class="{ 'drawer--open': drawerRequest.state }">
    <div class="drawer__content">
      <div class="drawer__information">
        <h4 class="drawer__title">{{ modalBusiness.provider_name }}</h4>
        <h5 class="drawer__category">Category {{ modalBusiness.provider_business_category }}</h5>
      </div>
      <form @submit.prevent="handleSubmit" class="form">
        <div>
          <h2 class="form__title form__title--left">Request</h2>
          <div class="field">
            <input v-model="date" class="field__input" id="date" type="date" />
            <label class="field__label" for="date">Date</label>
          </div>
          <div class="field">
            <input v-model="title" class="field__input" id="title" type="text" />
            <label class="field__label" for="title">Title</label>
          </div>
          <div class="field field--text-area">
            <textarea v-model="description" rows="10" id="description" class="field__input field__input--text-area" name="description"></textarea>
            <label class="field__label" for="description">Description</label>
          </div>
          <div class="field field--file">
            <input @change="(evt) => loadImages(evt)" class="field__input field__input--file hidden" type="file" id="images" name="awsfiles" accept=".jpg,.jpeg,.png" multiple>
            <label class="field__label field__label--file" for="images">Select images</label>
          </div>
        </div>
        <button class="drawer__create-request button button--primary-black">Create Request</button>
      </form>
      <div class="drawer__buttons">
        <button @click="toggleDrawer" class="drawer__back button button--primary-white">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Ref } from 'vue'
  import { useModalBusinessStore } from '../../stores/modalProviderCard'
  import { useDrawerRequestStore } from '../../stores/drawerRequest'
  import { useUserStore } from '@/stores/user'
  import type { IServiceRequest } from '../../interfaces/ServiceRequestInterfaces'

  const userStore = useUserStore()
  const modalBusiness = useModalBusinessStore()
  const drawerRequest = useDrawerRequestStore()

  const date = ref('') as Ref<string>
  const title = ref('') as Ref<string>
  const description = ref('') as Ref<string>
  const images = ref([]) as Ref<[]>

  const loadImages = (evt: Event) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement || null
    images.value = []
    const files = target.files;
    if(!files) return
    const array = [...files].map((file) => {
      return file.name
    })
    images.value = array as []
  }
  const toggleDrawer = () => {
    drawerRequest.state = !drawerRequest.state
    drawerRequest.resetAttributes()
  }

  const handleSubmit = () => {
    if(!date.value || !title.value || !description.value || !images.value) return
    const data: IServiceRequest = {
      cliente: userStore.userData._id as string,
      categoria: modalBusiness.provider_business_category as string,
      fechaCreacion: undefined,
      fechaLimite: date.value as string,
      titulo: title.value as string,
      descripcion: description.value as string,
      imagenes: images.value as string[],
      negocio: undefined
    }
    drawerRequest.createRequest(data)
  }
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .drawer {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: -1;
    opacity: 0;
    background-color: rgba(0, 0, 0, .4);
    @include display-flex(row, flex-end, center, nowrap, 0);

    &--open {
      z-index: 3;
      opacity: 1;

      .drawer__content {
        transform: translateX(0%);
      }
    }
    &:not(.drawer--open) {
      .drawer__content {
        transform: translateX(+150%);
      }
    }
    .form {
      padding-bottom: .8rem;
      @include display-flex(column, space-between, stretch, nowrap, 0);
    }
    &__content {
      transition: transform 400ms ease;
      width: calc(100% - 3.2rem);
      height: calc(100% - 3.2rem);
      border-bottom-left-radius: 1.6rem;
      border-top-left-radius: 1.6rem;
      box-shadow: .5rem .5rem 2rem rgba(0, 0, 0, 0.14);
      max-width: 45rem;
      background-color: $color-white;
      padding: 1.6rem 1.6rem;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr auto;
    }
    &__information {
      margin-bottom: 1.6rem;
      border-bottom: .1rem solid $color-grey-15;
    }
    &__title {
      margin: 0 0 .4rem 0;
      @include fontBold(1.8rem, 0, 2rem, $color-black);
    }
    &__category {
      margin: 0 0 1.4rem 0;
      @include fontRegular(1.4rem, 0, 2rem, $color-black);
    }
    &__buttons {
      display: grid;
      grid-template-rows: 4rem;
    }
    &__create-request {
      text-align: center;
    }
  }
</style>../../stores/drawerRequest