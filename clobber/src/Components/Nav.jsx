import React from 'react';
import { Link } from 'react-router-dom'

function Nav(props) {
  return (
    <>
      <h1>Navbar</h1>
      <Link to="/hi-score">Leaderboard</Link>
      <button onClick={() => props.set(false)}>Instructions</button>
      </>
  )
}

export default Nav