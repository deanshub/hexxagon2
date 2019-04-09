import {
  getScores,
  move as takeAction,
  getPossiblePlayerMoves,
} from '../utils/game'
import { cloneBoard, getSlots, getRandomItem } from '../utils/helpers'
import eagerSelection from './eager'
import randomSelection from './random'
import defaultBoard from '../utils/board1'

export default function predict(board, player) {
  const scores = getScores(board)
  // scores[player]
  getPossiblePlayerMoves(board, player)
}

export function train() {}

export function createModel() {}

// const model = createModel()
// train(model)

function nextPlayer(currentPlayer) {
  if (currentPlayer + 1 > 2) {
    return 1
  }
  return currentPlayer + 1
}

export function generateEagerGame() {
  const board = cloneBoard(defaultBoard)
  const moves = []

  let player = 1
  let move = eagerSelection(board, player)
  while (move) {
    takeAction(board, move.origin, move, move.distance)
    moves.push(move)
    player = nextPlayer(player)
    move = eagerSelection(board, player)
  }
  return { moves, board }
}

export function generateRandomGame() {
  const board = cloneBoard(defaultBoard)
  const moves = []

  let player = 1
  let move = randomSelection(board, player)
  while (move) {
    takeAction(board, move.origin, move, move.distance)
    moves.push(move)
    player = nextPlayer(player)
    move = randomSelection(board, player)
  }
  return { moves, board }
}

export function generateInitialPopulation(
  gamesCount,
  minimumScore,
  player = 1
) {
  const memory = []
  for (var i = 0; i < gamesCount; i++) {
    const game = generateRandomGame()
    if (getScores(game.board)[player] > minimumScore) {
      memory.push(game)
    }
  }
  return memory
}

// state (board), current player, possible moves
