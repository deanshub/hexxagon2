import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { compose } from 'recompose'
import classnames from 'classnames'
import style from './scores.module.css'

class Scores extends Component {
  renderScore(player, score) {
    return (
      <div key={player}>
        Player{player}: {score}
      </div>
    )
  }
  render() {
    const { boardStore } = this.props
    return (
      <>
        <div className={classnames(style.scores)}>
          {Object.keys(boardStore.scores).map(player =>
            this.renderScore(player, boardStore.scores[player])
          )}
        </div>
        <div className={classnames(style.turn)}>
          Turn: Player{boardStore.currentPlayer}
        </div>
      </>
    )
  }
}

export default compose(
  inject('boardStore'),
  observer
)(Scores)
