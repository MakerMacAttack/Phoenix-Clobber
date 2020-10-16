import { populatePlayerMoves, checkState } from './board';

export function easyAI(validMoves) {
  if (validMoves.length > 0) {
    const [piece, moves] = validMoves[Math.floor(Math.random() * validMoves.length)]
    const move = moves[Math.floor(Math.random() * moves.length)]
    return [piece, move]
  }
}

export function mediumAI(validMoves, prevState) {
  const spreadMoves = []
  // validMoves is condensed, with moves grouped by pieces moving. We need every individual move.
  validMoves.forEach(move => {
    for (let i = 0; i < move[1].length; i++) {
        spreadMoves.push([move[0], move[1][i]])
      }
  })
  //simulate each move
  //get new empty and captured
  const minOpp = spreadMoves.map(move => {
    let testEmpty = []
    testEmpty = [...prevState.empty, move[0]]
    let testCaptured = []
    if (checkState(prevState.captured, move[1])) {
      testCaptured = prevState.captured.filter((position) => {
        return !(
          position[0] === move[1][0] &&
          position[1] === move[1][1]
        );
      });
    } else {
      testCaptured = [...prevState.captured, move[1]]
    }
    // get a new board
    const fakeState = { empty: testEmpty, captured: testCaptured }
    const testMoves = populatePlayerMoves(1, -1, fakeState) // I'm a little surprised I can fake a state this easily.
    return testMoves.reduce((acc, curr) => acc + curr[1].length, 0)
  })
  // minOpp is now an array of how many moves the opponent will have with any given move.
  // Let's find out what the smallest value of minOpp is.
  // Note: Not sure if it would be possible or easier to get an array with this value assigned to each move.
  let min = 60 // 15 pieces on the board, four directions
  for (let i = 0; i < minOpp.length; i++) {
    if (minOpp[i] < min) {
      min = minOpp[i]
    }
  }
  //Now we have the best value we can get to. But we need an array of all moves that will give us that.
  const bestIndices = []
  minOpp.forEach((number, idx) => {
    if (number === min) {
      bestIndices.push(idx)
    }
  })
  // Now I have the indices of all the best moves.
  const bestMoves = []
  bestIndices.forEach(idx => bestMoves.push(spreadMoves[idx]))
  // This should be an array of moves all of equal goodness by current goodness metrics
  return bestMoves[Math.floor(Math.random() * bestMoves.length)] // And then the standard random mess
}

export default {
  easyAI,
  mediumAI
}