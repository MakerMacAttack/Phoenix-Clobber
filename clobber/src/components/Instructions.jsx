import React from 'react'
import { Link } from 'react-router-dom'

function Instructions(props) {
  return (
    <div id="rules" style={{display: props.ack ? 'none' : 'box'}}>
      <h1>Instructions</h1>
      <p>The only winning move is not to play. No but seriously the only legal move is to capture. Move your piece adjacent (not diagonal) into a square held by the opponent. This eliminates the opponent piece. You can never enter a blank square or a square you control.</p>
      <p>Winning. The only thing that matters. You win if your opponent starts their turn and has no legal moves. You lose if you start your turn and have no legal moves.</p>
      <Link to="/difficulty"><button onClick={() => (props.set(true))}>I will win or die trying</button></Link>
    </div>
  )
}

export default Instructions