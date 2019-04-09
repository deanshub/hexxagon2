import {
  generateEagerGame,
  generateRandomGame,
  generateInitialPopulation,
} from './dqLearning'
import { getScores } from '../utils/game'

it('should generate random game', () => {
  const game1 = generateRandomGame()
  const game2 = generateRandomGame()
  expect(game1.moves.length).not.toEqual(game2.moves.length)
})

it('should generate eager game', () => {
  const game = generateEagerGame()
  expect(game.moves.length).toEqual(68)
  expect(getScores(game.board)).toEqual({ 1: 26, 2: 32 })
})

it('should generate games which p1 has more then score 30', () => {
  const gamesCount = 100
  const minimumScore = 30
  const player = 1
  const games = generateInitialPopulation(gamesCount, minimumScore, player)
  expect(games.length).toBeGreaterThan(2)
  games.forEach(game => {
    expect(getScores(game.board)[player]).toBeGreaterThan(minimumScore)
  })
})
