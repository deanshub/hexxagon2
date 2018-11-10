import React, { Component } from 'react';
import Board from './Board'
import Shadow from './Shadow'
import board1 from './utils/board1'
import './App.css'

class App extends Component {
  render() {
    return (
      <>
        <Board value={board1}/>
        <Shadow/>
      </>
    );
  }
}

export default App;
