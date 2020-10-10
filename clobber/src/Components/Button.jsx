import React from 'react';
import { populatePlayerMoves } from '../services/board';

export default function Button(props) {

  function handleClick() {
    populatePlayerMoves(1, -1, props.setGameState, props.gameState)
    props.setGameState({
      ...props.gameState,
      begun: true
    })
  }

  return <button style={{display: props.begun ? 'none' : null}} onClick={handleClick}>START</button>
}