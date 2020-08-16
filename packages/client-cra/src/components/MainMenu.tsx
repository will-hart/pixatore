import * as React from 'react'
import { Link } from 'react-router-dom'

import { CenteredContainer, Header2, NavButtonText } from './shared'

export const MainMenu = () => {
  return (
    <CenteredContainer>
      <Header2>Pixatore</Header2>

      <Link to="browser">
        <NavButtonText>Create Game</NavButtonText>
      </Link>
    </CenteredContainer>
  )
}
