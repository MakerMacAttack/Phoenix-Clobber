import React, { useState } from "react";
import { Route } from 'react-router-dom';
import Nav from "./Nav";
import Instructions from "./Instructions";
import Difficulty from "./Difficulty";
import Game from "./Game";
import Leaderboard from "./Leaderboard";

function Home() {
  const [ack, setAck] = useState(false)
  const [difficulty, setDifficulty] = useState(null)

  return (
    <>
      <header>
        <Nav set={setAck}/>
      </header>
      <Instructions ack={ack} set={setAck}/>
      <Route path="/difficulty">
        <Difficulty set={setDifficulty}/>
      </Route>
      <Route path="/play">
        <Game difficulty={difficulty}/>
      </Route>
      <Route path="/hi-score">
        <Leaderboard />
      </Route>
    </>
  );
}

export default Home
