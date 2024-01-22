import { defineStore } from 'pinia'
import type { IServiceRequestPost, IServiceRequestGet, IServiceRequestUpdate } from '../interfaces/ServiceRequestInterfaces'

export const useDrawerRequestStore = defineStore('drawerRequest', {
  state: () => ({
    state: false,
    requestAction: '' as 'CREATE' | 'EDIT' | 'SEE' | '',
    requestState: '',
    requestData: {} as IServiceRequestGet,
    provider: [],
    business: {},
    isLoading: false
  }),
  actions: {
    async createRequest(data: IServiceRequestPost) {
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
    async editRequest(data: IServiceRequestUpdate) {
      const URL = `http://localhost:4000/solicitudes_servicio/${this.requestData._id}`
      try {
        this.isLoading = true
        const response = await fetch(URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        const responseData = await response.json()

        if (!response.ok && responseData.error) throw new Error(responseData.message)

        console.log('Solicitud editada con éxito')
        this.state = false
        this.resetAttributes()
      } catch (error) {
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    async updateState(id: string, state: string) {
      const URL = `http://localhost:4000/solicitudes_servicio/${ id }`
      const data = {
        "estado": state
      }
      try {
        const response = await fetch(URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        const responseData = await response.json()

        if (!response.ok && responseData.error) throw new Error(responseData.message)

        console.log(`Estado actualizado a ${ state }`)
      } catch (error) {
        console.error(error)
      }
    },
    resetAttributes() {
      this.state = false as boolean
      this.requestAction = '' as 'CREATE' | 'EDIT' | 'SEE' | '',
      this.requestState = '' as string
      this.requestData = {} as IServiceRequestGet
      this.provider = []
      this.business = {}
      this.isLoading = false as boolean
    }
  },
})