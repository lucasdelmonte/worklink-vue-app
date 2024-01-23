import { defineStore } from 'pinia'

export const useModalChatStore = defineStore('modalChat', {
  state: () => ({
    state: false
  }),
  actions: {
    toggleModal() {
      this.state = !this.state
    },
    resetAttributes() {
      this.state = false
    }
  },
})