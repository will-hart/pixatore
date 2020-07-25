import { EventBus as TsEventBus } from 'ts-bus'
import { EventTypes, PlayerEventArgs } from './events'
import { BusEvent } from 'ts-bus/types'
import { Entities } from '..'

class EventBus extends TsEventBus {
  onPlayerAdd = (handler: (Player: Entities.Player) => void) => {
    const unsubscribeAddPlayer = this.subscribe(
      EventTypes.ON_PLAYER_ADD.toString(),
      (event: BusEvent<PlayerEventArgs>) => {
        handler(event.payload.player)
      },
    )

    return unsubscribeAddPlayer
  }
  onPlayerRemove = (handler: (Player: Entities.Player) => void) => {
    const unsubscribeRemovePlayer = this.subscribe(
      EventTypes.ON_PLAYER_REMOVE.toString(),
      (event: BusEvent<PlayerEventArgs>) => {
        handler(event.payload.player)
      },
    )

    return unsubscribeRemovePlayer
  }
}

export default EventBus
