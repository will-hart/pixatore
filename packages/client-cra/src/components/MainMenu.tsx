import * as React from 'react'
import { Link } from 'react-router-dom'

import { FullContainer, Header2, NavButtonText } from './shared'

export const MainMenu = () => {
  return (
    <FullContainer>
      <Header2>Pixatore</Header2>

      <Link to="browser">
        <NavButtonText>Create Game</NavButtonText>
      </Link>
    </FullContainer>
  )
}
