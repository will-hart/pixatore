import * as React from 'react'
// import { Redirect } from 'react-router-dom'
import debug from 'debug'

import { FullContainer, Header1 } from '../shared'
import { GameContext } from '../../hooks/useGame'

const log = debug('PX:APP:Views     :Lobby     ')
log.log = console.log.bind(console)

export const Lobby = () => {
  log('Rendering lobby')
  debugger
  const { room } = React.useContext(GameContext)

  // // create the client if it doesn't exist
  // if (!room) {
  //   log('No room found, aborting lobby')
  //   return <Redirect to="/browser" />
  // }

  return (
    <FullContainer>
      <Header1>Lobby</Header1>
      <p>{JSON.stringify(room)}</p>
    </FullContainer>
  )
}
