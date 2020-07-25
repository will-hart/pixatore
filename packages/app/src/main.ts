import { createApp } from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// create app
const app = createApp(App)

// install plugins
app.use(router).use(store)

// install global components

// mount
app.mount('#app')
