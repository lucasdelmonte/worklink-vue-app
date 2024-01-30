<template>
  <section class="section">
    <h2 class="section__title">Artículos</h2>
    <div class="section__description">
      <p>En Worklink, no solo facilitamos la conexión entre clientes y proveedores de servicios de calidad, sino que también ofrecemos ideas y recursos para mejorar tu experiencia en la plataforma y en tus proyectos laborales.</p>
    </div>
    <div class="section__grid-blogs">
      <div class="blog blog--first-blog">
        <div class="blog__image">
          <img src="../../assets/images/limpieza-hogar.webp" alt="Trucos para el orden y limpieza en casa">
        </div>
        <div class="blog__content">
          <h4 class="blog__title">6 consejos prácticos para mantener tu espacio limpio y organizado</h4>
          <p class="blog__description">Mantener la casa limpia y ordenada puede parecer una tarea desafiante en ocasiones. ¿Sabías que existen trucos de limpieza y organización que pueden facilitarte esta tarea? Uno de los aspectos más frustrantes de la limpieza es la cantidad de tiempo que puede llevar, y a menudo, los resultados no duran mucho. Sin embargo, mantener un ambiente limpio y ordenado en casa es fundamental para asegurar que luzca impecable en todo momento.</p>
          <button class="blog__read-more button button--primary-black">Leer más</button>
        </div>
      </div>
      <div class="blog">
        <div class="blog__image">
          <img src="../../assets/images/sistemas-seguridad.jpeg" alt="Seguridad en casa">
        </div>
        <div class="blog__content">
          <h4 class="blog__title">Principales contratiempos que suelen presentarse en las tuberías del hogar</h4>
          <p class="blog__description">¿Experimentas dificultades con las cañerías de tu hogar? ¿Notas comportamientos inusuales o anomalías? Es probable que el control y mantenimiento de las cañerías no figuren entre tus prioridades principales en cuanto al cuidado del hogar. Sin embargo, es importante advertirte que si no las revisas de forma regular, eventualmente podrías encontrarte con sorpresas desagradables. Por lo tanto, es fundamental que al menos estés al tanto de los problemas más habituales que pueden surgir con las tuberías.</p>
          <button class="blog__read-more button button--primary-black">Leer más</button>
        </div>
      </div>
      <div class="blog">
        <div class="blog__image">
          <img src="../../assets/images/problemas-cañerias.jpeg" alt="Problemas en la cañería">
        </div>
        <div class="blog__content">
          <h4 class="blog__title">Soluciones de seguridad domiciliaria para resguardar tu hogar</h4>
          <p class="blog__description">¿Estás considerando la instalación de un sistema de seguridad para resguardar tu hogar? Aunque anteriormente no eran tan frecuentes, hoy en día es cada vez más común que las viviendas opten por implementar estos sistemas de protección. Es innegable que nuestro hogar es el espacio en el que deseamos sentirnos seguros, confortables y protegidos en todo momento.</p>
          <button class="blog__read-more button button--primary-black">Leer más</button>
        </div>
      </div>
      <div class="blog">
        <div class="blog__image">
          <img src="../../assets/images/plagas.jpeg" alt="Detectar plagas en casa">
        </div>
        <div class="blog__content">
          <h4 class="blog__title">Indicios para identificar la presencia de insectos no deseados dentro del hogar</h4>
          <p class="blog__description">¿Lidiando con plagas en casa? Identificarlas a tiempo es esencial para eliminarlas eficazmente. Sin embargo, detectar una plaga de insectos en casa puede ser desafiante si no sabes qué buscar. Para evitar la paranoia y ahorrar tiempo en inspecciones exhaustivas, te proporcionamos las señales clave que indican la presencia de plagas en tu hogar y cómo actuar ante ellas.</p>
          <button class="blog__read-more button button--primary-black">Leer más</button>
        </div>
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
      text-align: center;
      max-width: 60rem;
      margin: 0 auto 4rem auto;
      @include fontRegular(1.6rem, 0, 2.4rem, $color-black);

      p {
        margin: 0;
      }
    }
    &__grid-blogs {
      display: grid;
      grid-template-columns: 1fr;
      width: 100%;
      gap: 1.6rem;
      @include desktop-up {
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
      }

      .blog {
        display: flex;
        flex-direction: column;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: .5rem .5rem 2rem rgba(0, 0, 0, 0.14);

        &__image {
          display: flex;
          max-height: 35rem;
          img {
            width: 100%;
            object-fit: cover;
            min-height: 35rem;
          }
        }
        &__content {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding: 3rem 2.2rem;
        }
        &__title {
          margin: 0 0 2.4rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          @include fontBold(2.4rem, 0, 3rem, $color-black);
        }
        &__description {
          margin: 0 0 3.2rem 0;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
          @include fontMedium(1.6rem, 0, 2rem, $color-black);
        }
        &__read-more {
          width: fit-content;
          min-width: 11rem;
          min-height: 4rem;
        }

        &--first-blog {
          @include desktop-up {
            display: flex;
            flex-direction: row;
            grid-column: 1 / -1;
            min-height: 52rem;
          }
          .blog__content {
            padding-left: 1rem;
            padding-right: 1.6rem;
            @include display-flex(column, center, flex-start, nowrap, 0);
            @include desktop-up {
              padding-left: 4rem;
              width: 50%;
              max-width: 77rem;
            }
            @include notebook-up {
              padding-left: 6rem;
              padding-right: 4rem;
            }
            @include container-up {
              padding-left: 12rem;
            }
          }
          .blog__image {
            width: 100%;
            max-height: 100%;
            @include desktop-up {
              width: 50%;
            }

            img {
              object-fit: cover;
            }
          }
          .blog__title {
            font-size: 2.2rem;
            line-height: 2.6rem;

            @include desktop-up {
              font-size: 2.8rem;
              line-height: 3.6rem;
            }
          }
        }
      }
    }
  }
</style>