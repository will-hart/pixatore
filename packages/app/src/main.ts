import { createApp } from 'vue'
import router from './router'
import store from './store'

import 'vue-resize/dist/vue-resize.css'

import gameEngine from './plugins/gameEngine'

import App from './App.vue'

// create app
const app = createApp(App)

// install plugins
app.use(router).use(store).use(gameEngine)

// mount
app.mount('#app')
