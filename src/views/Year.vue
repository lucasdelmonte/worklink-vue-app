<template>
  <div class="calendar__buttons">
    <button @click="() => modifyYear(-1)">
      <IconArrowLeft :width="20" :height="20" />
    </button>
    <span>{{ year }}</span>
    <button @click="() => modifyYear(1)">
      <IconArrowRight :width="20" :height="20" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import { ref, onMounted } from 'vue';
  import IconArrowRight from '@/components/icons/IconArrowRight.vue'
  import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
  import { useCalendarStore } from '../stores/calendar'

  const calendarStore = useCalendarStore()

  const yearEmit = defineEmits<{ (e: 'selected', v: number): void }>()

  const year = ref<number>(dayjs().year())

  function modifyYear(v: number) {
    year.value += v
    calendarStore.year = `${year.value}`
    yearEmit('selected', year.value)
  }

  onMounted(() => {
    calendarStore.year = `${year.value}`
  })
</script>

<style scoped lang="scss">
  @import '../../styles/main.scss';
  .calendar {
    &__buttons {
      @include display-flex(row, center, center, nowrap, 0 .8rem);
      span {
        text-align: center;
        min-width: 11rem;
        @include fontBold(1.8rem, 0, 2.2rem, $color-black);
      }
      button {
        padding: 0;
        border: .1rem solid transparent;
        background-color: transparent;
        cursor: pointer;
        height: 4rem;
        width: 4rem;
        border-radius: .5rem;
        transition: border-color 350ms ease;
        @include display-flex(row, center, center, nowrap, 0);
        &:hover {
          border-color: $color-black;
        }
      }
    }
  }
</style>