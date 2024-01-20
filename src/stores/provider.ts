import { defineStore } from 'pinia'
import type { IBusiness, IBusinessFiltered } from '../interfaces/BusinessInterfaces'

export const useProviderStore = defineStore('provider', {
  state: () => ({
    providers: [],
    filteredProviders: [],
    isLoading: false
  }),
  actions: {
    async getBusinessFiltered(category: string) {
      this.isLoading = true
      try {
        const URL = `http://localhost:4000/negocios?categoria=${ category }`
        const response = await fetch(URL)

        if (!response.ok) throw new Error('Request error')

        const dataRes = await response.json()
        const data = dataRes.data as IBusiness[]

        const businessFiltered: IBusinessFiltered[] = data.map((business: IBusiness) => {
          let provider = {
            id: '',
            full_name: '',
            email: '',
            phone: '',
            rating: 0,
            is_active: false
          }
        
          if (business.proveedor) {
            provider = {
              id: business.proveedor._id,
              full_name: business.proveedor.nombre_apellido,
              email: business.proveedor.email,
              phone: business.proveedor.telefono,
              rating: business.proveedor.puntuacion,
              is_active: business.proveedor.isActive
            }
          }

          return ({
            id: business._id,
            name: business.nombre,
            rating: business.puntuacion as number | undefined,
            category: business.categoria,
            description: business.descripcion,
            is_active: business.isActive,
            provider
          })
        })
        return businessFiltered
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    }
  },
})
