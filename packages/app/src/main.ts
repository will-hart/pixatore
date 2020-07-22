import { createApp } from 'vue'
import router from './router'
import store from './store'

import 'vue-resize/dist/vue-resize.css'

import App from './App.vue'

createApp(App).use(router).use(store).mount('#app')
