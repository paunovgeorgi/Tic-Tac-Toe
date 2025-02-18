import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  currentPlayer = (gameTurns.length > 0 && gameTurns[0].player === 'X') ? 'O' : 'X';
  return currentPlayer;
}

function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((currPlayer) => currPlayer === 'X' ? 'O' : 'X')

   const activePlayer = deriveActivePlayer(gameTurns);

    setGameTurns(prevTurns => {
      
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [ {square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns]

      return updatedTurns;
    })
  }

  return (
   <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name='Player 1' symbol='X' isActive={activePlayer === 'X'}/>
        <Player name='Player 2' symbol='O' isActive={activePlayer === 'O'}/>
       
      </ol>
    <GameBoard 
      onSelectSquare={handleSelectSquare}
      turns={gameTurns}/> 
    </div>
    <Log turns={gameTurns}/>
   </main>
  )
}

export default App
