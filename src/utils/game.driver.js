import { generateEmptyBoard, setBlockPositinos } from './game'

export function getDefaultBlockPositions(width, height) {
  const defaultBlockPositions = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 0, y: 2 },
    { x: width - 1, y: height - 3 },
    { x: width - 2, y: height - 2 },
    { x: width - 1, y: height - 2 },
    { x: width - 3, y: height - 1 },
    { x: width - 2, y: height - 1 },
    { x: width - 1, y: height - 1 },
  ]
  return defaultBlockPositions
}

export function generateDefaultBoard(boardWidth, boardHeight) {
  const emptyBoard = generateEmptyBoard(boardWidth, boardHeight)
  return setBlockPositinos(
    emptyBoard,
    getDefaultBlockPositions(boardWidth, boardHeight)
  )
}
