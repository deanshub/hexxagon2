import React, { Component } from 'react';
import classnames from 'classnames'
import style from './board.module.css'
import Row from '../Row'
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
          <Row key={index} value={row} index={index}/>
        ))}
      </div>
    );
  }
}

export default Board;
