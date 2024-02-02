import { defineStore } from 'pinia'

export const useModalActionStore = defineStore('modalAction', {
  state: () => ({
    state: false,
    title: '' as string,
    message: '' as string
  }),
  actions: {
    toggleModal() {
      this.state = !this.state
    },
    receiveAction(title: string, message: string, action: boolean) {
      this.title = title
      this.message = message
      // this.state = action

      // return this.state
    }
  },
})