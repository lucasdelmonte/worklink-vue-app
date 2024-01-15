import { defineStore } from 'pinia'

export const useModalProviderCardStore = defineStore('providerCard', {
  state: () => ({
    state: false,
    provider_id: '',
    provider_name: '',
    provider_business_description: '',
    provider_business_category: '',
    provider_business_rating: 0
  }),
  actions: {
    resetAttributes() {
      this.state = false
      this.provider_id = '0'
      this.provider_name = ''
      this.provider_business_description = ''
      this.provider_business_category = ''
      this.provider_business_rating = 0
    }
  },
})