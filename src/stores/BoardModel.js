import { decorate, observable, computed, action } from 'mobx'
import board1 from '../utils/board1'
import {
  getPossibleMovesByPositions,
  move,
  getScores,
  getPossiblePlayerMoves,
} from '../utils/game'
import { eagerSelection } from '../ai'

class BoardModel {
  board = board1
  currentPlayer = 1
  selectedPosition = { x: undefined, y: undefined }
  computer = true
  winner = undefined

  selectedPositionExists() {
    return (
      this.selectedPosition.x !== undefined &&
      this.selectedPosition.y !== undefined
    )
  }

  clearSelectedPosition() {
    this.selectedPosition.x = undefined
    this.selectedPosition.y = undefined
  }

  setSelectedPosition({ x, y }) {
    this.selectedPosition.x = x
    this.selectedPosition.y = y
  }

  isOptionalMove({ x, y }) {
    return this.possibleMoves.find(move => move.x === x && move.y === y)
  }

  handleCellClick({ x, y, distance }) {
    if (this.selectedPosition.x === x && this.selectedPosition.y === y) {
      return this.clearSelectedPosition()
    } else if (this.board[y][x] === this.currentPlayer) {
      return this.setSelectedPosition({ x, y })
    }

    const optionalMove = this.isOptionalMove({ x, y })
    if (optionalMove) {
      this.board = move(
        this.board,
        this.selectedPosition,
        { x, y },
        optionalMove.distance
      )
      const nextPlayer = this.nextTurn()
      if (nextPlayer === 2 && this.computer) {
        setTimeout(() => {
          this.computerMove()
        }, 1000)
      } else if (nextPlayer === null) {
        const scores = getScores(this.board)
        const values = Object.values(scores)
        if (values.length > 1 && values.every(value => value === values[0])) {
          this.winner = null
        } else {
          this.winner = Number(
            Object.keys(scores).reduce(
              (res, player) => {
                if (scores[player] > res.score) {
                  return {
                    player,
                    score: scores[player],
                  }
                }
                return res
              },
              { player: null, score: -Infinity }
            ).player
          )
        }
      }
      return this.clearSelectedPosition()
    } else {
      return this.clearSelectedPosition()
    }
  }

  computerMove() {
    const move = eagerSelection(this.board, this.currentPlayer)
    this.setSelectedPosition(move.origin)
    return this.handleCellClick(move)
  }

  get possibleMoves() {
    if (this.selectedPositionExists()) {
      return getPossibleMovesByPositions(this.board, [this.selectedPosition])
    }
    return []
  }

  makeMove(start, end) {
    this.board = move(this.board, start, end)
  }

  get scores() {
    return getScores(this.board)
  }

  nextTurn() {
    let nextPlayer = this.currentPlayer + 1
    if (nextPlayer > 2) {
      nextPlayer = 1
    }
    if (getPossiblePlayerMoves(this.board, nextPlayer).length > 0) {
      this.currentPlayer = nextPlayer
      return this.currentPlayer
    } else {
      return null
    }
  }
}

export default decorate(BoardModel, {
  board: observable,
  selectedPosition: observable,
  currentPlayer: observable,
  handleCellClick: action,
  makeMove: action,
  scores: computed,
  possibleMoves: computed,
  winner: observable,
})
