import * as React from 'react'
import { Redirect } from 'react-router-dom'
import debug from 'debug'
import { Systems, Components } from '@pixatore/game'

import { FullContainer, Header1 } from '../shared'
import { GameContext } from '../../hooks/useGame'

const log = debug('PX:APP:Views     :Lobby     ')
log.log = console.log.bind(console)

export const Lobby = () => {
  const { gameEngine, room } = React.useContext(GameContext)

  const [playerList, setPlayerList] = React.useState<Components.PlayerData[]>(
    [],
  )

  React.useEffect(() => {
    if (!gameEngine) {
      log('Game engine not ready')
      return () => {}
    }

    log('Adding lobby HUD system')

    if (!gameEngine.world.getSystem(Systems.LobbyHudSystem)) {
      gameEngine.world.registerSystem(Systems.LobbyHudSystem, {
        onAdd: (playerData: Components.PlayerData) => {
          log('Adding player %o', playerData)
          setPlayerList((ps) =>
            [...ps, playerData].sort((a, b) => a.slot - b.slot),
          )
        },
        onRemove: (playerData: Components.PlayerData) => {
          log('Removing player %o', playerData)
          setPlayerList((ps) =>
            ps.filter((p) => p.playerId !== playerData.playerId),
          )
        },
      })
    }

    return () => {
      gameEngine.world.unregisterSystem(Systems.LobbyHudSystem)
    }
  }, [gameEngine, setPlayerList])

  // create the client if it doesn't exist
  if (!room) {
    log('No room found, aborting lobby')
    return <Redirect to="/browser" />
  }

  return (
    <FullContainer>
      <Header1>Lobby</Header1>
      <p>{JSON.stringify(playerList)}</p>
    </FullContainer>
  )
}
