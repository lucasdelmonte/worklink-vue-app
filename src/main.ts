import '../styles/main.scss'
import '../src/misc/inputs.ts'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue3-cookies'

createApp(App).use(router).use(createPinia()).use(VueCookies).mount('#app')
