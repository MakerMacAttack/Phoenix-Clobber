import React from 'react';

function Square(prop) {

  function handleClick() {
    if (prop.threatened) {
      prop.setnewCaptured(prop.id)
      prop.setPlayer1Turn(false)
    } else if (prop.valid) {
      prop.setSelected(prop.id)
    }
  }

  return (
    <div className={prop.square}>
      <div
        // This in general is hideous and should be cleaned up
        className={`${prop.piece} ${prop.threatened ? "threatened" : ""} ${prop.empty ? "empty" : ""} ${prop.captured ? "captured" : ""}`}
        onClick={handleClick}></div>
    </div>
  )
}

export default Square
