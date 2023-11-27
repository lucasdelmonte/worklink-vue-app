import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import LoginRegister from './views/LoginRegister.vue'

const routes = [
  { path: '/login-register', component: LoginRegister },
  { path: '/', component: Home }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router