
import { useState, useEffect } from "react";
import { FaQuestion } from "react-icons/fa";

// Define player colors
const playerColors = ["#ff5733", "#33ff57", "#3357ff", "#ff33a8", "#a833ff", "#ffff33"];

// List of all possible card images
const allCardImages = ["🍎", "🍌", "🍇", "🍉", "🥕", "🌽", "🍕", "🍔", "🍩", "🍪", "🍓", "🥑", "🥥", "🍍", "🌶️", "🧀"];

const generateCards = (numPairs) => {
    const selectedImages = allCardImages.slice(0, numPairs);
    const shuffled = [...selectedImages, ...selectedImages] // Duplicate to create pairs
        .sort(() => Math.random() - 0.5) // Shuffle cards
        .map((item, index) => ({ id: index, value: item, flipped: false, matched: false }));
    return shuffled;
};

const MemoryGame = () => {
    const [numPlayers, setNumPlayers] = useState(2); // Default 2 players
    const [currentPlayer, setCurrentPlayer] = useState(0); // Active player
    const [scores, setScores] = useState(Array(6).fill(0)); // Player scores
    const [numPairs, setNumPairs] = useState(16 / 2); // Default 16 cards (8 pairs)
    const [cards, setCards] = useState(generateCards(numPairs));
    const [selectedCards, setSelectedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        setCurrentPlayer(Math.floor(Math.random() * numPlayers)); // Select random player
    }, [numPlayers]);

    useEffect(() => {
        if (selectedCards.length === 2) {
            const [first, second] = selectedCards;
            if (first.value === second.value) {
                setCards((prevCards) =>
                    prevCards.map((card) =>
                        card.value === first.value ? { ...card, matched: true } : card
                    )
                );
                setScores((prevScores) => {
                    const newScores = [...prevScores];
                    newScores[currentPlayer] += 1; // Increase score for current player
                    return newScores;
                });
            } else {
                setTimeout(() => {
                    setCards((prevCards) =>
                        prevCards.map((card) =>
                            card.id === first.id || card.id === second.id
                                ? { ...card, flipped: false }
                                : card
                        )
                    );
                }, 800);
                setCurrentPlayer((currentPlayer + 1) % numPlayers); // Change turn
            }
            setMoves(moves + 1);
            setSelectedCards([]);
        }
    }, [selectedCards]);

    useEffect(() => {
        if (cards.every((card) => card.matched)) {
            setGameOver(true);
        }
    }, [cards]);

    const handleCardClick = (id) => {
        if (selectedCards.length < 2) {
            setCards((prevCards) =>
                prevCards.map((card) =>
                    card.id === id ? { ...card, flipped: true } : card
                )
            );
            setSelectedCards([...selectedCards, cards.find((card) => card.id === id)]);
        }
    };

    const restartGame = () => {
        setCards(generateCards(numPairs));
        setSelectedCards([]);
        setMoves(0);
        setGameOver(false);
        setScores(Array(6).fill(0)); // Reset scores
        setCurrentPlayer(Math.floor(Math.random() * numPlayers)); // Random first player
    };

    
    return (
        <div className="flex min-h-[85vh] bg-black text-white">
            {/* Left Section - Game Settings */}
            <div className="w-2/5 p-6 bg-gray-900">
                <h1 className="text-3xl font-bold mb-4 text-indigo-400">🃏 Memory Card Game</h1>

                {/* Player Selection */}
                <div className="mb-4">
                    <label className="text-lg">Players:</label>
                    <select
                        value={numPlayers}
                        onChange={(e) => setNumPlayers(Number(e.target.value))}
                        className="bg-gray-800 text-white p-2 rounded w-full"
                    >
                        {[...Array(6)].map((_, i) => (
                            <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                </div>

                {/* Number of Cards Selection */}
                <div className="mb-4">
                    <label className="text-lg">Number of Cards:</label>
                    <select
                        value={numPairs * 2}
                        onChange={(e) => setNumPairs(Number(e.target.value) / 2)}
                        className="bg-gray-800 text-white p-2 rounded w-full"
                    >
                        {[16, 20, 24, 28, 30, 32].map((count) => (
                            <option key={count} value={count}>{count}</option>
                        ))}
                    </select>
                </div>

                {/* Restart Button */}
                <button
                    onClick={restartGame}
                    className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 w-full"
                >
                    Restart Game
                </button>
            </div>

            {/* Right Section - Game Board & Scores */}
            <div className="w-3/5 flex flex-col items-center justify-center">
                {/* Player Scores */}
                <div className="flex gap-4 mb-6">
                    {Array.from({ length: numPlayers }).map((_, i) => (
                        <div
                            key={i}
                            className={`p-2 rounded text-lg font-bold ${
                                currentPlayer === i ? "border-2 border-white" : ""
                            }`}
                            style={{ backgroundColor: playerColors[i] }}
                        >
                            Player {i + 1}: {scores[i]}
                        </div>
                    ))}
                </div>

                {/* Game Board */}
                <div
                    className="grid grid-cols-8 gap-4 p-4 rounded-lg"
                    style={{ backgroundColor: playerColors[currentPlayer] }}
                >
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            onClick={() => !card.flipped && !card.matched && handleCardClick(card.id)}
                            className={`w-16 h-20 flex justify-center items-center text-2xl font-bold border-2 rounded-md 
                            cursor-pointer transition-all duration-300 
                            ${card.flipped || card.matched ? "bg-white text-black" : "bg-gray-700"}`}
                        >
                            {card.flipped || card.matched ? card.value : <FaQuestion />}
                        </div>
                    ))}
                </div>

                {/* Moves Counter */}
                <p className="text-lg mt-4">Moves: {moves}</p>
                {gameOver && <p className="text-green-400 text-2xl font-bold">🎉 Game Over! 🎉</p>}
            </div>
        </div>
    );
};

export default MemoryGame;
