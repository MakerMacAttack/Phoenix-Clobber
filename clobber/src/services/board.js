
export function createBoard() {
  let newBoard = {}
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < columns; j++)
      newBoard[i.toString() + j.toString()] = (j % 2 === i % 2 ? 1 : -1)
  return newBoard
}

export function updateBoard(setBoard) {
  let updatedBoard = createBoard()
  captured.forEach(([i, j]) => updatedBoard[i][j] = updatedBoard[i][j] * -1) // I suppose that somewhere I should filter out captured by empty cuz if a square is empty I don't care if it was ever captured.
  empty.forEach(([i, j]) => updatedBoard[i][j] = 0) // Come back and make these ! and null if I change the math system.
  setBoard(updatedBoard) // find a better way to do this that doesn't need me to pass set.
}

export function populatePlayerMoves(attacker, defender, set, board, setBoard) {
  updateBoard(setBoard)
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
  set(moves)
}

export function easyAI() {
  const [piece, moves] = player2Moves[Math.floor(Math.random() * player2Moves.length)]
  const move = moves[Math.floor(Math.random() * moves.length)]
  return [piece, move]
}

export function makeMove(moveArr) {
  setEmpty([...empty, moveArr[0]])
  setNewCaptured(moveArr[1])
}

export default {
  createBoard,
  updateBoard,
  populatePlayerMoves
}
