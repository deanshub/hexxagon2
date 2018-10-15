import React, { Component } from 'react';
import Board from './Board'
import board1 from './utils/board1'

class App extends Component {
  render() {
    return (
      <Board value={board1}/>
    );
  }
}

export default App;
