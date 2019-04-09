import {getScores, getPossiblePlayerMoves, move} from '../utils/game'
import {cloneBoard} from '../utils/helpers'

export default function(board, player) {
  const moves = getPossiblePlayerMoves(board, player)
  const maxMove = moves.reduce((max, suggestedMove) => {
    const copiedBoard = cloneBoard(board)
    const potentialBoard = move(
      copiedBoard,
      suggestedMove.origin,
      suggestedMove,
      suggestedMove.distance
    )
    const scores = getScores(potentialBoard)
    if (scores[player]>max.score){
      return {move: suggestedMove, score: scores[player]}
    }
    return max
  },{score:-Infinity})
  return maxMove.move
}
