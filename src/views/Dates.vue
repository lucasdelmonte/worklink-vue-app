<template>
  <div class="calendar">
    <div class="calendar__days-week">
      <div v-for="day in days" :key="day">
          <span class="text-gray-500 font-semibold">{{ day }}</span>
      </div>
    </div>
    <div class="scroll-calendar">
      <div class="calendar__days">
        <template v-for="(d, index) in dates" :key="d">
          <template v-if="index == 0">
            <div class="calendar__item-with-border" v-for="i in d.day" :key="i" >
            </div>
          </template>

          <button class="calendar__day calendar__item-with-border" :data-date="`${d.date}/${calendarStore.month}/${calendarStore.year}`"
            @click="() => selected(d.date)"
            :class="{
              'calendar__day--today': (d.date == dayjs().date() && dateProps.selectedValues.month == dayjs().month() 
              && dateProps.selectedValues.year == dayjs().year()),
              'calendar__day--selected-day': d.date == date,
              'calendar__day--other-day': d.date != date
            }">
              <span class="calendar__number">
                {{ d.date }}
              </span>
              <div class="calendar__services">
                <template v-for="service in getServicesRequest(`${d.date}/${calendarStore.month}/${calendarStore.year}`)">
                  <div v-if="service" 
                    class="service-request" 
                    :class="`service-request--${service.state.toLocaleLowerCase()}`"
                    @click="getRequest(service.id)"
                  >
                    <span>{{ service.hour }}</span>
                    <span>{{ service.title }}</span>
                  </div>
                </template>
              </div>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs'
  import { watch, onMounted, ref } from 'vue'
  import { useCalendarStore } from '../stores/calendar'
  import { useUserStore } from '../stores/user'

  const calendarStore = useCalendarStore()
  const userStore = useUserStore()

  type SelectedValues = {
    year: number
    month: number
  }

  type Date = {
    day: number,
    date: number
  }

  const date = ref<number | null>(null)

  const dateProps = defineProps<{
    selectedValues: SelectedValues
    selectedDate: number
  }>()

  const dateEmit = defineEmits<{(e: 'selected', v: number):void}>()

  const dates = ref<Date[]>([])

  onMounted(() => {
    userStore.getServicesRequest()
    generateDatesForThatMonth()
  })

  watch(() => dateProps.selectedValues, (v) => {
    date.value = null
    generateDatesForThatMonth(v.month, v.year)
  }, {
    deep: true
  })

  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ]

  const getServicesRequest = (calendarDate: string) => {
    if(userStore.servicesRequest.length === 0) return
    const servicesRequest = userStore.servicesRequest.map(service => {
      const exist = service.presupuestos?.find(x => x.estado === 'ACEPTADO')

      
      if(exist) {
        const id = service._id as string
        const title = service.titulo as string
        const state = service.estado as string
        const createDate = exist.fecha as string
        const date = new Date(createDate)
        const [year, month, rawDay] = date.toISOString().split('T')[0].split('-')
        const hour = date.toISOString().split('T')[1].split(':').slice(0, 2).join(':')
        const day = rawDay[0] === '0' ? rawDay.slice(1) : rawDay
        const parsedDate = `${ day }/${ month }/${ year }`

        if(parsedDate === calendarDate) {
          return {
            id,
            title,
            state,
            parsedDate,
            hour
          }
        }
      }
    }).filter(service => service !== undefined)

    if(servicesRequest.length === 0) return

    const servicesRequestSorted = servicesRequest.sort((a, b) => a.hour.localeCompare(b.hour));

    return servicesRequestSorted
  }

  const getRequest = async (id: string) => {
    await userStore.getServicesRequestById(id)
  }


  function generateDatesForThatMonth(m = dayjs().month(), y = dayjs().year()) {
    dates.value = []
    let d = dayjs().month(m).year(y)
    const daysInMonth = d.daysInMonth()
    for( let i = 1; i <= daysInMonth; i++) {
      dates.value.push({
          date: i,
          day: d.date(i).day()
      })
    }
  }

  function selected(d: number) {
    date.value = d
    dateEmit('selected', d)
  }
</script>

<style scoped lang="scss">
  @import '../../styles/main.scss';
  .scroll-calendar {
    max-height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    height: 100%;
    width: 100%;

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
  .calendar {
    width: 100%;
    height: 100%;
    &__services {
      height: 100%;
      width: 100%;
      max-height: 9rem; 
      @include display-flex(column, flex-start, flex-start, nowrap, .4rem 0);
    }
    .service-request {
      padding: .3rem .3rem .3rem .3rem;
      border-radius: .5rem;
      scale: 1;
      cursor: pointer;
      transition: scale 300ms ease;
      @include display-flex(row, flex-start, center, nowrap, 0 .6rem);

      span:first-of-type {
        min-width: 3.2rem;
        background: $color-grey-15;
        border-radius: .5rem;
        text-align: center;
        padding: 0.2rem 0.3rem;
      }
      span {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        @include fontRegular(1.2rem, 0, 1.4rem, $color-black);
      }
      &:hover {
        scale: 1.05;
      }
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
    }
    &__days-week {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      justify-content: center;
      align-items: center;
      padding-bottom: 1rem;
      width: 100%;
      border-bottom: .1rem solid $color-grey-15;
      div {
        @include fontBold(1.4rem, 0, 1.8rem, $color-black);
        @include display-flex(row, center, center, nowrap, 0);
      }
    }
    &__days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-auto-rows: 1fr;
      width: 100%;
      height: 100%;
    }
    &__day {
      overflow-y: auto;
      overflow-x: hidden;
      cursor: pointer;
      background-color: transparent;
      border: 0;
      scale: 1;
      border-radius: 0;
      padding: .6rem 1rem .4rem 1rem;
      height: 100%;
      max-height: 15rem;
      transition: background-color 350ms ease, scale 300ms ease, border-radius 300ms ease;
      @include display-flex(column, flex-start, center, nowrap, 1rem 0);
      @include fontMedium(1.6rem, 0, 2rem, $color-black);
      &::-webkit-scrollbar {
        width: .4rem;
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
      &:hover {
        background-color: $color-grey-5;
        // scale: 1.1;
        z-index: 1;
        // box-shadow: 0 .4rem .6rem #00000014;
      }
    }
    &__item-with-border:nth-child(1),
    &__item-with-border:nth-child(2),
    &__item-with-border:nth-child(3),
    &__item-with-border:nth-child(4),
    &__item-with-border:nth-child(5),
    &__item-with-border:nth-child(6),
    &__item-with-border:nth-child(8),
    &__item-with-border:nth-child(9),
    &__item-with-border:nth-child(10),
    &__item-with-border:nth-child(11),
    &__item-with-border:nth-child(12),
    &__item-with-border:nth-child(13),
    &__item-with-border:nth-child(15),
    &__item-with-border:nth-child(16),
    &__item-with-border:nth-child(17),
    &__item-with-border:nth-child(18),
    &__item-with-border:nth-child(19),
    &__item-with-border:nth-child(20),
    &__item-with-border:nth-child(22),
    &__item-with-border:nth-child(23),
    &__item-with-border:nth-child(24),
    &__item-with-border:nth-child(25),
    &__item-with-border:nth-child(26),
    &__item-with-border:nth-child(27),
    &__item-with-border:nth-child(29),
    &__item-with-border:nth-child(30),
    &__item-with-border:nth-child(31),
    &__item-with-border:nth-child(32),
    &__item-with-border:nth-child(33),
    &__item-with-border:nth-child(34) {
      border-right: .1rem solid $color-grey-15;
      border-bottom: .1rem solid $color-grey-15;
      &:hover {
        border: 0;
      }
    }
    &__item-with-border:nth-child(7),
    &__item-with-border:nth-child(14),
    &__item-with-border:nth-child(21),
    &__item-with-border:nth-child(28) {
      border-bottom: .1rem solid $color-grey-15;
      &:hover {
        border: 0;
      }
    }
  }
</style>