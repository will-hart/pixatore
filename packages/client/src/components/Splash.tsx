import * as React from 'react'
import { Redirect } from 'react-router-dom'

import { useTimeout } from '../hooks/useTimeout'
import { CenteredContainer, Header1 } from './shared'

export const Splash = () => {
  const [redirectTo, setRedirectTo] = React.useState<boolean>(false)
  useTimeout(() => {
    setRedirectTo(true)
  }, 1500)

  if (redirectTo) {
    return <Redirect to="menu" />
  }

  return (
    <CenteredContainer>
      <Header1>Pixatore</Header1>
    </CenteredContainer>
  )
}
