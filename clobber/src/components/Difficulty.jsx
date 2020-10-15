import React from 'react';
import { Link } from 'react-router-dom'

function Difficulty(props) {
  return (
    <div id="difficulty">
      <h1>Difficulty</h1>
      <h3>Please select your difficulty.</h3>
      <Link to="/play"><button onClick={() => props.set(0)}>Easy</button>
      <button onClick={() => props.set(1)}>Medium</button>
      <button disabled={true} onClick={() => props.set(2)}>Hard</button>
      <button disabled={true} onClick={() => props.set(3)}>2-player</button></Link>
    </div>)
}

export default Difficulty