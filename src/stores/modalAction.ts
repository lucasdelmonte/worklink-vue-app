import { defineStore } from 'pinia'

export const useModalActionStore = defineStore('modalAction', {
  state: () => ({
    state: false,
    message: '' as string
  }),
  actions: {
    toggleModal() {
      this.state = !this.state
    },
    receiveAction(message: string, action: boolean) {
      this.message = message
      // this.state = action

      // return this.state
    }
  },
})