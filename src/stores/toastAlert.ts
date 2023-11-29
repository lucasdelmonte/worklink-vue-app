import { defineStore } from 'pinia'

export const useToastAlertStore = defineStore('toastAlert', {
  state: () => ({
    state: false,
    actionResult: true,
    title: 'Title',
    message: 'Message'
  }),
  actions: {
    updateToast(dinamicResult: any, dinamicTitle: any, dinamicMessage: any) {
      this.state = true
      this.actionResult = dinamicResult.value
      this.title = dinamicTitle.value
      this.message = dinamicMessage.value
    }
  },
})