<template>
  <div class="drawer" :class="{ 'drawer--open': drawerRequest.state }">
    <div class="drawer__content">
      <div class="drawer__information">
        <h4 class="drawer__title">{{ modalBusiness.provider_name || drawerRequest.requestData.negocio?.nombre }}</h4>
        <h5 class="drawer__category">Categoría {{ modalBusiness.provider_business_category || drawerRequest.requestData.categoria }}</h5>
        <span @click="closeClickModal" class="drawer__mobile-close"><IconClose :width="16" :height="16" :fill="`#000000`" /></span>
      </div>
      <form class="form">
        <div>
          <h2 class="form__title form__title--left" :class="{ 'form__title--with-subtitle': drawerRequest.requestState }">Solicitud</h2>
          <h4 class="form__subtitle form__title--left" :class="`form__subtitle--${ drawerRequest.requestData.estado?.toLowerCase() }`" v-if="drawerRequest.requestState">{{ drawerRequest.requestData.estado }}</h4>
          <div class="field">
            <input v-model="date" class="field__input" id="date" type="date" :disabled="validateEdit" />
            <label class="field__label" for="date">Fecha límite</label>
          </div>
          <div class="field">
            <input v-model="title" class="field__input" id="title" type="text" :disabled="validateEdit" />
            <label class="field__label" for="title">Título</label>
          </div>
          <div class="field field--text-area">
            <textarea v-model="description" rows="10" id="description" class="field__input field__input--text-area" name="description" :disabled="validateEdit"></textarea>
            <label class="field__label" for="description">Descripción</label>
          </div>
          <div class="field field--file" :class="{ 'hidden': validateEdit }">
            <input @change="seletedImages" class="field__input field__input--file" type="file" id="images" name="awsfiles" accept=".jpg,.jpeg,.png" multiple :disabled="validateEdit" v-if="Object.keys(drawerRequest.requestData).length === 0">
          </div>
          <template v-if="drawerRequest.requestData.imagenes && drawerRequest.requestData.imagenes.length != 0">
            <div class="gallery">
              <ServiceImages :images="drawerRequest.requestData.imagenes" />
            </div>
            <button @click.prevent="setImages(drawerRequest.requestData.imagenes)" class="button-gallery">
              Abrir galería
            </button>
            <ModalSlider @setModalSlider="setModalSlider" :show="show" :currentImages="currentImages" />
          </template>
        </div>
        <div class="drawer__buttons">
          <template v-if="userRol === 'CLIENTE'">
            <ClientOptions @createRequest="createRequest" @editRequest="editRequest" />
          </template>
          <template v-else-if="userRol === 'PROVEEDOR'">
            <ProviderOptions />
          </template>
          <template v-else-if="userRol === 'ADMIN'">
            <AdminOptions />
          </template>
        </div>
      </form>
    </div>
    <div class="drawer__close" @click="closeClickModal"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue'
  import type { Ref } from 'vue'
  import type { IServiceRequestPost, IServiceRequestUpdate } from '../../interfaces/ServiceRequestInterfaces'
  import { useModalBusinessStore } from '../../stores/modalProviderCard'
  import { useDrawerRequestStore } from '../../stores/drawerRequest'
  import { useUserStore } from '@/stores/user'
  import { useCookies } from 'vue3-cookies'
  import ProviderOptions from '../UsersOptions/ProviderOptions.vue'
  import ClientOptions from '../UsersOptions/ClientOptions.vue'
  import AdminOptions from '../UsersOptions/AdminOptions.vue'
  import IconClose from '../icons/IconClose.vue'
  import ServiceImages from '../Images/ServiceImages.vue'
  import ModalSlider from '../modals/ModalSlider.vue'

  const cookies = useCookies()
  const userRol = ref(cookies.cookies.get('userRol')) as Ref<string>

  const userStore = useUserStore()
  const modalBusiness = useModalBusinessStore()
  const drawerRequest = useDrawerRequestStore()


  const show = ref(false) as Ref<boolean>
  const currentImages = ref([]) as Ref<string[]>
  const date = ref('') as Ref<string>
  const title = ref('') as Ref<string>
  const description = ref('') as Ref<string>
  const images = ref([]) as Ref<string[]>

  const seletedImages = (evt: Event) => {
    const target: HTMLInputElement = evt.target as HTMLInputElement || null
    const files = target.files

    if(!files) return

    images.value = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        images.value.push(base64)
      }
      reader.readAsDataURL(file)
    }

    images.value = images.value
  }

  const setImages = (images: Array<string>) => { 
    currentImages.value = images
    setModalSlider()
  }

  const setModalSlider = () => { 
    show.value = !show.value 
  }

  const closeClickModal = () => {
    show.value = false
    currentImages.value = []
    drawerRequest.state = false
    drawerRequest.resetAttributes()
  }

  const validateEdit = computed(() => {
    return drawerRequest.requestAction === 'SEE' || userRol.value === 'PROVEEDOR'
  })

  const closeDrawer = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape') {
      show.value = false
      currentImages.value = []
      drawerRequest.state = false
      drawerRequest.resetAttributes()
    }
  }

  const toggleDrawer = () => {
    drawerRequest.state = !drawerRequest.state
    drawerRequest.resetAttributes()
  }

  const createRequest = () => {
    if(!date.value || !title.value || !description.value || !images.value) return
    const data: IServiceRequestPost = {
      cliente: userStore.userData._id as string,
      categoria: modalBusiness.provider_business_category as string,
      fechaLimite: date.value as string,
      titulo: title.value as string,
      descripcion: description.value as string,
      imagenes: images.value as string[],
      negocio: modalBusiness.provider_business_id as string
    }
    drawerRequest.createRequest(data)
  }

  const editRequest = () => {
    if(!date.value || !title.value || !description.value || !images.value) return
    const data: IServiceRequestUpdate = {
      fechaLimite: date.value as string,
      titulo: title.value as string,
      descripcion: description.value as string,
      imagenes: images.value as string[]
    }
    drawerRequest.editRequest(data)
  }

  const parseDate = (dateString: string) => {
    const date = new Date(dateString)
    const [year, month, day] = date.toISOString().split('T')[0].split('-')

    return `${year}-${month}-${day}`
  }

  watch(() => drawerRequest.requestData, (newValue, oldValue) => {
    if(!newValue || Object.keys(newValue).length === 0 || drawerRequest.requestAction === 'CREATE') {
      if (date.value !== '' || title.value !== '' || description.value !== '' || images.value.length !== 0) {
        date.value = ''
        title.value = ''
        description.value = ''
        images.value = []
        drawerRequest.resetAttributes()
      }
      return
    }
    if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
      date.value = parseDate(newValue.fechaLimite as string) as string
      title.value = newValue.titulo as string
      description.value = newValue.descripcion as string
      images.value = newValue.imagenes
    }
    userRol.value = cookies.cookies.get('userRol') as string
  })

    watch(() => drawerRequest.state, (newState, oldState) => {
      if (newState === true && oldState === false) {
        userRol.value = cookies.cookies.get('userRol') as string
      }
    })

  onMounted(() => {
    userRol.value = cookies.cookies.get('userRol') as string
    window.addEventListener('keydown', closeDrawer)
  })
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

    .gallery {
      display: flex;
      gap: 0 .8rem;
      width: 100%;
      height: 100%;
      max-height: 11rem;
      overflow-x: scroll;
      overflow-y: hidden;

      &::-webkit-scrollbar {
        height: .4rem;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background: $color-grey-15;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: $color-grey-50;
      }

      &__image {
        flex: 0 0 29%;
        width: 29%;
        object-fit: cover;
        scroll-snap-align: center;
        display: flex;

        img {
          width: 100%;
          object-fit: contain;
        }
      }

      & + .button-gallery {
        border: none;
        background: transparent;
        width: fit-content;
        padding: 0;
        padding: 0 .8rem;
        min-width: 5rem;
        min-height: 4rem;
        cursor: pointer;
        margin: 0;
        text-transform: uppercase;
        @include fontBold(1.4rem, 0, 2rem, $color-black); 
      }
    }
    &__close {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      cursor: url('../../assets/Icons/cursor-close.png'), auto;
    }
    &__mobile-close {
      position: absolute;
      top: 1.6rem;
      right: 1.6rem;
      z-index: 1;
      cursor: pointer;
      @include display-flex(row, center, center, nowrap, 0);
      @include desktop-up {
        display: none;
      }
    }
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
      position: relative;
      @include display-flex(column, space-between, stretch, nowrap, 0);

      &__subtitle {
        color: $color-black;
        width: fit-content;
        border-radius: .5rem;
        padding: 0.2rem 0.4rem;
        &--aceptada {
          background-color: rgb(8, 184, 8);
        }
        &--cancelada {
          background-color: rgb(255, 46, 46);
        }
        &--finalizada {
          background-color: rgb(250, 120, 73);
        }
        &--pendiente {
          background-color: rgb(68, 186, 254);
        }
        &--disputa {
          background-color: rgb(254, 99, 68);
        }
      }
    }
    &__content {
      box-sizing: border-box;
      transition: transform 400ms ease;
      width: calc(100% - 1.6rem);
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
      max-width: calc(100% - 3.2rem);
      margin: 0 0 .4rem 0;
      @include fontBold(1.8rem, 0, 2rem, $color-black);
    }
    &__category {
      margin: 0 0 1.4rem 0;
      @include fontRegular(1.4rem, 0, 2rem, $color-black);
    }
    &__buttons {
      display: grid;
      gap: .8rem 0;
      .button {
        min-height: 4rem;
        margin: 0;
      }
    }
    &__create-request {
      text-align: center;
    }
  }
</style>