import { decorate, observable, computed, action } from 'mobx'
import board1 from '../utils/board1'
import { getPossibleMovesByPositions, move, getScores } from '../utils/game'

class BoardModel {
  board = board1
  currentPlayer = 1

  getPossibleMoves(position) {
    return getPossibleMovesByPositions(this.board, [position])
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
  currentPlayer: observable,
  getPossibleMoves: action,
  makeMove: action,
  scores: computed,
})
