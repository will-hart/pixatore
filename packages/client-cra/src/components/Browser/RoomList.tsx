import * as React from 'react'
import { RoomAvailable } from 'colyseus.js'
import { State } from '@pixatore/game'

export interface IRoomListProps {
  roomList: RoomAvailable<State.GameState>[]
}

export const RoomList = ({ roomList }: IRoomListProps) => {
  return <span>{JSON.stringify(roomList)}</span>
}
