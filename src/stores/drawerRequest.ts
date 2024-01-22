import { defineStore } from 'pinia'
import type { IServiceRequestPost, IServiceRequestGet, IServiceRequestUpdate } from '../interfaces/ServiceRequestInterfaces'
import { useToastAlertStore } from './toastAlert'
import { ref } from 'vue'

const toastAction = ref(false)
const toastTitle = ref('')
const toastMessage = ref('')

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
      const toastAlertStore = useToastAlertStore()

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

        toastAction.value = true
        toastTitle.value = 'Operación éxitosa'
        toastMessage.value = 'Solicitud creada con éxito'
        this.state = false
        this.resetAttributes()
      } catch (error) {
        toastAction.value = false
        toastTitle.value = 'Ocurrió un error al crear la solicitud'
        toastMessage.value = `${ error }`
      } finally {
        toastAlertStore.updateToast(toastAction, toastTitle, toastMessage)
        this.isLoading = false
      }
    },
    async editRequest(data: IServiceRequestUpdate) {
      const URL = `http://localhost:4000/solicitudes_servicio/${ this.requestData._id }`
      const toastAlertStore = useToastAlertStore()
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

        this.state = false

        toastAction.value = true
        toastTitle.value = 'Operación éxitosa'
        toastMessage.value = 'Solicitud editada con éxito'
        this.resetAttributes()
      } catch (error) {
        toastAction.value = false
        toastTitle.value = 'Ocurrió un error al editar la solicitud'
        toastMessage.value = `${ error }`
      } finally {
        toastAlertStore.updateToast(toastAction, toastTitle, toastMessage)
        this.isLoading = false
      }
    },
    async updateState(id: string, state: string) {
      const URL = `http://localhost:4000/solicitudes_servicio/${ id }`
      const toastAlertStore = useToastAlertStore()
      const data = {
        "estado": state
      }
      try {
        const response = await fetch(URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        const responseData = await response.json()
        if (!response.ok && responseData.error) throw new Error(responseData.message)

        toastAction.value = true
        toastTitle.value = 'Operación éxitosa'
        toastMessage.value = 'Estado de la solicitud actualizado'
      } catch (error) {
        console.error(error)
        toastAction.value = false
        toastTitle.value = 'Ocurrió un error actualizar el estado de la solicitud'
        toastMessage.value = `${ error }`
      } finally {
        toastAlertStore.updateToast(toastAction, toastTitle, toastMessage)
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