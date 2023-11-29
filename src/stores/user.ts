import { defineStore } from 'pinia'
import { useToastAlertStore } from './toastAlert'
import { ref } from 'vue'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '@/firebaseConfig'
import router from '@/router'
import { enLang } from '@/languages/en-dictionary'
import { esLang } from '@/languages/es-dictionary'

const toastAction = ref(false)
const toastTitle = ref('')
const toastMessage = ref('')

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {},
    loadingUser: false
  }),
  actions: {
    setToast(result: string): void {
      const toastAlertStore = useToastAlertStore()
      switch (result) {
        case `${ enLang.login.ok.result }`:
          toastTitle.value = enLang.login.ok.title
          toastMessage.value = enLang.login.ok.message
          break;
        case `${ enLang.login.error.result }`:
          toastTitle.value = enLang.login.error.title
          toastMessage.value = enLang.login.error.message
          break;
        case `${ enLang.register.ok.result }`:
          toastTitle.value = enLang.register.ok.title
          toastMessage.value = enLang.register.ok.message
          break;
        case `${ enLang.register.error.result }`:
          toastTitle.value = enLang.register.error.title
          toastMessage.value = enLang.register.error.message
          break;
        case `${ enLang.logout.ok.result }`:
          toastTitle.value = enLang.logout.ok.title
          toastMessage.value = enLang.logout.ok.message
          break;
        case `${ enLang.logout.error.result }`:
          toastTitle.value = enLang.logout.error.title
          toastMessage.value = enLang.logout.error.message
          break;

        default:
          break;
      }
      toastAction.value = result.includes('-ok') ? true : false
      toastAlertStore.updateToast(toastAction, toastTitle, toastMessage)
    },
    async registerUser(email: string, password: string, displayName: string) {
      this.loadingUser = true
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(user, {
          displayName,
        })
        this.userData = { email: user.email, uid: user.uid }
        router.push('/')
        this.setToast(enLang.register.ok.result)
      } catch (e) {
        console.log(e)
        this.setToast(enLang.register.error.result)
      } finally {
        this.loadingUser = false
      }
    },
    async loginUser(email: string, password: string) {
      this.loadingUser = true
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        this.userData = { email: user.email, uid: user.uid }
        router.push('/')
        this.setToast(enLang.login.ok.result)
      } catch (e) {
        console.log(e)
        this.setToast(enLang.login.error.result)
      } finally {
        this.loadingUser = false
      }
    },
    async logoutUser() {
      try {
        await signOut(auth)
        this.userData = {}
        router.push('/login-register')
        this.setToast(enLang.logout.ok.result)
      } catch (e) {
        console.log(e)
        this.setToast(enLang.logout.error.result)
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          this.userData = user ? { email: user.email, uid: user.uid } : {}
          resolve(user)
        }, e => reject(console.log(e)))
      })
    }
  },
})