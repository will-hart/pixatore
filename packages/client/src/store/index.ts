import { createStore } from 'vuex'

import { gameStatus } from './modules/gameStatus'
import { StoreNamespaces } from './types'

const debug = process?.env?.NODE_ENV && process.env.NODE_ENV !== 'production'

const store = createStore({
  modules: {
    [StoreNamespaces.gameStatus]: gameStatus,
  },
  strict: debug,
})

export default store
