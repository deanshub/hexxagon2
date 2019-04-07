import {getPossiblePlayerMoves} from '../utils/game'

export default function randomSelection(board, player) {
  const moves = getPossiblePlayerMoves(board, player)
  const move = moves[Math.floor(Math.random() * moves.length)]
  return move
}
