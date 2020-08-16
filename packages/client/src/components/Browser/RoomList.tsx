import * as React from 'react'
import { RoomAvailable } from 'colyseus.js'
import { State } from '@pixatore/game'

export interface IRoomListProps {
  canJoin: boolean
  lastRoomId?: string
  onJoinGame: (id: string) => Promise<void>
  onReconnect: () => Promise<void>
  roomList: RoomAvailable<State.GameState>[]
}

export const RoomList = ({
  canJoin,
  lastRoomId,
  onJoinGame,
  onReconnect,
  roomList,
}: IRoomListProps) => {
  return (
    <>
      {roomList.map((room) => {
        const isReconnect = room.roomId === lastRoomId
        return (
          <div key={`server-browser-room-${room.roomId}`}>
            {room.roomId} {room.clients}/{room.maxClients}{' '}
            {(canJoin || isReconnect) && (
              <button
                onClick={() =>
                  isReconnect ? onReconnect() : onJoinGame(room.roomId)
                }
              >
                {isReconnect ? 'Reconnect' : 'Join'}
              </button>
            )}
          </div>
        )
      })}
    </>
  )
}
