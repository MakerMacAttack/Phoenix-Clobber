export function easyAI(validMoves) {
  const [piece, moves] = validMoves[Math.floor(Math.random() * player2Moves.length)]
  const move = moves[Math.floor(Math.random() * moves.length)]
return [piece, move]
}

export default {
  easyAI
}