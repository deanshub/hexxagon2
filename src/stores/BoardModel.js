import { decorate, observable, computed, action } from 'mobx'
import board1 from '../utils/board1'
import { getPossibleMovesByPositions, move, getScores } from '../utils/game'

class BoardModel {
  board = board1
  currentPlayer = 1
  selectedPosition = { x: undefined, y: undefined }

  selectedPositionExists() {
    return (
      this.selectedPosition.x !== undefined &&
      this.selectedPosition.y !== undefined
    )
  }

  setSelectedPosition({ x, y }) {
    if (this.selectedPosition.x === x && this.selectedPosition.y === y) {
      this.selectedPosition.x = undefined
      this.selectedPosition.y = undefined
    } else {
      this.selectedPosition.x = x
      this.selectedPosition.y = y
    }
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
}

export default decorate(BoardModel, {
  board: observable,
  selectedPosition: observable,
  currentPlayer: observable,
  setSelectedPosition: action,
  makeMove: action,
  scores: computed,
  possibleMoves: computed,
})
