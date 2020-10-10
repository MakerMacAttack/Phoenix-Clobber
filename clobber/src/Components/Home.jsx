import React from "react";
import { Route } from 'react-router-dom';
import Nav from "./Nav";
import Instructions from "./Instructions";
import Difficulty from "./Difficulty";
import Game from "./Game";
import Leaderboard from "./Leaderboard";

function Home() {
  return (
    <>
      <header>
      <Nav />
      </header>
      <Instructions />
      <Route path="/difficulty">
        <Difficulty />
      </Route>
      <Route path="/play">
        <Game />
      </Route>
      <Route path="/hi-score">
        <Leaderboard />
      </Route>
    </>
  );
}

export default Home
