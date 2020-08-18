import * as React from 'react'
import { Components } from '@pixatore/game'

interface ILobbyPlayerListProps {
  playerMap: { [id: string]: Components.PlayerData }
}

export const LobbyPlayerList = ({ playerMap }: ILobbyPlayerListProps) => {
  return (
    <div>
      {Object.values(playerMap)
        .sort((a, b) => a.slot - b.slot)
        .map((player) => (
          <div key={`player-lobby-slot-list-${player.playerId}`}>
            SLOT {player.slot} {player.playerId} {player.isReady && '✓'}
          </div>
        ))}
    </div>
  )
}
