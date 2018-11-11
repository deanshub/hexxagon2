import React, { Component } from 'react';
import classnames from 'classnames'
import { observer, inject } from 'mobx-react'
import { compose } from 'recompose'
import style from './cell.module.css'
import Piece from '../Piece'

class Cell extends Component {
  render() {
    const {value, position, boardStore} = this.props
    return (
      <div
        onClick={()=>console.log(position, boardStore.getPossibleMoves(position))}
        className={classnames(
          style.cell,
          {[style.hidden]: value===undefined},
          {[style.active]: value!==0},
        )}
      >
        <div className={classnames(style.content)}>
          <div className={classnames(style.left)} />
          <div className={classnames(style.middle)}>
            {value!==0&&<Piece value={value}/>}
          </div>
          <div className={classnames(style.right)} />
        </div>
      </div>
    );
  }
}

export default compose(
  inject('boardStore'),
  observer,
)(Cell)
