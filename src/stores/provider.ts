import { defineStore } from 'pinia'
import { providers } from '../assets/providers'

export const useProviderStore = defineStore('provider', {
  state: () => ({
    providerData: providers.providers,
    filteredProviders: []
  }),
  actions: {
    getProviders(category: string) {
      return this.providerData.filter(provider => provider.businesses.some(business => business.category.toLowerCase() === category.toLowerCase()))
        .map(provider => ({
          id: provider.id,
          full_name: provider.full_name,
          business: provider.businesses
            .filter(business => business.category.toLowerCase() === category.toLowerCase())
            .map(business => ({
              id: business.id,
              name: business.name,
              category: business.category,
              description: business.description,
              rating: business.rating,
            })),
        }))
    }
  },
})
