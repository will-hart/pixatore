import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fps: 0,
  },
  mutations: {
    setFps(state, fps) {
      state.fps = fps
    },
  },
  actions: {
    setFps({ commit }, fps) {
      commit('setFps', fps)
    },
  },
  modules: {},
})
