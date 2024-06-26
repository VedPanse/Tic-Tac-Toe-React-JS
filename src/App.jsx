import {useState} from "react";

import Player from './components/Player.jsx'
import GameBoard from "./components/GameBoard.jsx";
import Log from './components/Log.jsx';

const deriveActivePlayer = (gameTurns) => {
    let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }

    return currentPlayer;
}

function App() {
    // const [activePlayer, setActivePlayer] = useState('X');
    const [gameTurns, setGameTurns] = useState([]);

    const activePlayer = deriveActivePlayer(gameTurns);

    const handleSelectSquare = (rowIndex, colIndex) => {
        setGameTurns(prevTurns => {
            const currentPlayer = deriveActivePlayer(prevTurns);

            return [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
        });
    }

    return (<main>
        <div id="game-container">
            <ol id="players" className="highlight-player">
                <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}/>
                <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}/>
            </ol>
            <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
        </div>

        <Log turns={gameTurns}/>
    </main>)
}

export default App;
