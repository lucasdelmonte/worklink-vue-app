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
import { useLangStore } from './language'

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
    async registerUser(email: string, password: string, displayName: string) {
      const langStore = useLangStore()
      this.loadingUser = true
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(user, {
          displayName,
        })
        this.userData = { email: user.email, uid: user.uid }
        router.push('/')
        this.setToast(langStore.lang.register.ok.result)
      } catch (e) {
        console.log(e)
        this.setToast(langStore.lang.register.error.result)
      } finally {
        this.loadingUser = false
      }
    },
    async loginUser(email: string, password: string) {
      const langStore = useLangStore()
      this.loadingUser = true
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        this.userData = { email: user.email, uid: user.uid }
        router.push('/')
        this.setToast(langStore.lang.login.ok.result)
      } catch (e) {
        console.log(e)
        this.setToast(langStore.lang.login.error.result)
      } finally {
        this.loadingUser = false
      }
    },
    async logoutUser() {
      const langStore = useLangStore()
      try {
        await signOut(auth)
        this.userData = {}
        router.push('/login-register')
        this.setToast(langStore.lang.logout.ok.result)
      } catch (e) {
        console.log(e)
        this.setToast(langStore.lang.logout.error.result)
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