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
        case 'login-ok':
          toastTitle.value = 'Successful login'
          toastMessage.value = ''
          break;
        case 'login-error':
          toastTitle.value = 'There was a problem logging in'
          toastMessage.value = `Please try again and check the fields`
          break;
        case 'register-ok':
          toastTitle.value = 'Successful register'
          toastMessage.value = 'Automatic redirection to home page'
          break;
        case 'register-error':
          toastTitle.value = 'There was a problem registering'
          toastMessage.value = `Please try again and check the fields`
          break;
        case 'logout-ok':
          toastTitle.value = 'Logged out successfully'
          toastMessage.value = ''
          break;
        case 'logout-error':
          toastTitle.value = 'An error occurred while signing out'
          toastMessage.value = `Please try again and check the fields`
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
        this.setToast('register-ok')
      } catch (e) {
        console.log(e)
        this.setToast('register-error')
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
        this.setToast('login-ok')
      } catch (e) {
        console.log(e)
        this.setToast('login-error')
      } finally {
        this.loadingUser = false
      }
    },
    async logoutUser() {
      try {
        await signOut(auth)
        this.userData = {}
        router.push('/login-register')
        this.setToast('logout-ok')
      } catch (e) {
        console.log(e)
        this.setToast('logout-error')
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