import { defineStore } from 'pinia'

interface IEvent {
  title: string;
  start: Date;
  end: Date;
  color: string;
  allDay: boolean;
}

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
      focus: '',
      events: [] as IEvent[],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
    }),
  actions: {
  }
})