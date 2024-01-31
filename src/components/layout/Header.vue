<template>
  <header class="header">
    <div @click="emit('toggleMenu')" class="header__menu" :open="props.menuState">
      <div></div>
      <div></div>
    </div>
    <h1 class="header__title"><RouterLink to="/">Work<span>Link</span></RouterLink></h1>
    <div class="header__user">
      <button @click="toggleNotifications"><img src="../../assets/Icons/icons8-notifications.png" alt="Notificaciones"></button>
      <a href="/"><IconWishlist :width="17" :height="16" /></a>
      <a @click="emit('toggleUserOptions')"><IconUser :width="12" :height="18" /></a>
    </div>
  </header>
  <div class="notifications" :class="{ 'notifications--open': showNotifications }">
    <div class="notifications__content">
      <h2 class="notifications__title">Notificaciones</h2>
      <div class="notifications__items" v-if="userStore.notifications.length > 0">
        <template v-for="notification in (userStore.notifications as INotifications[]) ">
          <div class="notification-item" v-if="notification.isActive" @click.prevent="requestDrawer(notification.solicitud as string)" :id="notification.solicitud">
            <h3 class="notification-item__type">{{ notification.notificacionType }}</h3>
            <p class="notification-item__description">{{ notification.mensaje }}</p>
            <span>{{ notification.solicitud }}</span>
            <button class="notification-item__delete" @click="deleteNotification(notification._id)">Eliminar</button>
          </div>
        </template>
      </div>
    </div>
    <div v-if="showNotifications" class="notifications__close" @click="closeClickNotifications"></div>
  </div>
</template>

<script setup lang="ts">
  import IconUser from '../icons/IconUser.vue'
  import IconWishlist from '../icons/IconWishlist.vue'
  import { ref, onMounted } from 'vue'
  import type { Ref } from 'vue'
  import type { INotifications } from '../../interfaces/NotificationInterfaces'
  import { useUserStore } from '@/stores/user'
  import { useDrawerRequestStore } from '../../stores/drawerRequest'

  const drawerRequest = useDrawerRequestStore()

  const emit = defineEmits(['toggleMenu', 'toggleUserOptions'])

  const userStore = useUserStore()

  const showNotifications = ref(false) as Ref<boolean>
  const notifications = ref([] as INotifications[]) as Ref<INotifications[]>
  notifications.value = userStore.notifications

  const toggleNotifications = () => {
    showNotifications.value = !showNotifications.value
  }

  const closeClickNotifications = () => {
    showNotifications.value = false
  }

  const closeNotifications = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape') {
      showNotifications.value = false
    }
  }

  const requestDrawer = async (id: string) => {
    console.log(id)
    return
    if(!id) return
    await userStore.getServicesRequestById(id)
  }

  const deleteNotification = async(id: string) => {
    await userStore.deleteNotification(id)
  }

  const props = defineProps({
    menuState: Boolean
  })

  onMounted(() => {
    window.addEventListener('keydown', closeNotifications)
  })
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .notifications {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: -1;
    opacity: 0;
    background-color: rgba(0, 0, 0, .4);
    @include display-flex(row, flex-end, center, nowrap, 0);

    &__close {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      cursor: url('../../assets/Icons/icons8-cancelar-50.png'), auto;
    }
    &--open {
      z-index: 3;
      opacity: 1;

      .notifications__content {
        transform: translateX(0%);
      }
    }
    &:not(.notifications--open) {
      .notifications__content {
        transform: translateX(+150%);
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
    &__title {
      margin-top: 0;
      margin-bottom: 1.6rem;
      @include fontBold(3.2rem, 0, 5.4rem, $color-primary-2);
    }
    &__items {
      max-height: 100%;
      box-sizing: border-box;
      overflow-y: auto;
      height: 100%;

      &::-webkit-scrollbar {
        width: .4rem;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
      }

      &::-webkit-scrollbar-thumb {
        background: $color-grey-15;
        border-top-right-radius: .5rem;
        border-bottom-right-radius: .5rem;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: $color-grey-50;
      }
    }
    .notification-item {
      padding-bottom: 2.4rem;
      margin-bottom: 2.4rem;
      border-bottom: .1rem solid $color-grey-15;
      position: relative;
      &__type {
        margin: 0 0 1.6rem 0;
        @include fontBold(1.6rem, 0, 1.8rem, $color-black);
      }
      &__description {
        margin: 0;
        @include fontRegular(1.6rem, 0, 1.8rem, $color-black);
      }
      &__delete {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0;
        border: 0;
        background: transparent;
        text-transform: uppercase;
        scale: 0;
        transition: scale 450ms ease;
        cursor: pointer;
        @include fontRegular(1.4rem, 0, 1.8rem, $color-black);
      }
      &:hover {
        .notification-item__delete {
          scale: 1;
        }
      }
    }
    .notification-item:last-of-type {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: 0;
    }
  }
  .header {
    background: $color-white;
    border-radius: 1rem;
    padding: 1.4rem 1.6rem;
    box-shadow: .5rem .5rem 2rem rgba($color: $color-primary-2, $alpha: .14);
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 0;

    &__title {
      margin: 0;
      a {
        text-decoration: none;
        @include fontBold(3rem, 0rem, 3rem, $color-primary-2);
      }
      span {
        -webkit-text-stroke: .1rem $color-primary-2;
        color: transparent;
      }
    }
    &__user {
      text-align: right;
      @include display-flex(row, flex-end, center, nowrap, 0 1.6rem);

      a,
      button {
        cursor: pointer;
        border: 0;
        padding: 0;
        background-color: transparent;
        width: fit-content;
        @include display-flex(row, center, center, nowrap, 0)
      }
      button {
        max-width: 2.2rem;
        display: flex;
        img {
          width: 100%;
        }
      }
    }
    &__menu {
      width: 1.9rem;
      height: 1.5rem;
      cursor: pointer;
      @include display-flex(column, center, center, nowrap, .8rem 0);

      &[open="true"] {
        gap: 1.1rem 0;
        div:first-child {
          rotate: 45deg;
        }
        div:last-child {
          rotate: -45deg;
        }
      }
      div {
        transform-origin: left;
        transition: rotate 350ms ease;
        width: 100%;
        height: .2rem;
        border-radius: 5rem;
        background-color: $color-black;
        display: block;
      }
    }
  }
</style>