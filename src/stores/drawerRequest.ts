import { defineStore } from 'pinia'
import type { IServiceRequestPost, IServiceRequestGet, IServiceRequestUpdate } from '../interfaces/ServiceRequestInterfaces'
import type { IBudget } from '../interfaces/BudgetInterfaces'
import { useToastAlertStore } from './toastAlert'
import { ref } from 'vue'
import { useUserStore } from './user'


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
      const userStore = useUserStore()

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

        await userStore.getServicesRequest()

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
      const userStore = useUserStore()
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

        await userStore.getServicesRequest()

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
      const userStore = useUserStore()
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

        this.requestData = responseData.data as IServiceRequestGet
        await userStore.getServicesRequest()

        toastAction.value = true
        toastTitle.value = 'Operación éxitosa'
        toastMessage.value = 'Estado de la solicitud actualizado'

        return true
      } catch (error) {
        console.error(error)
        toastAction.value = false
        toastTitle.value = 'Ocurrió un error actualizar el estado de la solicitud'
        toastMessage.value = `${ error }`
        return false
      } finally {
        toastAlertStore.updateToast(toastAction, toastTitle, toastMessage)
      }
    },
    async createBudget(id: string, amount: number, date: string) {
      console.log(id, amount, date)
      if(!id || !amount || !date) return
      const URL = `http://localhost:4000/presupuestos`
      const data = {
        "solicitud_servicio": id,
        "fecha": date,
        "monto": amount
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

        toastAction.value = true
        toastTitle.value = 'Operación éxitosa'
        toastMessage.value = 'Presupuesto creado con éxito'
      } catch (error) {
        console.error(error)
        toastAction.value = false
        toastTitle.value = 'Ocurrió un error al crear el presupuesto'
        toastMessage.value = `${ error }`
      }
    },
    async getBudgets(id: string | undefined) {
      if(!id) return
      const URL = `http://localhost:4000/presupuestos/${ id }`
      try {
        const response = await fetch(URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const responseData = await response.json()
        if (!response.ok && responseData.error) throw new Error(responseData.message)
        console.log(responseData)
        return
        return responseData.data as IBudget[]
      } catch (error) {
        console.error(error)
        toastAction.value = false
        toastTitle.value = 'Ocurrió un error al obtener los presupuestos'
        toastMessage.value = `${ error }`
        return undefined
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