import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

if (process?.env?.NODE_ENV === 'Production') {
  localStorage.setItem('debug', '')
} else {
  localStorage.setItem('debug', 'App:*')
}

// create app
const app = createApp(App)

// install plugins
app.use(router).use(store)

// mount
app.mount('#app')
