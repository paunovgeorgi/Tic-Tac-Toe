
function GameOver({winner, restart}) {
  return (
    <div id="game-over">
        <h2>Game Over!</h2>
        {!winner ? <p>It's a draw!</p> : <p>{winner} won!</p>}
        <p><button onClick={restart}>Restart</button></p>
    </div>
  )
}

export default GameOver