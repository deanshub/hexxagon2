import { EMPTY, BLOCK } from './consts'
import { offsetToCube, cubeDistance } from './helpers'

export function generateEmptyBoard(width, height) {
  return Array.from(Array(height)).map(_ => Array(width).fill(EMPTY))
}

export function iSetValueInBoard(board, { x, y }, value) {
  return setValueInBoard(board.slice(), { x, y }, value)
}
export function setValueInBoard(board, { x, y }, value) {
  board[y][x] = value
  return board
}

export function iSetValuesInBoard(board, positions = [], value) {
  const newBoard = board.map(line => line.slice())
  return setValuesInBoard(newBoard, (positions = []), value)
}
export function setValuesInBoard(board, positions = [], value) {
  return positions.reduce((curBoard, position) => {
    return setValueInBoard(curBoard, position, value)
  }, board)
}

export function setBlockPositinos(board, positions = []) {
  return setValuesInBoard(board, positions, BLOCK)
}

function isEmpty(board, { x, y }) {
  return board[y] && board[y][x] === EMPTY
}

function getNeighborsOffset(colIndex, distance) {
  const evenCol = (colIndex & 1) === 0

  if (distance === 1 && !evenCol) {
    return [[+1, 0], [+1, -1], [0, -1], [-1, -1], [-1, 0], [0, +1]]
  } else if (distance === 1 && evenCol) {
    return [[+1, +1], [+1, 0], [0, -1], [-1, 0], [-1, +1], [0, +1]]
  } else if (distance === 2 && evenCol) {
    return [
      [0, -2],
      [-1, -1],
      [-2, -1],
      [-2, 0],
      [-2, +1],
      [-1, +2],
      [0, +2],
      [+1, +2],
      [+2, +1],
      [+2, 0],
      [+2, -1],
      [+1, -1],
    ]
  } else if (distance === 2 && !evenCol) {
    return [
      [0, -2],
      [-1, -2],
      [-2, -1],
      [-2, 0],
      [-2, +1],
      [-1, +1],
      [0, +2],
      [+1, +1],
      [+2, +1],
      [+2, 0],
      [+2, -1],
      [+1, -2],
    ]
  } else {
    throw new Error('not implemnted yet')
  }
}

export function getPossiblePositionMoves(board, position = {}, distance = 1) {
  const { x, y } = position
  const neighbors = getNeighborsOffset(x, distance)

  return neighbors.reduce((possibleMoves, [rowOffset, colOffset]) => {
    const neighborPosition = { x: x + rowOffset, y: y + colOffset }
    if (isEmpty(board, neighborPosition)) {
      return [...possibleMoves, neighborPosition]
    }
    return possibleMoves
  }, [])
}

export function getPlayerPostions(board, player) {
  return board.reduce((res, row, rowIndex) => {
    return row.reduce((res2, col, colIndex) => {
      if (col === player) {
        return [...res2, { x: colIndex, y: rowIndex }]
      }
      return res2
    }, res)
  }, [])
}

export function getPossibleMovesByPositions(board, positions) {
  const allPossibleMovesSingleStep = positions
    .map(position => getPossiblePositionMoves(board, position))
    .reduce((res, cur) => res.concat(cur), [])
    .map(position => ({ ...position, distance: 1 }))

  const allPossibleMovesDoubleStep = positions
    .map(position => getPossiblePositionMoves(board, position, 2))
    .reduce((res, cur) => res.concat(cur), [])
    .filter(
      doubleMove =>
        !allPossibleMovesSingleStep.find(
          singleMove =>
            singleMove.x === doubleMove.x && singleMove.y === doubleMove.y
        )
    )
    .map(position => ({ ...position, distance: 2 }))

  // can filter all possible moves so that they won't appear more than once
  return allPossibleMovesSingleStep.concat(allPossibleMovesDoubleStep)
}

export function getPossiblePlayerMoves(board, player) {
  const playerPositions = getPlayerPostions(board, player)
  return getPossibleMovesByPositions(board, playerPositions)
}

export function measureDistance(a, b) {
  const ac = offsetToCube(a)
  const bc = offsetToCube(b)
  return cubeDistance(ac, bc)
}

export function move(board, startPosition, endPosition, distance) {
  // const distance = measureDistance(startPosition, endPosition)
  const player = board[startPosition.y][startPosition.x]
  setValueInBoard(board, endPosition, player)
  if (distance === 2) {
    setValueInBoard(board, startPosition, EMPTY)
  } else if (distance > 2) {
    throw new Error('illeagal move')
  }
  return board
}
export function iMove(board, startPosition, endPosition) {
  const distance = measureDistance(startPosition, endPosition)

  if (distance === 1) {
    const player = board[startPosition.x][startPosition.y]
    return board.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        if (endPosition.x === rowIndex && endPosition.y === colIndex) {
          return player
        }
        return col
      })
    })
  } else if (distance === 2) {
    const player = board[startPosition.x][startPosition.y]
    return board.map((row, rowIndex) => {
      return row.map((col, colIndex) => {
        if (startPosition.x === rowIndex && startPosition.y === colIndex) {
          return EMPTY
        } else if (endPosition.x === rowIndex && endPosition.y === colIndex) {
          return player
        }
        return col
      })
    })
  }
  return board
}

export function getScores(board) {
  return board.reduce((res, row) => {
    const newRes = { ...res }
    row.forEach(col => {
      if (col !== EMPTY && col !== BLOCK) {
        newRes[col] = newRes[col] + 1 || 1
      }
    })
    return newRes
  }, {})
}
