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
  const [leaderboard, setLeaderboard] = useState(false);
  const [emptyEmpty, setEmptyEmpty] = useState(true);

  return (
    <>
      <header>
        <Nav setAck={setAck} setLeaderboard={setLeaderboard} />
      </header>
      <main>
        <Route path="/">
          <div id="sidebar">
            {leaderboard ? <Leaderboard set={setLeaderboard} /> : null}
            <Instructions ack={ack} setAck={setAck} emptyEmpty={emptyEmpty} />
          </div>
        </Route>
        <Route path="/difficulty">
          <Difficulty set={setDifficulty} />
        </Route>
        <Route path="/play">
          <Game difficulty={difficulty} setEmptyEmpty={setEmptyEmpty} />
        </Route>
      </main>
      <Footer />
    </>
  );
}

export default Home;
