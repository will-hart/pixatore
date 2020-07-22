import Engine from '@/gameEngine/Engine'

import { Plugin } from 'vue'

let _engine: Engine | null = null

export const GameEngineSymbol = Symbol()

const createNewEngine = () => {
  _engine = new Engine()
  return _engine
}

const gameEnginePlugin: Plugin = {
  install: (app, options) => {
    app.config.globalProperties.$engine = (): Engine =>
      _engine || createNewEngine()
    app.provide(GameEngineSymbol, options)
  },
}

export default gameEnginePlugin
