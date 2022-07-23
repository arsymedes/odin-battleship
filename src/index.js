
const Ship = (length) => {
  const hitpoints = Array(length).fill(0)

  function hit(position) {
    hitpoints[position] = 1
  }

  function isSunk() {
    if (hitpoints.includes(0)) return false
    return true
  }

  return {
    length,
    hit,
    isSunk,
  }
}

const Gameboard = (() => {
  

  return {

  }
})()

export { Ship, Gameboard }