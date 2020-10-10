
export function createBoard() {
  let newBoard = []
  for (let i = 0; i < 6; i++) { // fix this if you ever want to adjust size
    const row = []
    for (let j = 0; j < 5; j++){
      const square = (j % 2 === i % 2 ? 1 : -1)
      row.push(square)
    }
    newBoard.push(row)
  } 
  return newBoard
}

export function updateBoard(prev) {
  let updatedBoard = createBoard()
  prev.captured.forEach(([i, j]) => updatedBoard[i][j] = updatedBoard[i][j] * -1) // I suppose that somewhere I should filter out captured by empty cuz if a square is empty I don't care if it was ever captured.
  prev.empty.forEach(([i, j]) => updatedBoard[i][j] = 0) // Come back and make these ! and null if I change the math system.
  return updatedBoard // find a better way to do this that doesn't need me to pass set.
}

export function populatePlayerMoves(attacker, defender, set, prevState) {
  const board = updateBoard(prevState)
  const moves = []
  for (let i = 0; i < 6; i++){
    for (let j = 0; j < 5; j++) {
      if (board[i][j] === attacker) {
        const possibleMoves = []
        if (i > 0) {
          if (board[i - 1][j] === defender) {
            possibleMoves.push([i - 1, j])
            // console.log(possibleMoves);
          }
        }
        if (i < 5) {
          if (board[i + 1][j] === defender) {
            possibleMoves.push([i + 1, j])
            // console.log("check down");
          }
        }
        if (j > 0) {
          if (board[i][j - 1] === defender) {
            possibleMoves.push([i, j - 1])
            // console.log("check left");
          }
        }
        if (j < 4) {
          if (board[i][j + 1] === defender) {
            possibleMoves.push([i, j + 1])
            // console.log("check right");
          }
        }
        if (possibleMoves.length > 0) {
          // console.log(i, j, possibleMoves)
          moves.push([[i, j], possibleMoves])
          // console.log(moves);
        }
      }
    };
  };
  // if (attacker === 1) {
  //   // console.log(moves);
  //   set({
  //     ...prevState,
  //     player1Moves: moves
  //   })
  //   console.log(prevState.player1Moves);
  // } else {
  //   set({
  //     ...prevState,
  //     player2Moves: moves
  //   })
  // }
  return(moves)
}

export function makeMove(moveArr, set, prev) {
  set({
    ...prev,
    empty: [...prev.empty, moveArr[0]],
    newCaptured: moveArr[1]
  })
}

export default {
  createBoard,
  updateBoard,
  populatePlayerMoves,
  makeMove
}
