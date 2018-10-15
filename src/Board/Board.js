import React, { Component } from 'react';
import classnames from 'classnames'
import style from './board.module.css'
import Row from '../Row'

class Board extends Component {
  static defaultProps = {
    value: [],
  }

  render() {
    const {value} = this.props
    return (
      <div className={classnames(style.board)}>
        {value.map((row, index)=>(
          <Row key={index} value={row} index={index}/>
        ))}
      </div>
    );
  }
}

export default Board;
