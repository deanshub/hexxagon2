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
      this.nextTurn()
      return this.clearSelectedPosition()
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

  nextTurn() {
    this.currentPlayer++
    if (this.currentPlayer > 2) {
      this.currentPlayer = 1
    }
    return this.currentPlayer
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
