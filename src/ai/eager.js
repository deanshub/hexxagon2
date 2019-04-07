import {getScores, getPossiblePlayerMoves, move} from '../utils/game'

export default function(board, player) {
  const moves = getPossiblePlayerMoves(board, player)
  const maxMove = moves.reduce((max, suggestedMove) => {
    const copiedBoard = board.map(row=>row.slice())
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
