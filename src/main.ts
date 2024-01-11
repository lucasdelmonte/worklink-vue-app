import '../styles/main.scss'
import '../src/misc/inputs.ts'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

createApp(App).use(router).use(createPinia()).mount('#app')
