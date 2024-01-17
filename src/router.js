import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import LoginRegister from './views/LoginRegister.vue'
import CategoriesFiltered from './views/CategoriesFiltered.vue'
import Account from './views/Account.vue'
import { useCookies } from 'vue3-cookies'

const requireAuth = async (to, from, next) => {
  const cookies = useCookies()
  !cookies.cookies.get('userId') ? next('/login-register') : next()
}

const requireCategoriesFilteredAuth = async (to, from, next) => {
  const cookies = useCookies()
  !cookies.cookies.get('userId') && CategoriesFiltered ? next('/login-register') : next()
}

const requireAccountAuth = async (to, from, next) => {
  const cookies = useCookies()
  !cookies.cookies.get('userId') && Account ? next('/login-register') : next()
}

const routes = [
  { path: '/', component: Home, beforeEnter: requireAuth },
  { path: '/login-register', component: LoginRegister },
  { path: '/categories/:category', component: CategoriesFiltered, beforeEnter: requireCategoriesFilteredAuth },
  { path: '/account/:id', component: Account, beforeEnter: requireAccountAuth }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router