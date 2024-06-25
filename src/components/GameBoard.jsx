import {useState} from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard() {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    const [symbol, setSymbol] = useState('X');

    const handleSelectSquare = (rowIndex, colIndex) => {
        setGameBoard((previousGameBoard) => {
            const updatedBoard = [...previousGameBoard.map((innerArray) => [...innerArray])];
            updatedBoard[rowIndex][colIndex] = 'X';
            return updatedBoard;
        });
    }

    return (
      <ol id="game-board">
          {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
              <ol>
                  {row.map((playerSymbol, colIndex) => {
                      return <li key={colIndex}>
                    <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>
                        {playerSymbol}
                      </button>
                      </li>
                  })}
              </ol>
          </li>)}
      </ol>
    );
}