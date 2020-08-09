import { Room, Client } from 'colyseus.js'

import debug from 'debug'
const log = debug('Test:Loadtest:Server')
log.log = console.log.bind(console)

export function requestJoinOptions(this: Client, i: number) {
  return { requestNumber: i }
}

export function onJoin(this: Room) {
  log(`${this.sessionId} joined.`)

  this.onMessage('*', (type, message) => {
    log(`${this.sessionId} received: ${type}, ${message}`)
  })
}

export function onLeave(this: Room) {
  log(`${this.sessionId} left.`)
}

export function onError(this: Room, err: any) {
  log(`${this.sessionId} !! ERROR !! ${err.message}`)
}

export function onStateChange(this: Room, state: any) {
  log(`${this.sessionId} new state: ${state}`)
}
