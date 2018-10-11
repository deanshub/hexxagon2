import {getPossiblePositionMoves, getPossiblePlayerMoves, measureDistance,
  move, getScores} from './game'
import {BLOCK, EMPTY} from './consts'

const sortPositions=(a,b)=>{
  return (a.x-b.x)*1000 + (a.y-b.y)
}

const board1 = [
  [BLOCK, BLOCK, BLOCK, EMPTY, EMPTY, EMPTY, EMPTY],
  [BLOCK, BLOCK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [BLOCK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK],
  [EMPTY, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK, BLOCK],
]

it('checks possiblble moves in an empty board', () => {
  const possibleMoves = [
    {x: 1, y: 2},
    {x: 1, y: 3},
    {x: 0, y: 4},
  ]
  expect(getPossiblePositionMoves(board1, {x:0, y:3})).toEqual(possibleMoves)
})


const board2 = [
  [BLOCK, BLOCK, BLOCK, 1    , EMPTY, EMPTY, 1],
  [BLOCK, BLOCK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [BLOCK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK],
  [EMPTY, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK, BLOCK],
]
it('checks possiblble moves of player 1', () => {
  const possibleMoves = [
    {x: 1, y: 2, distance: 1},
    {x: 1, y: 3, distance: 1},
    {x: 0, y: 4, distance: 1},
    {x: 0, y: 5, distance: 1},
    {x: 1, y: 6, distance: 1},
    {x: 1, y: 5, distance: 1},
    {x: 1, y: 4, distance: 2},
    {x: 2, y: 1, distance: 2},
    {x: 2, y: 2, distance: 2},
    {x: 2, y: 3, distance: 2},
    {x: 2, y: 4, distance: 2},
    {x: 2, y: 5, distance: 2},
    {x: 2, y: 6, distance: 2},
  ].sort(sortPositions)
  expect(getPossiblePlayerMoves(board2, 1).sort(sortPositions)).toEqual(possibleMoves)
})

it('measures the distance between 0,0 and 1,1', () => {
  const start = {x: 0, y: 0}
  const end = {x: 1, y: 1}
  expect(measureDistance(start, end)).toEqual(2)
})

const board3start = [
  [BLOCK, BLOCK, BLOCK, 1    , EMPTY, EMPTY, 1],
  [BLOCK, BLOCK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [BLOCK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK],
  [EMPTY, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK, BLOCK],
]
const board3end1 = [
  [BLOCK, BLOCK, BLOCK, 1    , 1    , EMPTY, 1],
  [BLOCK, BLOCK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [BLOCK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK],
  [EMPTY, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK, BLOCK],
]
it('moves player 1 from 0,3 to 0,4', () => {
  expect(move(board3start, {x:0,y:3}, {x:0,y:4})).toEqual(board3end1)
})

const board3end2 = [
  [BLOCK, BLOCK, BLOCK, EMPTY, EMPTY, 1    , 1],
  [BLOCK, BLOCK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [BLOCK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK],
  [EMPTY, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK, BLOCK],
]
it('moves player 1 from 0,3 to 0,5', () => {
  expect(move(board3start, {x:0,y:3}, {x:0,y:5})).toEqual(board3end2)
})

const board4 = [
  [BLOCK, BLOCK, BLOCK, EMPTY, EMPTY, 1    , 1],
  [BLOCK, BLOCK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [BLOCK, EMPTY, 2, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, 2, EMPTY, EMPTY, EMPTY, BLOCK],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK],
  [2, EMPTY, EMPTY, EMPTY, BLOCK, BLOCK, BLOCK],
]
it('calculates the score of a board', () => {
  expect(getScores(board4)).toEqual({1:2, 2:3})
})
