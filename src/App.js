import React, { Component } from 'react'
import Board from './Board'
import Shadow from './Shadow'
import Scores from './Scores/Scores'
import './App.css'

class App extends Component {
  render() {
    return (
      <>
        <Scores />
        <Board />
        <Shadow />
      </>
    )
  }
}

export default App
