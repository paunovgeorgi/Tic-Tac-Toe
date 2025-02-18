import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  currentPlayer = (gameTurns.length > 0 && gameTurns[0].player === 'X') ? 'O' : 'X';
  return currentPlayer;
}

function App() {

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  for(const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = firstSquareSymbol;
    }
  }

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((currPlayer) => currPlayer === 'X' ? 'O' : 'X')



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
    {winner ? <p>You won, {winner}!</p> :
    <GameBoard 
      onSelectSquare={handleSelectSquare}
      board={gameBoard}
    /> 
    }
    </div>
    <Log turns={gameTurns}/>
   </main>
  )
}

export default App
