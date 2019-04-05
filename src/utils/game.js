import { EMPTY, BLOCK } from './consts'

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

export function getPossiblePositionMoves(board, position = {}) {
  const { x, y } = position
  const possibleMoves = []
  // const evenCol = y%2===0
  // if (evenCol) {
  if (isEmpty(board, { x, y: y - 1 })) {
    possibleMoves.push({ x, y: y - 1 })
  }
  if (isEmpty(board, { x: x + 1, y: y - 1 })) {
    possibleMoves.push({ x: x + 1, y: y - 1 })
  }
  if (isEmpty(board, { x: x + 1, y })) {
    possibleMoves.push({ x: x + 1, y })
  }
  if (isEmpty(board, { x, y: y + 1 })) {
    possibleMoves.push({ x, y: y + 1 })
  }
  if (isEmpty(board, { x: x - 1, y })) {
    possibleMoves.push({ x: x - 1, y })
  }
  if (isEmpty(board, { x: x - 1, y: y - 1 })) {
    possibleMoves.push({ x: x - 1, y: y - 1 })
  }
  // } else {
  //
  // }
  return possibleMoves
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

export function getPossiblePlayerMoves(board, player) {
  const playerPositions = getPlayerPostions(board, player)

  const allPossibleMovesSingleStep = playerPositions
    .map(position => getPossiblePositionMoves(board, position))
    .reduce((res, cur) => res.concat(cur), [])
    .map(position => ({ ...position, distance: 1 }))

  return allPossibleMovesSingleStep.reduce((res, cur) => {
    const possibleMoves = getPossiblePositionMoves(board, cur)
    const possibleMoves2Steps = possibleMoves
      .filter(
        move =>
          !res.find(
            position => position.x === move.x && position.y === move.y
          ) &&
          !playerPositions.find(
            position => position.x === move.x && position.y === move.y
          )
      )
      .map(position => ({ ...position, distance: 2 }))
    return res.concat(possibleMoves2Steps)
  }, allPossibleMovesSingleStep)

  // can filter all possible moves so that they won't appear more than once
}

export function measureDistance(a, b) {
  return (
    (Math.abs(a.y - b.y) +
      Math.abs(a.y + a.x - b.y - b.x) +
      Math.abs(a.x - b.x)) /
    2
  )
}

export function move(board, startPosition, endPosition) {
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
