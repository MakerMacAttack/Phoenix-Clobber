import React, { useState } from "react";
import { Route } from "react-router-dom";
import Difficulty from "./Difficulty";
import Footer from "./Footer";
import Game from "./Game";
import Instructions from "./Instructions";
import Leaderboard from "./Leaderboard";
import Nav from "./Nav";

function Home() {
  const [ack, setAck] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [leaderboard, setLeaderboard] = useState(false)

  return (
    <>
      <header>
        <Nav set={setAck} setLeaderboard={setLeaderboard} />
      </header>
        {leaderboard ? <Leaderboard set={setLeaderboard} /> : null}
      <Instructions ack={ack} set={setAck} />
      <Route path="/difficulty">
        <Difficulty set={setDifficulty} />
      </Route>
      <Route path="/play">
        <Game difficulty={difficulty} />
      </Route>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Home;
