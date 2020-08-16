import * as React from 'react'
import { Client } from 'colyseus.js'
import debug from 'debug'

import { CLIENT_URL } from '../../constants'
import { FullContainer, Header1 } from '../shared'
import { ClientContext } from '../../hooks/useClient'
import { useRoomList } from '../../hooks/useRoomList'

const log = debug('PX:APP:Views     :SrvBrowser')
log.log = console.log.bind(console)

export const Browser = () => {
  const { client, setClient } = React.useContext(ClientContext)
  const { loading, roomList } = useRoomList(client)

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
      {loading ? <span>LOADING</span> : <span>{JSON.stringify(roomList)}</span>}
    </FullContainer>
  )
}
