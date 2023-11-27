import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebaseConfig'
import router from '@/router'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {},
    loadingUser: false
  }),
  actions: {
    async registerUser(email: string, password: string, displayName: string) {
      this.loadingUser = true
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(user, {
          displayName,
        })
        this.userData = { email: user.email, uid: user.uid }
        console.log(user)
        router.push('/')

      } catch (error) {
        console.log(error)
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
      } catch (error) {
        console.log(error)
      } finally {
        this.loadingUser = false
      }
    },
    async logoutUser() {
      try {
        await signOut(auth)
        this.userData = {}
        router.push('/login-register')
      } catch (error) {
        console.log(error)
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
          this.userData = user ? { email: user.email, uid: user.uid } : {}
          const id = user?.uid
          console.log(id);
          console.log('Here');
          
          console.log(this.userData)
          resolve(user)
        }, e => reject(e))
        unsuscribe()
      })
    }
  },
})