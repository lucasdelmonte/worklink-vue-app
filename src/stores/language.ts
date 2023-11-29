import { defineStore } from 'pinia'
import { enLang } from '@/languages/en-dictionary'
import { esLang } from '@/languages/es-dictionary'

export const useLangStore = defineStore('language', {
  state: () => ({
    state: 'en',
    values: ['en','es'],
    lang: enLang
  }),
  actions: {
    setLanguage(lang: string) {
      if(lang == this.state || !this.values.includes(lang)) return
      this.state = lang
      this.lang = this.state === 'en' ? enLang : esLang
      localStorage.setItem('worklink-lang-selected', this.state)
      const existingData = this.getLocalStorageData()
      if (existingData) localStorage.setItem('worklink-lang-selected', this.state)
      return this.lang
    },
    getLocalStorageData() {
      const dataString = localStorage.getItem('worklink-lang-selected')
      return dataString ? dataString : null
    }
  },
})