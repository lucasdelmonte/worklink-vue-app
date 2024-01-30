import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
      day: '',
      month: '',
      year: '',
      full_date: ''
    }),
  actions: {
    completeDate() {
      this.full_date = `${this.day}/${this.month}/${this.year}`
    }
  }
})