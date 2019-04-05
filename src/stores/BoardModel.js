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

  handleCellClick({ x, y }) {
    if (this.selectedPosition.x === x && this.selectedPosition.y === y) {
      return this.clearSelectedPosition()
    } else if (this.board[y][x] === this.currentPlayer) {
      return this.setSelectedPosition({ x, y })
    } else if (this.isOptionalMove({ x, y })) {
      // TODO: move pawn
      return this.clearSelectedPosition()
      // TODO: change player turn
    } else {
      return this.clearSelectedPosition()
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
  handleCellClick: action,
  makeMove: action,
  scores: computed,
  possibleMoves: computed,
})
