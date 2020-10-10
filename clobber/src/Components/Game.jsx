import React, { useState, useEffect } from 'react';
import Square from './Square'

function Game(prop) {
  const [player1Turn, setPlayer1Turn] = useState(true)
  const [won, setWon] = useState(false)
  const [player1Moves, setPlayer1Moves] = useState([])
  const [player2Moves, setPlayer2Moves] = useState([])
  const [board, setBoard] = useState({})
  const [captured, setCaptured] = useState([])
  const [empty, setEmpty] = useState([])
  const [valid, setValid] = useState([])
  const [selected, setSelected] = useState('')
  const [threatened, setThreatened] = useState([])
  const [newCaptured, setNewCaptured] = useState('')

  const columns = 5
  const rows = 6
  const row = []
  for (let i = 0; i < rows; i++) {
    row.push(i)
  }
  const column = []
  for (let i = 0; i < columns; i++) {
    column.push(i)
  }

  function createBoard() {
    let newBoard = {}
    for (let i = 0; i < rows; i++)
      for (let j = 0; j < columns; j++)
        newBoard[i.toString() + j.toString()] = (j % 2 === i % 2 ? 1 : -1)
    return newBoard
  }

  function updateBoard() {
    let updatedBoard = createBoard()
    captured.map(position => updatedBoard[position] = updatedBoard[position] * -1) // I suppose that somewhere I should filter out captured by empty cuz if a square is empty I don't care if it was ever captured.
    empty.map(space => updatedBoard[space] = 0) // use forEach
    setBoard(updatedBoard)
  }

  function populatePlayerMoves(a, b, set) {
    updateBoard()
    const moves = []
    for (const piece in board) {
      if (board[piece] === a) {
        const possibleMoves = []
        const [r, c] = piece // Is there a way to get back an array of the four adjacent r cs, and pass them to a single function?
        const i = parseInt(r)
        const j = parseInt(c)
        if (board[(i - 1).toString() + c] === b) {
          possibleMoves.push((i - 1).toString() + c)
        }
        if (board[(i + 1).toString() + c] === b) {
          possibleMoves.push((i + 1).toString() + c)
        }
        if (board[r + (j - 1).toString()] === b) {
          possibleMoves.push(r + (j - 1).toString())
        }
        if (board[r + (j + 1).toString()] === b) {
          possibleMoves.push(r + (j + 1).toString())
        }
        if (possibleMoves.length > 0) {
          moves.push([piece, possibleMoves])
        }
      }
    }
    set(moves)
  }

  function easyAI() {
    const [piece, moves] = player2Moves[Math.floor(Math.random() * player2Moves.length)]
    const move = moves[Math.floor(Math.random() * moves.length)]
    return [piece, move]
  }

  function makeMove(moveArr) {
    setEmpty([...empty, moveArr[0]])
    setNewCaptured(moveArr[1])
  }

  useEffect(() => {
    setBoard(createBoard)
  }, [])

  return <h1>Game here</h1>
}

export default Game
