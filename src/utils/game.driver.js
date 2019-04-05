import { generateEmptyBoard, setBlockPositinos } from './game'

export function getDefaultBlockPositions(width, height) {
  const defaultBlockPositions = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: height - 1, y: 0 },
    { x: height - 2, y: 0 },
    { x: height - 3, y: 0 },
    { x: height - 4, y: 0 },

    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: height - 1, y: 1 },
    { x: height - 2, y: 1 },

    { x: 4, y: 3 },
    { x: 3, y: 5 },
    { x: 5, y: 5 },

    { x: 0, y: width - 1 },
    { x: 1, y: width - 1 },
    { x: 2, y: width - 1 },
    { x: height - 1, y: width - 1 },
    { x: height - 2, y: width - 1 },
    { x: height - 3, y: width - 1 },

    { x: 0, y: width - 2 },
    { x: height - 1, y: width - 2 },
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
