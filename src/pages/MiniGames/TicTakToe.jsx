import React, { useState } from "react";

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);

  const checkWinner = (squares) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinningLine(combo);
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";

    const win = checkWinner(newBoard);
    if (win) setWinner(win);

    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  const renderCell = (index) => (
    <div
      key={index}
      className="w-24 h-24 md:w-32 md:h-32 border-2 border-blue-500 flex items-center justify-center text-3xl md:text-5xl font-bold cursor-pointer hover:bg-blue-200 transition"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </div>
  );

  const isDraw = !winner && board.every(cell => cell !== null);

  const renderWinLine = () => {
    if (!winningLine) return null;

    const classMap = {
      "0,1,2": "top-[16.1%] left-0 w-full h-1",
      "3,4,5": "top-[50%] left-0 w-full h-1",
      "6,7,8": "top-[83.6%] left-0 w-full h-1",
      "0,3,6": "top-0 left-[16.1%] h-full w-1",
      "1,4,7": "top-0 left-[50%] h-full w-1",
      "2,5,8": "top-0 left-[83.6%] h-full w-1",
      "0,4,8": "top-1/2 left-1/2 w-[140%] h-1 rotate-45 origin-center",
      "2,4,6": "top-1/2 left-1/2 w-[140%] h-1 -rotate-45 origin-center",
    };

    const key = winningLine.join(",");
    const style = classMap[key];

    return (
      <div
        className={`absolute bg-green-600 ${style}`}
        style={{ zIndex: 10 }}
      />
    );
  };

  return (
    <div className="min-h-[85vh] bg-black text-blue-400 flex flex-col items-center justify-center p-6 relative">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Tic-Tac-Toe</h1>

      <div className="relative grid grid-cols-3 gap-1">
        {board.map((_, idx) => renderCell(idx))}
        {renderWinLine()}
      </div>

      <div className="mt-6 text-xl md:text-2xl text-center">
        {winner ? (
          <p>🎉 Player <span className="text-white font-bold">{winner}</span> Wins!</p>
        ) : isDraw ? (
          <p>🤝 It's a Draw!</p>
        ) : (
          <p>Next Turn: <span className="text-white font-bold">{xIsNext ? "X" : "O"}</span></p>
        )}
      </div>

      <button
        onClick={handleReset}
        className="mt-4 px-6 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 font-semibold"
      >
        🔁 Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;
