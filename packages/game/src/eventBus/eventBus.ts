import { EventBus as TsEventBus } from 'ts-bus'
import { EventTypes, PlayerEventArgs } from './events'
import { BusEvent } from 'ts-bus/types'
import { Types } from '..'

class EventBus extends TsEventBus {
  onGameStatusChange = (handler: (current: Types.GameStatus) => void) => {
    const unsubscribeGameStatusChange = this.subscribe(
      EventTypes.ON_GAME_STATUS_CHANGED.toString(),
      (event: BusEvent<{ current: Types.GameStatus }>) => {
        handler(event.payload.current)
      },
    )
    return unsubscribeGameStatusChange
  }

  onPlayerAdd = (handler: (Player: any) => void) => {
    const unsubscribeAddPlayer = this.subscribe(
      EventTypes.ON_PLAYER_ADD.toString(),
      (event: BusEvent<PlayerEventArgs>) => {
        handler(event.payload.player)
      },
    )

    return unsubscribeAddPlayer
  }

  onPlayerRemove = (handler: (Player: any) => void) => {
    const unsubscribeRemovePlayer = this.subscribe(
      EventTypes.ON_PLAYER_REMOVE.toString(),
      (event: BusEvent<PlayerEventArgs>) => {
        handler(event.payload.player)
      },
    )

    return unsubscribeRemovePlayer
  }

  onPlayerUpdate = (handler: (Player: any) => void) => {
    const unsubscribeUpdatePlayer = this.subscribe(
      EventTypes.ON_PLAYER_UPDATE.toString(),
      (event: BusEvent<PlayerEventArgs>) => {
        handler(event.payload.player)
      },
    )

    return unsubscribeUpdatePlayer
  }
}

export default EventBus
