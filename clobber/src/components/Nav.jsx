import React from 'react';
import { Link } from 'react-router-dom'

function Nav(props) {
  return (
    <>
      <Link to="/hi-score"><button>Leaderboard</button></Link>
      <button onClick={() => props.set(false)}>Instructions</button>
      </>
  )
}

export default Nav