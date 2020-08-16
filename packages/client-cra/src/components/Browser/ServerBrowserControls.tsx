import * as React from 'react'

export interface IServerBrowserControlsProps {
  onCreateGame: () => Promise<void>
}

export const ServerBrowserControls = ({
  onCreateGame,
}: IServerBrowserControlsProps) => {
  return (
    <div>
      <button onClick={onCreateGame}>Create Game</button>
    </div>
  )
}
