import {getScores, getPossiblePlayerMoves} from '../utils/game'

export default function predict(board, player) {
  const scores = getScores(board)
  // scores[player]
  getPossiblePlayerMoves(board, player)
}

export function train() {
}

export function createModel() {
}

// const model = createModel()
// train(model)
