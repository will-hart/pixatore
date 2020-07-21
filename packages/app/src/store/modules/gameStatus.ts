import { MutationTree, ActionTree, Module } from 'vuex'
import { GameStatusModuleState, AppState } from '../types'

const state: GameStatusModuleState = {
  current: 0,
}

const getters = {}

const mutations: MutationTree<GameStatusModuleState> = {
  setFps(state: GameStatusModuleState, fps: number) {
    state.current = fps
  },
}

const actions: ActionTree<GameStatusModuleState, AppState> = {
  setFps({ commit }, fps: number) {
    commit('setFps', fps)
  },
}

export const gameStatus: Module<GameStatusModuleState, AppState> = {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
}
