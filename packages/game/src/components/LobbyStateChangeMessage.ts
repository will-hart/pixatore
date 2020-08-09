import { TagComponent } from '@colyseus/ecs'

/**
 * A server-only component that stores information about recent changes
 * to the lobby state, e.g. readiness, game start etc.
 *
 * Components are created by the room message handlers and processed by
 * the LobbySystem. No fields are synchronised with the clients
 */
export class LobbyStateChangeMessage extends TagComponent {
  public messageReceivedMs: number = 0
  public sessionId: string = ''
  public readyState = false
  public startingGame = false
}
