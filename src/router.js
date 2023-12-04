import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from './stores/user'
import Home from './views/Home.vue'
import LoginRegister from './views/LoginRegister.vue'
import CategoriesFiltered from './views/CategoriesFiltered.vue'

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()
  const user = await userStore.currentUser()
  user ? next() : next('/login-register')
}

const requireAuthAndInitialization = async (to, from, next) => {
  const userStore = useUserStore()
  const user = await userStore.currentUser()
  user && CategoriesFiltered ? next() : next()
}


const routes = [
  { path: '/', component: Home, beforeEnter: requireAuth },
  { path: '/login-register', component: LoginRegister },
  { path: '/categories/:category', component: CategoriesFiltered, beforeEnter: requireAuthAndInitialization }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router