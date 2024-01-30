<template>
  <section class="section">
    <h2 class="section__title">¿Cómo funciona WorkLink?</h2>
    <div class="section__description">
      <p>Es muy sencillo.</p>
      <p>Tan solo sigue estos pasos.</p>
    </div>
    <div class="section__steps" v-if="userRol === 'CLIENTE'">
      <div class="step">
        <img src="../../assets/Icons/icons8-buscar-cliente-50.png" alt="Paso 1">
        <p>Busca el servicio que necesitas.</p>
      </div>
      <div class="step">
        <img src="../../assets/Icons/icons8-superventas-50.png" alt="Paso 2">
        <p>Selecciona el servicio que más te convenga y crea una solicitud.</p>
      </div>
      <div class="step">
        <img src="../../assets/Icons/icons8-mensajería-50.png" alt="Paso 4">
        <p>Chatea con el proveedor.</p>
      </div>
      <div class="step">
        <img src="../../assets/Icons/icons8-confeti-50.png" alt="Paso 5">
        <p>Disfruta del servicio!</p>
      </div>
    </div>
    <div class="section__steps" v-else>
      <div class="step">
        <img src="../../assets/Icons/icons8-buscar-cliente-50.png" alt="Paso 1">
        <p>Revisa las solicitudes.</p>
      </div>
      <div class="step">
        <img src="../../assets/Icons/icons8-superventas-50.png" alt="Paso 2">
        <p>Selecciona el servicio que más te convenga y crea un presupuesto.</p>
      </div>
      <div class="step">
        <img src="../../assets/Icons/icons8-mensajería-50.png" alt="Paso 4">
        <p>Chatea con el cliente.</p>
      </div>
      <div class="step">
        <img src="../../assets/Icons/icons8-confeti-50.png" alt="Paso 5">
        <p>Brinda ese servicio!</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useCookies } from 'vue3-cookies'

  const cookies = useCookies()

  const userRol = cookies.cookies.get('userRol')
</script>

<style scoped lang="scss">
  @import '../../../styles/main.scss';
  .section {
    &__title {
      margin: 4rem 0 2rem 0;
      @include fontBold(3.4rem, 0, 4rem, $color-black);
    }
    &__description {
      margin: 0 0 4rem 0;
      text-align: center;
      @include fontRegular(1.6rem, 0, 2.4rem, $color-black);

      p {
        margin: 0;
      }
    }
    &__steps {
      @include display-flex(row, center, flex-start, wrap, 2rem 4rem);

      .step {
        max-width: 25rem;
        text-align: center;
        @include fontRegular(1.6rem, 0, 2.4rem, $color-black);
        @include display-flex(column, center, center, wrap, 2rem 0);

        p {
          margin: 0;
        }
      }
    }
  }
</style>