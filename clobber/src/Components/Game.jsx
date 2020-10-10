import React, { useState, useEffect } from 'react';
import Square from './Square'
import boardMethods from '../services/board'
import ai from '../services/ai'

function Game(prop) {
  const [gameState, setGameState] = useState({
    player1Turn: true,
    won: false,
    player1Moves: [],
    player2Moves: [],
    board: boardMethods.createBoard(),
    captured: [],
    empty: [],
    valid: [],
    selected: '',
    threatened: [],
    newCaptured: ''
  })
  // const [player1Turn, setPlayer1Turn] = useState(true)
  // const [won, setWon] = useState(false) // Still need to handle victory
  // const [player1Moves, setPlayer1Moves] = useState([])
  // const [player2Moves, setPlayer2Moves] = useState([])
  // const [board, setBoard] = useState([]) // it's possible I don't need the board at this scope, only in board.js
  // const [captured, setCaptured] = useState([])
  // const [empty, setEmpty] = useState([])
  // const [valid, setValid] = useState([])
  // const [selected, setSelected] = useState('')
  // const [threatened, setThreatened] = useState([])
  // const [newCaptured, setNewCaptured] = useState('')

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
    setGameState({
      ...gameState,
      board: boardMethods.createBoard()
    })
  }, [])

  useEffect(() => {
    if (gameState.player1Moves.length === 0) {
      setGameState({
        ...gameState,
        won: true
      })
    }
    setGameState({
      ...gameState,
      valid: gameState.player1Moves.map(moves => moves[0])
    })
  }
    , [gameState.player1Moves])

  useEffect(() => {
    setGameState({
      ...gameState,
      valid: gameState.player2Moves.map(moves => moves[0])
    })
    boardMethods.makeMove(ai.easyAI(gameState.valid), setGameState, gameState)
  }, [gameState.player2Moves])

  useEffect(() => {
    if (gameState.player1Turn) {
      // setBoard
      setGameState({
        ...gameState,
        board: boardMethods.populatePlayerMoves(1, -1, setGameState, gameState)
      })
    } else {
      // setBoard
      setGameState({
        ...gameState,
        board: boardMethods.populatePlayerMoves(-1, 1, setGameState, gameState)
      })
      setGameState({
        ...gameState,
        player1Turn: true
      })
    }
  }, [gameState.player1Turn])

  // A move has a Selected and a Captured. First the captured square is properly sorted into captured.
  // Then the Selected square is added to empty. Then both are cleared for the next move.
  useEffect(() => {
    setGameState({
      ...gameState,
      threatened: []
    })
    if (gameState.newCaptured) {
      if (gameState.captured.includes(gameState.newCaptured)) {
        const newList = gameState.captured.filter(position => position !== gameState.newCaptured)
        setGameState({
          ...gameState,
          captured: newList
        })
      } else {
        setGameState({
          ...gameState,
          captured: [...gameState.captured, gameState.newCaptured]
        })
      }
      setGameState({
        ...gameState,
        empty: [...gameState.empty, gameState.selected],
        selected: '',
        newCaptured: '' // This would be slightly simpler if I could get the dependency to only trigger when something is in NewCaptured.
      })
    }
  }, [gameState.newCaptured])

  useEffect(() => {
    if (gameState.selected) {
      const [i, j] = gameState.selected
      const possibleVictims = [[i + 1, j], [i - 1, j], [i, j - 1], [i, j + 1]]
      const threatenedArray = possibleVictims.filter(position => {
        return gameState.captured.includes(position) === gameState.captured.includes(gameState.selected)
      })
      setGameState({
        ...gameState,
        threatened: threatenedArray
      })
    }
  }, [gameState.selected])

  useEffect(() => {
    setGameState({
      ...gameState,
      board: boardMethods.populatePlayerMoves(1, -1, setGameState, gameState)
    })
  }, [])

  // for when I need it
  

  //remember that populate now returns the board so set it

  return (
    <div className="board">
      {row.map(i => {
        return (
          <div className="row" key={i}>
            {column.map(j => {
              const id = [i, j]
              return (
                <Square
                  key={id}
                  id={id}
                  square={(i % 2 === j % 2) ? "white" : "black"}//If I change the board values to true and false this could just be, if (board[r][c])
                  piece={(i % 2 === j % 2) ? "blue" : "red"} // Is there a way to have one ternary and set square and piece?
                  setGameState={setGameState}
                  empty={gameState.empty.includes(id)}
                  captured={gameState.captured.includes(id)}
                  selected={id === gameState.selected}
                  valid={gameState.valid.includes(id)}
                  threatened={gameState.threatened.includes(id)}
                />)
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Game
