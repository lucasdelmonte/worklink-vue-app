<template>
  <div class="calendar__buttons">
    <button @click="() => modifyMonth(-1)"> 
      <IconArrowLeft :width="20" :height="20" />
    </button>
    <span>{{ cMonth }}</span>
    <button @click="() => modifyMonth(1)">
      <IconArrowRight :width="20" :height="20" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import { ref, computed } from 'vue'
  import IconArrowRight from '@/components/icons/IconArrowRight.vue'
  import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
  import { useCalendarStore } from '../stores/calendar'

  const calendarStore = useCalendarStore()

  const monthEmit = defineEmits<{ (e: 'selected', v: number): void }>()

  const month = ref<number>(dayjs().month())

  const cMonth = computed(()=> {
    const monthName = dayjs().month(month.value).format('MMMM')

    switch (monthName) {
      case 'January':
        calendarStore.month = '01'
        break;
      case 'February':
        calendarStore.month = '02'
        break;
      case 'March':
        calendarStore.month = '03'
        break;
      case 'April':
        calendarStore.month = '04'
        break;
      case 'May':
        calendarStore.month = '05'
        break;
      case 'June':
        calendarStore.month = '06'
        break;
      case 'July':
        calendarStore.month = '07'
        break;
      case 'August':
        calendarStore.month = '08'
        break;
      case 'September':
        calendarStore.month = '09'
        break;
      case 'October':
        calendarStore.month = '10'
        break;
      case 'November':
        calendarStore.month = '11'
        break;
      case 'December':
        calendarStore.month = '12'
        break;

      default:
        break;
    }

    return dayjs().month(month.value).format('MMMM')
  }) 


  function modifyMonth(v: number) {
    month.value += v
    monthEmit('selected', month.value)
  }
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