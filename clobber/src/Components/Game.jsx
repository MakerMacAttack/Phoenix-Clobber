import React, { useState, useEffect } from 'react';
import Square from './Square'
import boardMethods from '../services/board'
import ai from '../services/ai'

function Game(prop) {
  const [player1Turn, setPlayer1Turn] = useState(true)
  const [won, setWon] = useState(false)
  const [player1Moves, setPlayer1Moves] = useState([])
  const [player2Moves, setPlayer2Moves] = useState([])
  const [board, setBoard] = useState([])
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

  useEffect(() => {
    setBoard(boardMethods.createBoard)
  }, [])

  useEffect(() => {
    setValid(player1Moves.map(moves => moves[0]))
    if (player1Moves.length === 0) {
      setWon()
    }
  }
    , [player1Moves])

  // for when I need it
  ai.easyAI(validMoves)

  return <h1>Game here</h1>
}

export default Game
