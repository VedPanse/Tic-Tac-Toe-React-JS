import {useState} from "react";

import Player from './components/Player.jsx'
import GameBoard from "./components/GameBoard.jsx";
import Log from './components/Log.jsx';
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const deriveActivePlayer = (gameTurns) => {
    let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }

    return currentPlayer;
}

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]


function App() {
    const [players, setPlayers] = useState({
        'X': 'Player 1',
        'O': 'Player 2'
    });
    const [gameTurns, setGameTurns] = useState([]);
    let winner;

    const activePlayer = deriveActivePlayer(gameTurns);

    let gameBoard = [...initialGameBoard.map(arr => [...arr])];

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }

    for (const combination of WINNING_COMBINATIONS) {
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    }

    const hasDraw = gameTurns.length === 9 && !winner;

    const handleSelectSquare = (rowIndex, colIndex) => {
        setGameTurns(prevTurns => {
            const currentPlayer = deriveActivePlayer(prevTurns);

            return [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
        });
    }

    const handleRematch = () => {
        setGameTurns([]);
    }

    const handlePlayerNameChange = (symbol, newName) => {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            }
        })
    }

    return (<main>
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} onSave={handlePlayerNameChange} />
                <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} onSave={handlePlayerNameChange} />
            </ol>
            {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
            <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} board={gameBoard}/>
        </div>

        <Log turns={gameTurns}/>
    </main>)
}

export default App;
