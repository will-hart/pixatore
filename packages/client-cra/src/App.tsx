import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Browser, Game, Lobby, MainMenu, Splash } from './components'

import { ClientContext, useNewClientContext } from './hooks/useClient'

const App = () => {
  const initialContext = useNewClientContext()

  return (
    <ClientContext.Provider value={initialContext}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/menu">
              <MainMenu />
            </Route>
            <Route exact path="/browser">
              <Browser />
            </Route>
            <Route exact path="/lobby/:id">
              <Lobby />
            </Route>
            <Route exact path="/game/:id">
              <Game />
            </Route>
            <Route path="/">
              <Splash />
            </Route>
          </Switch>
        </Router>
      </div>
    </ClientContext.Provider>
  )
}

export default App
