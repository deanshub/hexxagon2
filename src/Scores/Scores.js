import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { compose } from 'recompose'
import classnames from 'classnames'
import style from './scores.module.css'
import Piece from '../Piece'

class Scores extends Component {
  renderScore(player, score) {
    const { boardStore } = this.props
    return (
      <div
        className={classnames(style.playerScore, {
          [style.current]: boardStore.currentPlayer === player,
        })}
        key={player}
      >
        <Piece value={player} />
        <div>{score}</div>
      </div>
    )
  }
  render() {
    const { boardStore } = this.props
    return (
      <div className={classnames(style.scores)}>
        {Object.keys(boardStore.scores).map(player =>
          this.renderScore(Number(player), boardStore.scores[player])
        )}
      </div>
    )
  }
}

export default compose(
  inject('boardStore'),
  observer
)(Scores)
