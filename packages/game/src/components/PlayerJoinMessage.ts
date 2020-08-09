import { TagComponent } from '@colyseus/ecs'

/**
 * A server-only component that is used to signal that a player has joined.
 * This is processed by the PlayerJoinSystem
 */
export class PlayerJoinMessage extends TagComponent {
  public messageReceivedMs: number = 0
  public sessionId: string = ''
}
