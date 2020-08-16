import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css'
import { Browser, Game, Lobby, MainMenu, Splash } from './components'

import { GameContext, useNewGameContext } from './hooks/useGame'

const getGameRoutes = () => (
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
)

const App = () => {
  const initialContext = useNewGameContext()

  return (
    <GameContext.Provider value={initialContext}>
      <div className="App">
        <Router>{getGameRoutes()}</Router>
      </div>
    </GameContext.Provider>
  )
}

export default App
