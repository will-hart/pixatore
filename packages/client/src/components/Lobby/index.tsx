import * as React from 'react'
import { Redirect } from 'react-router-dom'
import debug from 'debug'
import { Components, Types } from '@pixatore/game'

import { FullContainer, Header1 } from '../shared'
import { GameContext } from '../../hooks/useGame'
import { LobbyPlayerList } from './LobbyPlayerList'
import { LobbyControls } from './LobbyControls'
import { ClientEventTypes } from '@pixatore/game/build/events/clientEvents'

const log = debug('PX:APP:Views     :Lobby     ')
log.log = console.log.bind(console)

export const Lobby = () => {
  const { gameEngine, room } = React.useContext(GameContext)
  const [redirect, setRedirect] = React.useState(false)

  const [playerMap, setPlayerMap] = React.useState<{
    [id: string]: Components.PlayerData
  }>({})

  React.useEffect(() => {
    if (!gameEngine) {
      log('Game engine not ready...')
      return () => {}
    }

    log('Game engine ready, mounting lobby')
    const unsubscribePlayerUpdates = gameEngine.eventBus.subscribe(
      ClientEventTypes.PLAYER_DATA_UPDATED,
      ({
        payload: { component },
      }: {
        payload: { component: Components.PlayerData }
      }) => {
        setPlayerMap((ps) => ({ ...ps, [component.playerId]: component }))
      },
    )

    log('Listening for game status changes')
    const unsubscribeStatusUpdates = gameEngine.eventBus.subscribe(
      ClientEventTypes.GAME_STATUS_UPDATED,
      ({ payload: { status } }: { payload: { status: string } }) => {
        if (status === 'playing') {
          log('Redirecting to game')
          setRedirect(true)
        }
      },
    )

    return () => {
      log('Unsubscribing from events')
      unsubscribePlayerUpdates()
      unsubscribeStatusUpdates()
    }
  }, [gameEngine, setPlayerMap])

  // create the client if it doesn't exist
  if (!room) {
    log('No room found, aborting lobby')
    return <Redirect to="/browser" push />
  }

  if (redirect) {
    return <Redirect to={`/game/${room.id}`} />
  }

  const setReady = (isReady: boolean) => {
    gameEngine?.room.send(Types.MessageTypes.PLAYER_READY, { isReady })
  }

  const startGame = () => {
    gameEngine?.room.send(Types.MessageTypes.START_GAME)
  }

  const me = gameEngine ? playerMap[gameEngine.room.sessionId] : undefined

  return (
    <FullContainer>
      <Header1>Lobby</Header1>
      <LobbyPlayerList playerMap={playerMap} />
      <LobbyControls
        isReady={false}
        canStart={
          me?.slot === 1 && !Object.values(playerMap).some((p) => !p.isReady)
        }
        setReady={setReady}
        startGame={startGame}
      />
    </FullContainer>
  )
}
