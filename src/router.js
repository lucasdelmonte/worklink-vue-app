import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from './stores/user'
import Home from './views/Home.vue'
import LoginRegister from './views/LoginRegister.vue'

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()
  const user = await userStore.currentUser()
  user ? next() : next('/login-register')
}

const routes = [
  { path: '/', component: Home, beforeEnter: requireAuth },
  { path: '/login-register', component: LoginRegister }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router