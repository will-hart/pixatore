import Vue from 'vue'
import Vuex from 'vuex'

import { gameStatus } from './modules/gameStatus'
import { StoreNamespaces } from './types'

Vue.use(Vuex)

const debug = process?.env?.NODE_ENV && process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    [StoreNamespaces.gameStatus]: gameStatus,
  },
  strict: debug,
})

export default store
