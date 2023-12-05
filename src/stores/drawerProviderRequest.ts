import { defineStore } from 'pinia'

export const useDrawerProviderRequestStore = defineStore('providerRequest', {
  state: () => ({
    state: false,
    provider: [],
    business: {},
    isLoading: false
  }),
  actions: {
    createRequest() {
      try {
        this.isLoading = true
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    resetAttributes() {
      this.state = false
      this.provider = []
      this.business = {}
      this.isLoading = false
    }
  },
})