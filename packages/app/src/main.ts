import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vue-resize/dist/vue-resize.css'
import Engine from './gameEngine/Engine'

Vue.config.productionTip = false
Vue.prototype.$engine = new Engine()

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
