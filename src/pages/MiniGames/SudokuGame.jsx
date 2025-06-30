

// import { useState, useEffect } from "react";
// import Sudoku from "sudoku";

// const difficulties = {
//     easy: 40,
//     medium: 30,
//     hard: 20,
// };

// const SudokuGame = () => {
//     const [grid, setGrid] = useState([]);
//     const [originalGrid, setOriginalGrid] = useState([]);
//     const [selectedNumber, setSelectedNumber] = useState(null);
//     const [usedNumbers, setUsedNumbers] = useState({});
//     const [timer, setTimer] = useState(0);
//     const [isTimerRunning, setIsTimerRunning] = useState(false);
//     const [difficulty, setDifficulty] = useState("medium");
//     const [mistakes, setMistakes] = useState(new Set());

//     useEffect(() => {
//         generatePuzzle();
//     }, [difficulty]);

//     useEffect(() => {
//         let interval;
//         if (isTimerRunning) {
//             interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
//         }
//         return () => clearInterval(interval);
//     }, [isTimerRunning]);

//     const generatePuzzle = () => {
//         const fullSolution = Sudoku.makepuzzle();
//         const puzzle = fullSolution.map((val, index) => (Math.random() * 100 < difficulties[difficulty] ? null : val));
//         setOriginalGrid(puzzle);
//         setGrid(puzzle.map((val) => (val === null ? "" : val + 1)));
//         setUsedNumbers({});
//         setMistakes(new Set());
//         setTimer(0);
//         setIsTimerRunning(false);
//     };

//     const handleCellClick = (row, col) => {
//         if (!isTimerRunning) setIsTimerRunning(true);
//         if (originalGrid[row * 9 + col] !== null || selectedNumber === null) return;

//         const newGrid = [...grid];
//         newGrid[row * 9 + col] = selectedNumber;

//         // Check if it's a mistake
//         const newMistakes = new Set(mistakes);
//         if (!isValidMove(row, col, selectedNumber)) {
//             newMistakes.add(`${row}-${col}`);
//         } else {
//             newMistakes.delete(`${row}-${col}`);
//         }

//         setGrid(newGrid);
//         setMistakes(newMistakes);
//         updateUsedNumbers();
//     };

//     const updateUsedNumbers = () => {
//         const count = {};
//         grid.forEach((num) => {
//             if (num) count[num] = (count[num] || 0) + 1;
//         });
//         setUsedNumbers(count);
//     };

//     const isValidMove = (row, col, num) => {
//         for (let i = 0; i < 9; i++) {
//             if (grid[row * 9 + i] === num || grid[i * 9 + col] === num) return false;
//         }
//         return true;
//     };

//     const solvePuzzle = () => {
//         setGrid(Sudoku.solvepuzzle(originalGrid).map((n) => n + 1));
//         setMistakes(new Set());
//     };

//     const formatTime = () => {
//         const minutes = Math.floor(timer / 60);
//         const seconds = timer % 60;
//         return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//     };

//     return (
//         <div className="flex flex-col items-center min-h-screen bg-black text-indigo-400 p-6">
//             <h1 className="text-3xl font-bold mb-4">Sudoku Game</h1>

//             {/* Timer */}
//             <div className="text-lg bg-gray-800 p-2 rounded-md mb-4">⏳ Time: {formatTime()}</div>

//             {/* Difficulty Selector */}
//             <div className="mb-4">
//                 <label className="text-white mr-2">Difficulty:</label>
//                 <select
//                     value={difficulty}
//                     onChange={(e) => setDifficulty(e.target.value)}
//                     className="bg-gray-700 text-white p-2 rounded-md"
//                 >
//                     <option value="easy">Easy</option>
//                     <option value="medium">Medium</option>
//                     <option value="hard">Hard</option>
//                 </select>
//             </div>

//             {/* Number Selector */}
//             <div className="grid grid-cols-9 gap-2 mb-4">
//                 {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
//                     <button
//                         key={num}
//                         onClick={() => setSelectedNumber(num)}
//                         className={`w-10 h-10 text-center text-lg font-bold border-2 rounded-md 
//                         ${selectedNumber === num ? "bg-indigo-500 text-white" : "bg-gray-700"} 
//                         ${usedNumbers[num] >= 9 ? "opacity-50 cursor-not-allowed" : ""}`}
//                         disabled={usedNumbers[num] >= 9}
//                     >
//                         {num} {usedNumbers[num] >= 9 && "✔"}
//                     </button>
//                 ))}
//             </div>

//             {/* Sudoku Board */}
//             <div className="grid grid-cols-9 gap-1 border-4 border-indigo-500 p-2">
//                 {grid.map((num, i) => {
//                     const row = Math.floor(i / 9);
//                     const col = i % 9;
//                     const isOriginal = originalGrid[i] !== null;
//                     const isMistake = mistakes.has(`${row}-${col}`);

//                     return (
//                         <div
//                             key={i}
//                             onClick={() => handleCellClick(row, col)}
//                             className={`w-10 h-10 flex justify-center items-center text-lg font-bold border-2 
//                             ${isOriginal ? "bg-gray-700 text-gray-300" : "cursor-pointer border-green-500"}
//                             ${isMistake ? "bg-red-500 text-white" : ""}
//                         `}
//                         >
//                             {num}
//                         </div>
//                     );
//                 })}
//             </div>

//             {/* Solve Button */}
//             <button
//                 onClick={solvePuzzle}
//                 className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
//             >
//                 Solve
//             </button>
//         </div>
//     );
// };

// export default SudokuGame;

import { useState, useEffect } from "react";
import Sudoku from "sudoku";

const difficulties = {
    easy: 40,
    medium: 30,
    hard: 20,
};

const SudokuGame = () => {
    const [grid, setGrid] = useState([]);
    const [originalGrid, setOriginalGrid] = useState([]);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [usedNumbers, setUsedNumbers] = useState({});
    const [timer, setTimer] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [difficulty, setDifficulty] = useState("medium");
    const [mistakes, setMistakes] = useState(new Set());
    const [score, setScore] = useState(0);
    const maxTime = 600; // 10 minutes max time for bonus

    useEffect(() => {
        generatePuzzle();
    }, [difficulty]);

    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    const generatePuzzle = () => {
        const fullSolution = Sudoku.makepuzzle();
        const puzzle = fullSolution.map((val, index) => (Math.random() * 100 < difficulties[difficulty] ? null : val));
        setOriginalGrid(puzzle);
        setGrid(puzzle.map((val) => (val === null ? "" : val + 1)));
        setUsedNumbers({});
        setMistakes(new Set());
        setTimer(0);
        setIsTimerRunning(false);
        setScore(0); // Reset score on new game
    };

    const handleCellClick = (row, col) => {
        if (!isTimerRunning) setIsTimerRunning(true);
        if (originalGrid[row * 9 + col] !== null || selectedNumber === null) return;

        const newGrid = [...grid];
        newGrid[row * 9 + col] = selectedNumber;

        // Check if it's a mistake
        const newMistakes = new Set(mistakes);
        if (!isValidMove(row, col, selectedNumber)) {
            newMistakes.add(`${row}-${col}`);
            setScore((prev) => prev - 5); // Deduct points for mistakes
        } else {
            newMistakes.delete(`${row}-${col}`);
            setScore((prev) => prev + 10); // Add points for correct move
        }

        setGrid(newGrid);
        setMistakes(newMistakes);
        updateUsedNumbers();
    };

    const updateUsedNumbers = () => {
        const count = {};
        grid.forEach((num) => {
            if (num) count[num] = (count[num] || 0) + 1;
        });
        setUsedNumbers(count);
    };

    const isValidMove = (row, col, num) => {
        for (let i = 0; i < 9; i++) {
            if (grid[row * 9 + i] === num || grid[i * 9 + col] === num) return false;
        }
        return true;
    };

    const solvePuzzle = () => {
        setGrid(Sudoku.solvepuzzle(originalGrid).map((n) => n + 1));
        setMistakes(new Set());
        setScore(score + 50); // Bonus for solving the puzzle
        setIsTimerRunning(false);
    };

    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const calculateTimeBonus = () => {
        return Math.max(0, (maxTime - timer) / 10);
    };

    return (
        <div className="flex flex-wrap justify-evenly items-center min-h-[80vh] bg-black text-indigo-400 p-6 ">
            {/* <div className="flex flex-wrap justify-evenly items-center"> */}
            <div>
                <h1 className="text-3xl font-bold mb-3">Sudoku Game</h1>



                {/* Timer & Score */}
                <div className="flex gap-8 text-lg bg-gray-800 p-2 rounded-md mb-2">
                    <div>⏳ Time: {formatTime()}</div>
                    <div>🎯 Score: {score + calculateTimeBonus()}</div>
                </div>

                {/* Difficulty Selector */}
                <div className="mb-4">
                    <label className="text-white mr-2">Difficulty:</label>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="bg-gray-700 text-white p-2 rounded-md"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    {/* Solve Button */}
                    <button
                        onClick={solvePuzzle}
                        className="mt-4 px-4 py-2 ml-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                    >
                        Solve
                    </button>
                </div>
            </div>
            <div>

                {/* Number Selector */}
                <div className="grid grid-cols-9 gap-2 mb-4">
                    {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                        <button
                            key={num}
                            onClick={() => setSelectedNumber(num)}
                            className={`w-10 h-10 text-center text-lg font-bold border-2 rounded-md 
                        ${selectedNumber === num ? "bg-indigo-500 text-white" : "bg-gray-700"} 
                        ${usedNumbers[num] >= 9 ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={usedNumbers[num] >= 9}
                        >
                            {num} {usedNumbers[num] >= 9 && "✔"}
                        </button>
                    ))}
                </div>

                {/* Sudoku Board */}
                <div className="grid grid-cols-9 gap-1 border-4 border-indigo-500 p-2">
                    {grid.map((num, i) => {
                        const row = Math.floor(i / 9);
                        const col = i % 9;
                        const isOriginal = originalGrid[i] !== null;
                        const isMistake = mistakes.has(`${row}-${col}`);

                        return (
                            <div
                                key={i}
                                onClick={() => handleCellClick(row, col)}
                                className={`w-10 h-10 flex justify-center items-center text-lg font-bold border-2 
                            ${isOriginal ? "bg-gray-700 text-gray-300" : "cursor-pointer border-green-500"}
                            ${isMistake ? "bg-red-500 text-white" : ""}
                            `}
                            >
                                {num}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>

        // </div>
    );
};

export default SudokuGame;
