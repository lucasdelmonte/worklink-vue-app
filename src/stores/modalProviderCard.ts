import { defineStore } from 'pinia'

export const useModalBusinessStore = defineStore('modalBusiness', {
  state: () => ({
    state: false,
    provider_id: '',
    provider_name: '',
    provider_business_id: '',
    provider_business_description: '',
    provider_business_category: '',
    provider_business_rating: 0,
    provider_business_images: [] as string[]
  }),
  actions: {
    resetAttributes() {
      this.state = false
      this.provider_id = '0'
      this.provider_name = ''
      this.provider_business_category = ''
      this.provider_business_description = ''
      this.provider_business_id = ''
      this.provider_business_rating = 0,
      this.provider_business_images = []
    }
  },
})