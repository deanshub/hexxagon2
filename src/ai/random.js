import {getPossiblePlayerMoves} from '../utils/game'
import {getRandomItem} from '../utils/helpers'

export default function randomSelection(board, player) {
  const moves = getPossiblePlayerMoves(board, player)
  const move = getRandomItem(moves)
  return move
}
