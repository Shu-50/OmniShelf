
import React, { useState, useEffect } from 'react';
import './Maze.css';

const numRows = 10;
const numCols = 10;

const generateMaze = () => {
  let maze = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => (Math.random() < 0.25 ? 1 : 0))
  );
  maze[0][0] = 0;
  maze[numRows - 1][numCols - 1] = 0;
  return maze;
};

const bfs = (maze, start, end) => {
  let queue = [[start]];
  let visited = new Set();
  visited.add(start.toString());

  while (queue.length) {
    const path = queue.shift();
    const [x, y] = path[path.length - 1];

    if (x === end[0] && y === end[1]) return path;

    const directions = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    for (let [dx, dy] of directions) {
      let nx = x + dx;
      let ny = y + dy;
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < numRows &&
        ny < numCols &&
        maze[nx][ny] === 0 &&
        !visited.has([nx, ny].toString())
      ) {
        visited.add([nx, ny].toString());
        queue.push([...path, [nx, ny]]);
      }
    }
  }
  return null;
};

export default function MazeSolver() {
  const [maze, setMaze] = useState(generateMaze());
  const [player, setPlayer] = useState([0, 0]);
  const [path, setPath] = useState([]);
  const [won, setWon] = useState(false);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);

  const handleKeyDown = (e) => {
    if (won) return;

    const [x, y] = player;
    let newX = x;
    let newY = y;

    if (e.key === 'ArrowUp') newX--;
    if (e.key === 'ArrowDown') newX++;
    if (e.key === 'ArrowLeft') newY--;
    if (e.key === 'ArrowRight') newY++;

    if (
      newX >= 0 &&
      newY >= 0 &&
      newX < numRows &&
      newY < numCols &&
      maze[newX][newY] === 0
    ) {
      if (!started) setStarted(true);
      setPlayer([newX, newY]);
    }
  };

  const solveMaze = () => {
    const solution = bfs(maze, [0, 0], [numRows - 1, numCols - 1]);
    if (solution) setPath(solution);
  };

  const resetMaze = () => {
    setMaze(generateMaze());
    setPlayer([0, 0]);
    setPath([]);
    setWon(false);
    setTime(0);
    setStarted(false);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  useEffect(() => {
    let interval = null;
    if (started && !won) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    } else if (won && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [started, won]);

  useEffect(() => {
    if (player[0] === numRows - 1 && player[1] === numCols - 1) {
      setWon(true);
    }
  }, [player]);

  return (
    <div className="min-h-[85vh] bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-indigo-400 mb-4">Maze Solver</h1>
      <div className="mb-2 flex gap-6 items-center text-lg">
        <p>⏱️ Time: {time}s</p>
        {won && <p className="text-green-400 font-semibold">🎉 You reached the goal!</p>}
      </div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${numCols}, 30px)` }}>
        {maze.map((row, i) =>
          row.map((cell, j) => {
            const isPlayer = i === player[0] && j === player[1];
            const isPath = path.some(([x, y]) => x === i && y === j);
            const isGoal = i === numRows - 1 && j === numCols - 1;

            return (
              <div
                key={`${i}-${j}`}
                className={`w-[30px] h-[30px] border transition-all duration-150
                  ${cell === 1 ? 'bg-black' : ''}
                  ${isGoal ? 'bg-indigo-500' : ''}
                  ${isPath && !isGoal ? 'bg-yellow-400' : ''}
                  ${isPlayer ? 'bg-green-500' : ''}
                `}
              ></div>
            );
          })
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={resetMaze}
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          🔁 New Maze
        </button>
        <button
          onClick={solveMaze}
          className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
        >
          🧠 Solve Maze
        </button>
      </div>
    </div>
  );
}
