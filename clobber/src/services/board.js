
export function createBoard() {
  let newBoard = {}
  for (let i = 0; i < 6; i++) // fix this if you ever want to adjust size
    for (let j = 0; j < 5; j++)
      newBoard[i.toString() + j.toString()] = (j % 2 === i % 2 ? 1 : -1)
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
  board.forEach((row, i) => {
    row.forEach((square, j) => {
      if (square === attacker) {
        const possibleMoves = []
        if (board[i - 1][j] === defender) {
          possibleMoves.push([i - 1, j])
        }
        if (board[i + 1][j] === defender) {
          possibleMoves.push([i + 1, j])
        }
        if (row[j - 1] === defender) {
          possibleMoves.push([i, j - 1])
        }
        if (row[j + 1] === defender) {
          possibleMoves.push([i, j + 1])
        }
        if (possibleMoves.length > 0) {
          moves.push([[i, j], possibleMoves])
        }
      }
    });
  });
  // }
  if (attacker === 1) {
    set({
      ...prevState,
      player1Moves: moves
    })
  } else {
    set({
      ...prevState,
      player2Moves: moves
    })
  }
  return(board)
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
  populatePlayerMoves
}
