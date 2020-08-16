import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { Browser, Game, Lobby, MainMenu, Splash } from './components'

function App() {
  return (
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
  )
}

export default App
