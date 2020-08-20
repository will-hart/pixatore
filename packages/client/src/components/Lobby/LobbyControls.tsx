import * as React from 'react'

interface ILobbyControlsProps {
  canStart: boolean
  isReady: boolean
  setReady: (ready: boolean) => void
  startGame: () => void
}

export const LobbyControls = ({
  canStart,
  isReady,
  setReady,
  startGame,
}: ILobbyControlsProps) => {
  return (
    <div>
      <button onClick={() => setReady(!isReady)}>Toggle Ready</button>
      {canStart && <button onClick={() => startGame()}>Start Game</button>}
    </div>
  )
}
