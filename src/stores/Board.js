import { decorate, observable, computed, action } from 'mobx'
import board1 from '../utils/board1'
import {getPossiblePlayerMoves, move, getScores} from '../utils/game'

class BoardModel{
  board = board1
  currentPlayer = 1

  getPossibleMoves({x,y}) {
    return getPossiblePlayerMoves(this.board, this.currentPlayer)
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
