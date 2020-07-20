import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vue-class-component/hooks'
import 'vue-resize/dist/vue-resize.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
