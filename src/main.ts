import { createApp } from 'vue'
import './style.css'
import { createPinia } from 'pinia'

// @ts-expect-error type check
import { createRouter, createWebHistory } from 'vue-router/auto'
import App from './App.vue'

const router = createRouter({
  history: createWebHistory(),
})
const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
