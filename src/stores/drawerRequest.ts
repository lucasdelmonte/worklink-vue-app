import { defineStore } from 'pinia'
import type { IServiceRequest } from '../interfaces/ServiceRequestInterfaces'

export const useDrawerRequestStore = defineStore('drawerRequest', {
  state: () => ({
    state: false,
    provider: [],
    business: {},
    isLoading: false
  }),
  actions: {
    async createRequest(data: IServiceRequest) {
      const URL = 'http://localhost:4000/solicitudes_servicio'
      try {
        this.isLoading = true
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        const responseData = await response.json()

        if (!response.ok && responseData.error) throw new Error(responseData.message)

        console.log('Solicitud creada con éxito')
        this.state = false
        this.resetAttributes()
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