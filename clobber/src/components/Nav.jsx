import React from 'react';

function Nav(props) {
  return (
    <>
      <button onClick={() => props.setLeaderboard(prevLeader => !prevLeader)}>Leaderboard</button>
      <button onClick={() => props.setAck(false)}>Instructions</button>
      </>
  )
}

export default Nav