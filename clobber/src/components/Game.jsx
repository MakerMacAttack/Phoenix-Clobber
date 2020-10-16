import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import Square from "./Square";
import Victory from "./Victory";
import Loss from "./Loss";
import boardMethods from "../services/board";

function Game(props) {
  const [gameState, setGameState] = useState({
    player1Turn: true,
    won: false,
    player1Moves: [],
    player2Moves: [],
    // board: boardMethods.createBoard(),
    captured: [],
    empty: [],
    valid: [],
    selected: "",
    threatened: [],
    newCaptured: "",
    difficulty: props.difficulty,
  });

  const history = useHistory();

  const columns = 5;
  const rows = 6;
  const row = [];
  for (let i = 0; i < rows; i++) {
    row.push(i);
  }
  const column = [];
  for (let i = 0; i < columns; i++) {
    column.push(i);
  }

  useEffect(
    () => props.setEmptyEmpty(gameState.empty.length === 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gameState.empty]
  );

  useEffect(() => {
    setGameState((prevGameState) => ({
      ...prevGameState,
      valid: gameState.player1Moves.map((moves) => moves[0]),
    }));
  }, [gameState.player1Moves]);

  useEffect(() => {
    if (gameState.player1Turn) {
      const moves = boardMethods.populatePlayerMoves(1, -1, gameState);
      if (moves.length === 0) {
        history.push("/play/loss");
      }
      setGameState((prevGameState) => ({
        ...prevGameState,
        player1Moves: moves,
      }));
    } else {
      const moves = boardMethods.populatePlayerMoves(-1, 1, gameState);
      if (moves.length === 0) {
        setGameState((prevGameState) => ({ ...prevGameState, won: true }));
        history.push("/play/victory");
      }
      setGameState((prevGameState) => ({
        ...prevGameState,
        player2Moves: moves,
      }));
      boardMethods.computerValidSelection(moves, gameState, setGameState); // and for some reason this isn't working
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.player1Turn]);

  useEffect(() => {
    setGameState((prevGameState) => ({ ...prevGameState, threatened: [] }));
    if (gameState.newCaptured) {
      if (boardMethods.checkState(gameState.captured, gameState.newCaptured)) {
        const newList = gameState.captured.filter((position) => {
          return !(
            position[0] === gameState.newCaptured[0] &&
            position[1] === gameState.newCaptured[1]
          );
        });
        setGameState((prevGameState) => ({
          ...prevGameState,
          captured: newList,
        }));
      } else {
        setGameState((prevGameState) => ({
          ...prevGameState,
          captured: [...prevGameState.captured, prevGameState.newCaptured],
        }));
      }
      setGameState((prevGameState) => ({
        ...prevGameState,
        empty: [...prevGameState.empty, prevGameState.selected],
        selected: "",
        newCaptured: "",
        player1Turn: !prevGameState.player1Turn,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.newCaptured]);

  useEffect(() => {
    if (gameState.selected) {
      const [i, j] = gameState.selected;
      const possibleVictims = [
        [i + 1, j],
        [i - 1, j],
        [i, j - 1],
        [i, j + 1],
      ];
      const threatenedArray = possibleVictims.filter((position) => {
        const attacker = boardMethods.checkState(gameState.captured, position);
        const defender = boardMethods.checkState(
          gameState.captured,
          gameState.selected
        );
        return attacker === defender;
      });
      setGameState((prevGameState) => ({
        ...prevGameState,
        threatened: threatenedArray,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.selected]);

  useEffect(() => {
    const moves = boardMethods.populatePlayerMoves(1, -1, gameState);
    setGameState((prevGameState) => ({
      ...prevGameState,
      player1Moves: moves,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div id="endgame">
        <Route path="/play/victory">
          <Victory
            setGameState={setGameState}
            gameState={gameState}
            diff={gameState.difficulty} // See note in Victory
            setAck={props.setAck}
          />
        </Route>
        <Route path="/play/loss">
          <Loss />
        </Route>
      </div>
      <div id="board">
        {row.map((i) => {
          return (
            <div className="row" key={i}>
              {column.map((j) => {
                const id = [i, j];
                const potential = boardMethods.checkState(gameState.valid, id);
                const siege = boardMethods.checkState(gameState.threatened, id);
                const hostage = boardMethods.checkState(gameState.captured, id);
                const abandonded = boardMethods.checkState(gameState.empty, id);
                return (
                  <Square
                    key={id}
                    id={id}
                    square={i % 2 === j % 2 ? "white" : "black"} //If I change the board values to true and false this could just be, if (board[r][c])
                    piece={i % 2 === j % 2 ? "blue" : "red"} // Is there a way to have one ternary and set square and piece?
                    setGameState={setGameState}
                    gameState={gameState}
                    empty={abandonded}
                    captured={hostage}
                    selected={
                      id[0] === gameState.selected[0] &&
                      id[1] === gameState.selected[1]
                    }
                    valid={potential}
                    threatened={siege}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Game;
