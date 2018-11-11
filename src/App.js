import React, { Component } from 'react';
import Board from './Board'
import Shadow from './Shadow'
import './App.css'

class App extends Component {
  render() {
    return (
      <>
        <Board/>
        <Shadow/>
      </>
    )
  }
}

export default App;
