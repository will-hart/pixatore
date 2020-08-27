import * as React from 'react'
import debug from 'debug'

import { GameContext } from '../hooks/useGame'
import { useWindowSize } from '../hooks/useWindowSize'
import { clientEvents } from '@pixatore/game'

const log = debug('PX:APP:Views     :Game      ')
log.log = console.log.bind(console)

export const Game = () => {
  const { gameEngine } = React.useContext(GameContext)
  const { width, height } = useWindowSize()

  React.useEffect(() => {
    if (!gameEngine) return

    const w = width || window.innerWidth
    const h = height || window.innerHeight

    gameEngine.eventBus.publish(
      clientEvents.onGameResize({ width: w, height: h }),
    )
  }, [gameEngine, width, height])

  React.useLayoutEffect(() => {
    if (!gameEngine) throw new Error('No game engine')

    gameEngine.mountToDom(
      document.getElementById('game-container')! as HTMLDivElement,
    )
  })

  return <div id="game-container"></div>
}
