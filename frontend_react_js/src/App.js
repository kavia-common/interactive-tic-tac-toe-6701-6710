import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function Square({ value, onClick, className }) {
  return (
    <button 
      className={`square ${className}`} 
      onClick={onClick}
      aria-label={value ? `Square with ${value}` : 'Empty square'}
    >
      {value}
    </button>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const getStatus = () => {
    if (winner) {
      return <div className="status winner">{`Winner: ${winner}`}</div>;
    } else if (isDraw) {
      return <div className="status">Game Draw!</div>;
    } else {
      return <div className="status">{`Next player: ${xIsNext ? 'X' : 'O'}`}</div>;
    }
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const renderSquare = (i) => {
    const value = squares[i];
    const className = value === 'X' ? 'x' : value === 'O' ? 'o' : '';
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => handleClick(i)}
        className={className}
      />
    );
  };

  return (
    <div className="App">
      <h1 className="game-title">Tic Tac Toe</h1>
      {getStatus()}
      <div className="board">
        {Array(9).fill(null).map((_, i) => renderSquare(i))}
      </div>
      <button className="restart-button" onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
}

export default App;
