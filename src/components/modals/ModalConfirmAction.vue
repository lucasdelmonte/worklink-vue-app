<template>
  <div class="modal-action" :class="{ 'modal-action--open': modalAction.state }">
    <div class="modal-action__content">
      <h2>{{ modalAction.title }}</h2>
      <p>{{ modalAction.message }}</p>
      <div class="modal-action__buttons">
        <button class="button button--primary-black" @click="">Aceptar</button>
        <button class="button button--secondary-black" @click="closeClickModal">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useModalActionStore } from '../../stores/modalAction'

  const modalAction = useModalActionStore()

  const closeModal = (evt: KeyboardEvent) => {
    if(evt?.key === 'Escape') {
      modalAction.state = false
    }
  }

  const closeClickModal = () => {
    modalAction.state = false
  }

  onMounted(() => {
    window.addEventListener('keydown', closeModal)
  })
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';

  .modal-action {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    z-index: -1;
    opacity: 0;
    background-color: rgba(0, 0, 0, .4);
    @include display-flex(row, center, center, nowrap, 0);

    &--open {
      z-index: 3;
      opacity: 1;

      .modal-action__content {
        transform: translateY(0%);
      }
    }
    &:not(.modal-action--open) {
      .modal-action__content {
        transform: translateY(-150%);
      }
    }
  } 
</style>