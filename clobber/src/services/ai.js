export function easyAI(validMoves) {
  if (validMoves.length > 0){
  const [piece, moves] = validMoves[Math.floor(Math.random() * validMoves.length)]
  const move = moves[Math.floor(Math.random() * moves.length)]
return [piece, move]}
}

export default {
  easyAI
}