import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

const ChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [gameStatus, setGameStatus] = useState("White's turn");
  const [winner, setWinner] = useState(null);
  const [checkPosition, setCheckPosition] = useState(null);
  const [boardSize, setBoardSize] = useState(600);
  const [moveHistory, setMoveHistory] = useState([]);

  // Calculate board size
  useEffect(() => {
    const calculateSize = () => {
      const size = Math.min(
        window.innerWidth * 0.5,
        window.innerHeight * 0.8,
        800
      );
      setBoardSize(size);
    };

    calculateSize();
    window.addEventListener('resize', calculateSize);
    return () => window.removeEventListener('resize', calculateSize);
  }, []);

  // Reset game
  const resetGame = () => {
    setGame(new Chess());
    setGameStatus("White's turn");
    setWinner(null);
    setCheckPosition(null);
    setMoveHistory([]);
  };

  // Update game status and move history
  useEffect(() => {
    if (game.isCheckmate()) {
      const winnerColor = game.turn() === 'w' ? 'Black' : 'White';
      setGameStatus(`Checkmate! ${winnerColor} wins!`);
      setWinner(winnerColor);
      setCheckPosition(null);
    } else if (game.isDraw()) {
      setGameStatus('Draw! Game ended in stalemate');
      setWinner(null);
      setCheckPosition(null);
    } else if (game.isCheck()) {
      setGameStatus(`Check! ${game.turn() === 'w' ? 'White' : 'Black'} to move`);
      setCheckPosition(findKingPosition());
    } else {
      setGameStatus(`${game.turn() === 'w' ? 'White' : 'Black'} to move`);
      setCheckPosition(null);
    }

    // Update move history
    const history = game.history();
    if (history.length !== moveHistory.length) {
      setMoveHistory(history);
    }
  }, [game, moveHistory.length]);

  const findKingPosition = () => {
    const king = game.turn() === 'w' ? 'k' : 'K';
    const fen = game.fen().split(' ')[0];
    let row = 8;
    let col = 0;
    
    for (const char of fen) {
      if (char === '/') {
        row--;
        col = 0;
      } else if (isNaN(parseInt(char))) {
        col++;
        if (char === king) {
          return String.fromCharCode(97 + col - 1) + row;
        }
      } else {
        col += parseInt(char);
      }
    }
    return null;
  };

  const onDrop = (sourceSquare, targetSquare) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });
      if (move) {
        setGame(new Chess(game.fen()));
        return true;
      }
    } catch (e) {
      console.error("Invalid move", e);
    }
    return false;
  };

  const customSquareStyles = checkPosition ? {
    [checkPosition]: {
      background: 'radial-gradient(circle, #ff0000 36%, transparent 40%)',
      borderRadius: '50%'
    }
  } : {};

  return (
    <div className="min-h-[85vh] bg-black text-white p-4 flex flex-col">
      <div className="flex flex-col lg:flex-row flex-1 gap-4">
        {/* Chessboard - Left Side */}
        <div className="flex-1 flex items-center justify-center">
          <div style={{ width: boardSize, height: boardSize }}>
            <Chessboard 
              position={game.fen()}
              onPieceDrop={onDrop}
              boardWidth={boardSize}
              customSquareStyles={customSquareStyles}
              customBoardStyle={{
                borderRadius: '6px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
              }}
              customDarkSquareStyle={{ backgroundColor: '#779556' }}
              customLightSquareStyle={{ backgroundColor: '#ebecd0' }}
            />
          </div>
        </div>

        {/* Game Info - Right Side */}
        <div className="flex-1 max-w-md bg-gray-900 rounded-xl p-4 md:p-6 flex flex-col">
          <h1 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-amber-400">Chess Game</h1>
          
          {/* Game Status */}
          <div className={`p-2 md:p-3 rounded-lg mb-3 md:mb-4 ${
            winner ? 'bg-green-900/80' : 
            gameStatus.includes('Check') ? 'bg-red-900/80' : 
            'bg-blue-900/80'
          }`}>
            <p className="text-sm md:text-base font-medium">{gameStatus}</p>
            {winner && <p className="text-base md:text-lg font-bold mt-1">{winner} wins!</p>}
          </div>

          {/* Move History - Fixed */}
          <div className="flex-1 overflow-hidden mb-3 md:mb-4">
            <h3 className="text-base md:text-lg font-semibold mb-2 text-amber-400">Move History</h3>
            <div className="bg-gray-800 rounded-lg p-2 md:p-3 h-full overflow-y-auto">
              {moveHistory.length > 0 ? (
                <div className="grid grid-cols-2 gap-1 md:gap-2 text-xs md:text-sm">
                  {moveHistory.map((move, i) => (
                    <div 
                      key={i} 
                      className={`py-0.5 px-1 ${i % 2 === 0 ? 'text-right' : 'text-left'} ${
                        i === moveHistory.length - 1 ? 'bg-gray-700/50 rounded' : ''
                      }`}
                    >
                      {i % 2 === 0 ? `${Math.floor(i/2) + 1}.` : ''} {move}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 py-4 text-sm">No moves yet</p>
              )}
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={resetGame}
            className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold text-sm md:text-base"
          >
            New Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;