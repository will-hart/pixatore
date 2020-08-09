import { TagComponent } from '@colyseus/ecs'

/**
 * A server-only component that is used to signal when a player's
 * connection status has changed.
 *
 * Consumed by the PlayerConnectionStatusSystem
 */
export class PlayerConnectionStatusMessage extends TagComponent {
  public messageReceivedMs: number = 0
  public sessionId: string = ''
  public isConnected: boolean = false
  public isRemoved: boolean = false
}
