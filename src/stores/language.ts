import { defineStore } from 'pinia'

export const useLangStore = defineStore('language', {
  state: () => ({
    state: 'en',
    values: ['en','es']
  }),
  actions: {
    setLanguage(lang: string) {
      if(lang == this.state || !this.values.includes(lang)) return
      this.state = lang
      localStorage.setItem('worklink-lang-selected', this.state)
      const existingData = this.getLocalStorageData()
      if (existingData) localStorage.setItem('worklink-lang-selected', this.state)
    },
    getLocalStorageData() {
      const dataString = localStorage.getItem('worklink-lang-selected')
      return dataString ? dataString : null
    }
  },
})