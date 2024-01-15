import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from './stores/user'
import Home from './views/Home.vue'
import LoginRegister from './views/LoginRegister.vue'
import CategoriesFiltered from './views/CategoriesFiltered.vue'

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore()
  Object.keys(userStore.userData).length === 0 ? next('/login-register') : next()
}

const requireAuthAndInitialization = async (to, from, next) => {
  const userStore = useUserStore()
  Object.keys(userStore.userData).length === 0 && CategoriesFiltered ? next('/login-register') : next()
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