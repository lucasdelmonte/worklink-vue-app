import { defineStore } from 'pinia'
import { useToastAlertStore } from './toastAlert'
import { ref } from 'vue'
import router from '@/router'
import { useLangStore } from './language'
import type { IUser } from '../interfaces/UserInterfaces'
import { useCookies } from 'vue3-cookies'

const toastAction = ref(false)
const toastTitle = ref('')
const toastMessage = ref('')

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {} as IUser,
    loadingUser: false
  }),
  actions: {
    setToast(result: string): void {
      const toastAlertStore = useToastAlertStore()
      const langStore = useLangStore()
      
      switch (result) {
        case `${ langStore.lang.login.ok.result }`:
          toastTitle.value = langStore.lang.login.ok.title
          toastMessage.value = langStore.lang.login.ok.message
          break;
        case `${ langStore.lang.login.error.result }`:
          toastTitle.value = langStore.lang.login.error.title
          toastMessage.value = langStore.lang.login.error.message
          break;
        case `${ langStore.lang.register.ok.result }`:
          toastTitle.value = langStore.lang.register.ok.title
          toastMessage.value = langStore.lang.register.ok.message
          break;
        case `${ langStore.lang.register.error.result }`:
          toastTitle.value = langStore.lang.register.error.title
          toastMessage.value = langStore.lang.register.error.message
          break;
        case `${ langStore.lang.logout.ok.result }`:
          toastTitle.value = langStore.lang.logout.ok.title
          toastMessage.value = langStore.lang.logout.ok.message
          break;
        case `${ langStore.lang.logout.error.result }`:
          toastTitle.value = langStore.lang.logout.error.title
          toastMessage.value = langStore.lang.logout.error.message
          break;

        default:
          break;
      }
      toastAction.value = result.includes('-ok') ? true : false
      toastAlertStore.updateToast(toastAction, toastTitle, toastMessage)
    },
    setCookies() {
      const cookies = useCookies()
      cookies.cookies.set('userId', `${ this.userData._id }`)
      cookies.cookies.set('userRol', `${ this.userData.rol }`)
      cookies.cookies.set('userNombreApellido', `${ this.userData.nombre_apellido }`)
      cookies.cookies.set('userPuntuacion', `${ this.userData.puntuacion }`)
      cookies.cookies.set('userTelefono', `${ this.userData.telefono }`)
      cookies.cookies.set('userIsActive', `${ this.userData.isActive }`)
      cookies.cookies.set('userEmail', `${ this.userData.email }`)
    },
    removeCookies() {
      const cookies = useCookies()
      cookies.cookies.remove('userId')
      cookies.cookies.remove('userRol')
      cookies.cookies.remove('userNombreApellido')
      cookies.cookies.remove('userPuntuacion')
      cookies.cookies.remove('userTelefono')
      cookies.cookies.remove('userIsActive')
      cookies.cookies.remove('userEmail')
    },
    async registerUser(role: string, email: string, password: string, full_name: string, phone: string) {
      const URL = 'http://localhost:4000/users'
      const langStore = useLangStore()
      const data = {
        "rol": role,
        "email": email,
        "password": password,
        "nombre_apellido": full_name,
        "telefono": phone,
        "puntuacion": 0
      }
      this.loadingUser = true
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

        this.userData = responseData.data as IUser

        this.setCookies()

        router.push('/')
        this.setToast(langStore.lang.register.ok.result)
      } catch (error) {
        console.error(error)
        this.removeCookies()
        this.setToast(langStore.lang.register.error.result)
      } finally {
        this.loadingUser = false
      }
    },
    async loginUser(email: string, password: string) {
      const URL = 'http://localhost:4000/users/login'
      const langStore = useLangStore()
      const data = {
        "email": email,
        "password": password
      }
      this.loadingUser = true
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

        this.userData = responseData.data as IUser

        this.setCookies()
  
        router.push('/')
        this.setToast(langStore.lang.login.ok.result)
      } catch (error) {
        console.error(error)
        this.removeCookies()
        this.setToast(langStore.lang.login.error.result)
      } finally {
        this.loadingUser = false
      }
    },
    logoutUser() {
      const langStore = useLangStore()
      try {
        this.userData = {} as IUser
        this.removeCookies()
        router.push('/login-register')
        this.setToast(langStore.lang.logout.ok.result)
      } catch (e) {
        console.log(e)
        this.setToast(langStore.lang.logout.error.result)
      }
    }
  },
})