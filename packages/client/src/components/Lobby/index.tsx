import * as React from 'react'
import { Redirect } from 'react-router-dom'
import debug from 'debug'
import { Systems, Components } from '@pixatore/game'

import { FullContainer, Header1 } from '../shared'
import { GameContext } from '../../hooks/useGame'
import { LobbyPlayerList } from './LobbyPlayerList'

const log = debug('PX:APP:Views     :Lobby     ')
log.log = console.log.bind(console)

export const Lobby = () => {
  const { gameEngine, room } = React.useContext(GameContext)

  const [playerMap, setPlayerMap] = React.useState<{
    [id: string]: Components.PlayerData
  }>({})

  React.useEffect(() => {
    if (!gameEngine) {
      log('Game engine not ready')
      return () => {}
    }

    const system = gameEngine.world.getSystem(Systems.LobbyHudSystem)
    if (!system) {
      log('Unable to enable LobbyHudSystems - system not found')
    } else {
      log('Enabling LobbyHudSystem')
      system.setCallback((playerData: Components.PlayerData) => {
        log('Adding player %o', playerData)
        setPlayerMap((ps) => ({ ...ps, [playerData.playerId]: playerData }))
      })
    }

    return () => {
      const system = gameEngine.world.getSystem(Systems.LobbyHudSystem)
      if (!system) {
        log('Unable to disable LobbyHudSystem - system not found')
        return
      }

      log('Disabling LobbyHudSystem')
      system.setCallback((_player: Components.PlayerData) => {})
    }
  }, [gameEngine, setPlayerMap])

  // create the client if it doesn't exist
  if (!room) {
    log('No room found, aborting lobby')
    return <Redirect to="/browser" push />
  }

  return (
    <FullContainer>
      <Header1>Lobby</Header1>
      <LobbyPlayerList playerMap={playerMap} />
    </FullContainer>
  )
}
