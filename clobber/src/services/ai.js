export function easyAI(validMoves) {
  console.log("valid at start of ai: ", validMoves);
  if (validMoves.length > 0) {
    const [piece, moves] = validMoves[Math.floor(Math.random() * validMoves.length)]
    const move = moves[Math.floor(Math.random() * moves.length)]
    console.log("AI attacker: ", piece);
    console.log("AI captures: ", move);
    return [piece, move]
  }
}

export default {
  easyAI
}