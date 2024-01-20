import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import LoginRegister from './views/LoginRegister.vue'
import Business from './views/Business.vue'
import ServicesRequest from './views/ServicesRequest.vue'
import Account from './views/Account.vue'
import { useCookies } from 'vue3-cookies'

const requireAuth = async (to, from, next) => {
  const cookies = useCookies()
  !cookies.cookies.get('userId') ? next('/login-register') : next()
}

const requireBusinessAuth = async (to, from, next) => {
  const cookies = useCookies()
  !cookies.cookies.get('userId') && Business ? next('/login-register') : next()
}

const requireServicesRequestAuth = async (to, from, next) => {
  const cookies = useCookies()
  !cookies.cookies.get('userId') && ServicesRequest ? next('/login-register') : next()
}

const requireAccountAuth = async (to, from, next) => {
  const cookies = useCookies()
  !cookies.cookies.get('userId') && Account ? next('/login-register') : next()
}

const routes = [
  { path: '/', component: Home, beforeEnter: requireAuth },
  { path: '/login-register', component: LoginRegister },
  { path: '/business/:category', component: Business, beforeEnter: requireBusinessAuth },
  { path: '/services-request', component: ServicesRequest, beforeEnter: requireServicesRequestAuth },
  { path: '/account/:id', component: Account, beforeEnter: requireAccountAuth }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router