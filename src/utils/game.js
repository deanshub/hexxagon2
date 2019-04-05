import { EMPTY, BLOCK } from './consts'

export function generateEmptyBoard(width, height) {
  return Array(width).fill(Array(height).fill(EMPTY))
}

export function getPossiblePositionMoves(board, position = {}) {
  const { x, y } = position
  const possibleMoves = []
  // const evenCol = y%2===0
  // if (evenCol) {
  if (board[x] && board[x][y - 1] === EMPTY) {
    possibleMoves.push({ x, y: y - 1 })
  }
  if (board[x + 1] && board[x + 1][y - 1] === EMPTY) {
    possibleMoves.push({ x: x + 1, y: y - 1 })
  }
  if (board[x + 1] && board[x + 1][y] === EMPTY) {
    possibleMoves.push({ x: x + 1, y })
  }
  if (board[x] && board[x][y + 1] === EMPTY) {
    possibleMoves.push({ x, y: y + 1 })
  }
  if (board[x - 1] && board[x - 1][y] === EMPTY) {
    possibleMoves.push({ x: x - 1, y })
  }
  if (board[x - 1] && board[x - 1][y - 1] === EMPTY) {
    possibleMoves.push({ x: x - 1, y: y - 1 })
  }
  // } else {
  //
  // }
  return possibleMoves
}

export function getPossiblePlayerMoves(board, player) {
  const playerPositions = board.reduce((res, row, rowIndex) => {
    return row.reduce((res2, col, colIndex) => {
      if (col === player) {
        return [...res2, { x: rowIndex, y: colIndex }]
      }
      return res2
    }, res)
  }, [])

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
