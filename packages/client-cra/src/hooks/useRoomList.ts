import { useState, useEffect } from 'react'
import { Client, RoomAvailable } from 'colyseus.js'
import debug from 'debug'

import { Constants, State } from '@pixatore/game'

const log = debug('PX:APP:Views     :useRoomLst')
log.log = console.log.bind(console)

export const useRoomList = (client?: Client) => {
  const [roomList, setRoomList] = useState<RoomAvailable<State.GameState>[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!client) return () => {}

    log('Client available, starting to query for available rooms')

    async function getRoomList() {
      setLoading(true)
      const rooms = await client?.getAvailableRooms(Constants.GAME_ROOM_NAME)
      if (rooms) setRoomList(rooms)
      setLoading(false)
    }

    const interval = setInterval(getRoomList, 3000)
    getRoomList()

    return () => {
      log('Cancelling room list interval')
      interval && clearInterval(interval)
    }
  }, [client, setRoomList, setLoading])

  return { loading, roomList }
}
