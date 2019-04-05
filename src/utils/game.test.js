import {
  getPossiblePositionMoves,
  getPossiblePlayerMoves,
  measureDistance,
  move,
  getScores,
  setValuesInBoard,
  iSetValueInBoard,
  setValueInBoard,
} from './game'
import { generateDefaultBoard } from './game.driver'
import { BLOCK, EMPTY } from './consts'

const PLAYER1 = 1
const PLAYER2 = 2
const sortPositions = (a, b) => {
  const distanceDiff = (a.distance - b.distance) * 1000 || 0
  return distanceDiff + (a.x - b.x) * 100 + (a.y - b.y)
}

let defaultBoard
beforeEach(() => {
  defaultBoard = generateDefaultBoard(7, 7)
})

it('checks default board', () => {
  const board = [
    [BLOCK, BLOCK, BLOCK, EMPTY, EMPTY, EMPTY, EMPTY],
    [BLOCK, BLOCK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [BLOCK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK],
    [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK],
    [EMPTY, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK, BLOCK],
  ]
  expect(defaultBoard).toEqual(board)
})

it('checks possiblble moves in an empty board', () => {
  const possibleMoves = [{ x: 1, y: 2 }, { x: 1, y: 3 }, { x: 0, y: 4 }]
  expect(getPossiblePositionMoves(defaultBoard, { x: 0, y: 3 })).toEqual(
    possibleMoves
  )
})

it('checks possiblble moves of player 1', () => {
  const possibleMoves = [
    { x: 0, y: 4, distance: 1 },
    { x: 0, y: 5, distance: 1 },
    { x: 1, y: 2, distance: 1 },
    { x: 1, y: 3, distance: 1 },
    { x: 1, y: 5, distance: 1 },
    { x: 1, y: 6, distance: 1 },

    { x: 1, y: 4, distance: 2 },
    { x: 2, y: 1, distance: 2 },
    { x: 2, y: 2, distance: 2 },
    { x: 2, y: 3, distance: 2 },
    { x: 2, y: 4, distance: 2 },
    { x: 2, y: 5, distance: 2 },
    { x: 2, y: 6, distance: 2 },
  ].sort(sortPositions)
  const p1Postions = [{ x: 0, y: 3 }, { x: 0, y: 6 }]
  const board2 = setValuesInBoard(defaultBoard, p1Postions, PLAYER1)
  expect(getPossiblePlayerMoves(board2, PLAYER1).sort(sortPositions)).toEqual(
    possibleMoves
  )
})

it('measures the distance between 0,0 and 1,1', () => {
  const start = { x: 0, y: 0 }
  const end = { x: 1, y: 1 }
  expect(measureDistance(start, end)).toEqual(2)
})

it('moves player 1 from 0,3 to 0,4', () => {
  const p1Postions = [{ x: 3, y: 0 }, { x: 6, y: 0 }]
  const board3start = setValuesInBoard(defaultBoard, p1Postions, PLAYER1)
  const board3end1 = iSetValueInBoard(board3start, { x: 4, y: 0 }, PLAYER1)

  expect(move(board3start, { x: 0, y: 3 }, { x: 0, y: 4 })).toEqual(board3end1)
})

it('moves player 1 from 0,3 to 0,5', () => {
  const p1Postions = [{ x: 3, y: 0 }, { x: 6, y: 0 }]
  const board3start = setValuesInBoard(defaultBoard, p1Postions, PLAYER1)
  let board3end2 = iSetValueInBoard(board3start, p1Postions[0], EMPTY)
  board3end2 = setValueInBoard(board3start, { x: 5, y: 0 }, PLAYER1)
  expect(move(board3start, { x: 3, y: 0 }, { x: 5, y: 0 })).toEqual(board3end2)
})

it('calculates the score of a board', () => {
  const p1Postions = [{ x: 5, y: 0 }, { x: 6, y: 0 }]
  const p2Postions = [{ x: 2, y: 2 }, { x: 2, y: 4 }, { x: 0, y: 6 }]
  let board4 = setValuesInBoard(defaultBoard, p1Postions, PLAYER1)
  board4 = setValuesInBoard(board4, p2Postions, PLAYER2)
  expect(getScores(board4)).toEqual({ 1: 2, 2: 3 })
})
