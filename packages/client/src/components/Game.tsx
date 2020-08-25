import * as React from 'react'
import debug from 'debug'

import { CenteredContainer } from './shared'
import { GameContext } from '../hooks/useGame'

const log = debug('PX:APP:Views     :Game      ')
log.log = console.log.bind(console)

export const Game = () => {
  const { gameEngine } = React.useContext(GameContext)

  React.useLayoutEffect(() => {
    if (!gameEngine) throw new Error('No game engine')

    gameEngine.mountToDom(
      document.getElementById('game-container')! as HTMLDivElement,
    )
  })

  return (
    <div id="game-container">
      <CenteredContainer>HUD</CenteredContainer>
    </div>
  )
}
