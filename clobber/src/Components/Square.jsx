import React from 'react';

function Square(prop) {

  function handleClick() {
    if (prop.threatened) {
      prop.setGameState({
        ...prop.gameState,
        newCaptured: prop.id,
        player1Turn: false
      })
    } else if (prop.valid) {
      prop.setGameState({
        ...prop.gameState,
        selected: prop.id
    })
    }
  }

  return (
    <div className={prop.square}>
      <div
        // This in general is hideous and should be cleaned up
        className={`${prop.piece} ${prop.threatened ? "threatened" : ""} ${prop.empty ? "empty" : ""} ${prop.captured ? "captured" : ""}`}
        id={`${prop.selected ? "selected" : ""}`}
        onClick={handleClick}></div>
    </div>
  )
}

export default Square
