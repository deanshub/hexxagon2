import React, { Component } from 'react';
import classnames from 'classnames'
import style from './board.module.css'
import Column from '../Column'
import {transpose} from '../utils/helpers'

class Board extends Component {
  static defaultProps = {
    value: [],
  }

  render() {
    const {value} = this.props
    const board = transpose(value)
    return (
      <div className={classnames(style.board)}>
        {board.map((row, index)=>(
          <Column key={index} value={row} index={index}/>
        ))}
      </div>
    );
  }
}

export default Board;
