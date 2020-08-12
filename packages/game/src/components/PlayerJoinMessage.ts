import { Component } from '@colyseus/ecs'
import { type } from '@colyseus/schema'

/**
 * A server-only component that is used to signal that a player has joined.
 * This is processed by the PlayerJoinSystem
 */
export class PlayerJoinMessage extends Component {
  public messageReceivedMs: number = 0

  // TODO: queries in the ECS are not correctly triggered if @@type isn't applied
  @type('string') public sessionId: string = ''
}
