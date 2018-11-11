import React, { Component } from 'react';
import classnames from 'classnames'
import style from './board.module.css'
import Column from '../Column'
import {transpose} from '../utils/helpers'
import { observer, inject } from 'mobx-react'
import { compose } from 'recompose'

class Board extends Component {
  render() {
    const {boardStore} = this.props

    const board = transpose(boardStore.board)
    return (
      <div className={classnames(style.board)}>
        {board.map((row, index)=>(
          <Column key={index} value={row} index={index}/>
        ))}
      </div>
    );
  }
}

export default compose(
  inject('boardStore'),
  observer,
)(Board)
