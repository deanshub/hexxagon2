import { BLOCK } from './consts'

export function transpose(a) {
  return Object.keys(a[0]).map(c => a.map(r => r[c]))
}

export function offsetToCube(a) {
  const evenCol = (a.x & 1) === 0
  const x = a.x
  let z
  if (evenCol) {
    z = a.y - (a.x + (a.x & 1)) / 2
  } else {
    z = a.y - (a.x - (a.x & 1)) / 2
  }
  const y = -x - z
  return { x, y, z }
}

export function getSlots(board){
  return board.reduce((res, col, colIndex)=>{
    col.forEach((cell,rowIndex)=>{
      if (cell!==BLOCK){
        res.push({x: rowIndex, y: colIndex})
      }
    })
    return res
  },[])
}

export function cubeDistance(a, b) {
  return (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2
}

export function cloneBoard(board) {
  return board.map(row=>row.slice())
}

export function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
