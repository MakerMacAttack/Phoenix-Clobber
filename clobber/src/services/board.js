import { easyAI } from './ai'

export function createBoard() {
  let newBoard = []
  for (let i = 0; i < 6; i++) { // fix this if I ever want to adjust size
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
  return updatedBoard
}

export function populatePlayerMoves(attacker, defender, prevState) {
  const board = updateBoard(prevState)
  const moves = []
  for (let i = 0; i < 6; i++){
    for (let j = 0; j < 5; j++) {
      if (board[i][j] === attacker) {
        const possibleMoves = []
        if (i > 0) {
          if (board[i - 1][j] === defender) {
            possibleMoves.push([i - 1, j])
          }
        }
        if (i < 5) {
          if (board[i + 1][j] === defender) {
            possibleMoves.push([i + 1, j])
          }
        }
        if (j > 0) {
          if (board[i][j - 1] === defender) {
            possibleMoves.push([i, j - 1])
          }
        }
        if (j < 4) {
          if (board[i][j + 1] === defender) {
            possibleMoves.push([i, j + 1])
          }
        }
        if (possibleMoves.length > 0) {
          moves.push([[i, j], possibleMoves])
        }
      }
    };
  };
  return(moves)
}

export function makeMove(moveArr, set) {
  setTimeout(() => {set(prevState => (
    {...prevState, selected: moveArr[0]}
  ))}, 1000)
  setTimeout(() => {set(prevState => (
    {...prevState, newCaptured: moveArr[1]}
  ))}, 2000)
}

export function checkState(state, id) {
  let contains = false;
  state.forEach(square => {
    if (square[0] === id[0] && square[1] === id[1]) {
      contains = true
    }
  })
  return contains
}

export function computerValidSelection(moves, gameState, setGameState) {
  if (!gameState.player1Turn) {
    if (moves.length > 0) {
      setGameState((prevGameState) => ({
        ...prevGameState,
        valid: moves.map((moves) => moves[0]),
      }));
      const move = easyAI(moves)
      makeMove(move, setGameState);
    } else {
      setGameState((prevGameState) => ({ ...prevGameState, won: true })); // use History to send player to Victory
    }
  }
}

export default {
  createBoard,
  updateBoard,
  populatePlayerMoves,
  makeMove,
  checkState,
  computerValidSelection
}
