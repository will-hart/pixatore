import React from 'react'

import { useWindowSize } from './hooks/useWindowSize'
import { FullContainer } from './components'

function App() {
  const windowSize = useWindowSize()
  return (
    <div className="App">
      <FullContainer>{JSON.stringify(windowSize)}</FullContainer>
    </div>
  )
}

export default App
