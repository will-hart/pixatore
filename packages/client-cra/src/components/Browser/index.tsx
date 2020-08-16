import * as React from 'react'
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
  const { client, setClient } = React.useContext(GameContext)
  const { loading, roomList } = useRoomList(client)
  const { createGame } = useRoomOperations(client)

  // create the client if it doesn't exist
  if (!client) {
    log('Creating new client for url: %s', CLIENT_URL)

    // avoid set-state during render
    setTimeout(() => setClient(new Client(CLIENT_URL)), 0)
    return null
  }

  return (
    <FullContainer>
      <Header1>Server browser</Header1>
      <ServerBrowserControls onCreateGame={createGame} />
      {loading ? <span>LOADING</span> : <RoomList roomList={roomList} />}
    </FullContainer>
  )
}
