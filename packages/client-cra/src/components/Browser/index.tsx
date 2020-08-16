import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { Client } from 'colyseus.js'
import debug from 'debug'

import { CLIENT_URL } from '../../constants'
import { FullContainer, Header1 } from '../shared'
import { GameContext } from '../../hooks/useGame'
import { useRoomList } from '../../hooks/useRoomList'

import { RoomList } from './RoomList'
import { ServerBrowserControls } from './ServerBrowserControls'
import { useRoomOperations } from '../../hooks/useRoomOperations'

const log = debug('PX:APP:Views     :SrvBrowser')
log.log = console.log.bind(console)

export const Browser = () => {
  const { client, setClient, setRoom, room: ctxRoom } = React.useContext(
    GameContext,
  )
  const { loading, roomList } = useRoomList(client)
  const {
    createGame,
    joinGame,
    lastRoomId,
    reconnect,
    room,
  } = useRoomOperations(client)

  // create the client if it doesn't exist
  if (!client) {
    log('Creating new client for url: %s', CLIENT_URL)

    // avoid set-state during render
    setTimeout(() => setClient(new Client(CLIENT_URL)), 0)
    return null
  }

  if (ctxRoom) {
    log('Redirecting to lobby')
    return <Redirect to={`/lobby/${ctxRoom.id}`} />
  }

  if (room) {
    log('Save lobby to context')
    setTimeout(() => setRoom(room), 0)
    return null
  }

  return (
    <FullContainer>
      <Header1>Server browser</Header1>
      <ServerBrowserControls onCreateGame={createGame} />
      {loading ? (
        <span>LOADING</span>
      ) : (
        <RoomList
          canJoin={!room}
          lastRoomId={lastRoomId}
          roomList={roomList}
          onJoinGame={joinGame}
          onReconnect={reconnect}
        />
      )}
    </FullContainer>
  )
}
