<template>
  <div class="modal-chat" :class="{ 'modal-chat--open': modalChat.state }">
    <div class="modal-chat__content">
      <div class="modal-chat__chats">
        <template v-for="message in modalChat.chat">
          <div class="message" :class="message.id_autor === userId ? 'message--right' : 'message--left'">
            <p>{{ message.mensaje }}</p>
          </div>
        </template>
      </div>
      <form @submit.prevent="submit" class="form">
        <div class="field">
          <input v-model="message" class="field__input" type="text" name="text" placeholder="Mensaje..." />
        </div>
        <button class="button button--primary-black"><img src="../../assets/Icons/icons8-enviado-50.png" /></button>
      </form>
    </div>
    <div class="modal-chat__close" @click="closeClickModal"></div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useModalChatStore } from '../../stores/modalChat'
  import { useToastAlertStore } from '@/stores/toastAlert'
  import { useCookies } from 'vue3-cookies'

  const toastAlertStore = useToastAlertStore()
  const modalChat = useModalChatStore()
  const cookies = useCookies()

  const userId = cookies.cookies.get('userId')

  const message = ref('')
  const toastAction = ref(false)
  const toastTitle = ref('')
  const toastMessage = ref('')

  const closeModal = (evt: KeyboardEvent) => {
    if(evt?.key === 'Escape') {
      modalChat.state = false
      modalChat.stopUpdatingChats()
    }
  }
  const closeClickModal = () => {
    modalChat.state = false
    modalChat.stopUpdatingChats()
  }

  const submit = async () => { 
    if(message.value.trim() == '') {
      toastAction.value = false
      toastTitle.value = 'Error al enviar'
      toastMessage.value = 'No puedes enviar un mensaje vacío'
      toastAlertStore.updateToast(toastAction, toastTitle, toastMessage)
      return
    }
    const res: boolean | undefined = await  modalChat.sendChat(message.value)
    if(res) message.value = ''
  }

  watch(() => modalChat.state, (newVal, oldVal) => {
    if(newVal != oldVal && newVal == true) {
      modalChat.updateChats()
    }
  })

  onMounted(() => {
    window.addEventListener('keydown', closeModal)
  })
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .modal-chat {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: -1;
    opacity: 0;
    background-color: rgba(0, 0, 0, .4);
    @include display-flex(row, center, center, nowrap, 0);

    &__close {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      cursor: url('../../assets/Icons/cursor-close.png'), auto;
    }
    &--open {
      z-index: 3;
      opacity: 1;

      .modal-chat__content {
        transform: translateY(0%);
      }
    }
    &:not(.modal-chat--open) {
      .modal-chat__content {
        transform: translateY(-150%);
      }
    }
    &__chats {
      max-height: 100%;
      overflow-y: auto;
      box-sizing: border-box;
      background-color: $color-grey-15;
      padding: 1.6rem 1.6rem 0 1.6rem;
      scroll-behavior: smooth;

      &::-webkit-scrollbar {
        width: 0;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
      }

      &::-webkit-scrollbar-thumb {
        background: $color-grey-30;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: $color-grey-50;
      }

      .message {
        position: relative;
        margin-bottom: 1.6rem;
        padding: .8rem;
        width: fit-content;
          border-radius: .5rem;
        box-shadow: .5rem .5rem 2rem rgba($color: $color-primary-2, $alpha: .14);
        
        &::after {
          content: "";
          position: absolute;
          top: 0;
          width: 0;
          height: 0;
          border-style: solid;
        }
        &--left {
          text-align: left;
          margin-right: auto;
          background-color: silver;
          border-top-left-radius: 0;

          &::after {
            border-width: 1rem 0 0 1rem;
            border-color: transparent transparent transparent silver;
            left: -10px;
            rotate: 180deg;
          }
        }
        &--right {
          text-align: right;
          margin-left: auto;
          background-color: antiquewhite;
          border-top-right-radius: 0;

          &::after {
            border-width: 0 0 1rem 1rem;
            border-color: transparent transparent transparent antiquewhite;
            right: -1rem;
          }
        }
        p {
          margin: 0;
          @include fontRegular(1.4rem, 0, 1.6rem, $color-black);
        }
      }
    }
    &__content {
      box-shadow: .5rem .5rem 2rem rgba($color: $color-primary-2, $alpha: .14);
      width: 100%;
      height: 100%;
      max-width: 60rem;
      max-height: 60rem;
      overflow: hidden;
      background-color: $color-white;
      border-radius: 1rem;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr auto;

      .form {
        padding: .8rem 1.6rem;
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-rows: auto;
        gap: 0 .8rem;

        .field {
          margin: 0;
          height: 5rem;

          &__input {
            height: 5rem;
            border: .1rem solid $color-grey-30;
            border-radius: 1rem;
            padding: 0 .8rem;
            width: 100%;
            box-sizing: border-box;
          }
        }
        .button {
          margin: 0;
          padding: 0;
          width: 5rem;
          height: 5rem;
          border-radius: 1rem;
          @include display-flex(row, center, center, nowrap, 0);

          &:hover {
            img {
              filter: invert(100%);
            }            
          }

          img {
            width: 3rem;
          }
        }
      }
    }
  }
</style>