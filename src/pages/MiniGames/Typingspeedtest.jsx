
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import paragraphData from "./paragraphs.json"

const TypingSpeedTest = () => {
  const [paragraph, setParagraph] = useState('');
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef(null);

  

  const fetchParagraph = () => {
    const allParagraphs = paragraphData.paragraphs;
    const randomIndex = Math.floor(Math.random() * allParagraphs.length);
    setParagraph(allParagraphs[randomIndex]);
  };
  
  
  

  useEffect(() => {
    fetchParagraph();
  }, []);

  useEffect(() => {
    if (started && !finished && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && !finished) finishTest();
  }, [started, timeLeft]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (!started) setStarted(true);
    setInput(val);

    let mistakeCount = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== paragraph[i]) mistakeCount++;
    }
    setMistakes(mistakeCount);

    if (val === paragraph) finishTest();
  };

  const finishTest = () => {
    const words = input.trim().split(/\s+/).length;
    const correctChars = input.split('').filter((c, i) => c === paragraph[i]).length;
    const acc = Math.round((correctChars / paragraph.length) * 100);
    const wpmVal = Math.round((words / (60 - timeLeft)) * 60) || 0;

    setAccuracy(acc);
    setWpm(wpmVal);
    setFinished(true);
    saveToLeaderboard(wpmVal, acc);
  };

  const saveToLeaderboard = (wpm, accuracy) => {
    const scores = JSON.parse(localStorage.getItem("typingLeaderboard")) || [];
    scores.push({ wpm, accuracy, date: new Date().toLocaleString() });
    const sorted = scores.sort((a, b) => b.wpm - a.wpm).slice(0, 5);
    localStorage.setItem("typingLeaderboard", JSON.stringify(sorted));
  };

  const getLeaderboard = () => {
    return JSON.parse(localStorage.getItem("typingLeaderboard")) || [];
  };

  const resetTest = () => {
    setInput('');
    setStarted(false);
    setFinished(false);
    setMistakes(0);
    setTimeLeft(60);
    setWpm(0);
    setAccuracy(100);
    fetchParagraph();
    inputRef.current.focus();
  };

  return (
    <div className="min-h-[85vh] bg-black text-yellow-400 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl bg-gray-900 rounded-lg p-6 shadow space-y-6">
        <h1 className="text-3xl font-bold text-center">Typing Speed Test</h1>

        {/* Display Paragraph */}
        <div className="bg-black border border-yellow-500 rounded p-4 font-mono leading-relaxed text-wrap break-words">
          {paragraph.split('').map((char, idx) => {
            const typedChar = input[idx];
            const isTyped = idx < input.length;
            const isCorrect = typedChar === char;

            return (
              <span key={idx} className={
                isTyped
                  ? isCorrect
                    ? "opacity-30"
                    : "bg-red-600 text-white"
                  : ""
              }>
                {char}
              </span>
            );
          })}
        </div>

        {/* Typing Box */}
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          disabled={finished}
          className="w-full p-3 rounded bg-black border border-yellow-500 text-yellow-300 focus:outline-none"
          rows={4}
          placeholder="Start typing here..."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-lg">
          <div>⏱ Time Left: <span className="text-white">{timeLeft}s</span></div>
          <div>📝 WPM: <span className="text-white">{wpm}</span></div>
          <div>✅ Accuracy: <span className="text-white">{accuracy}%</span></div>
          <div>❌ Mistakes: <span className="text-white">{mistakes}</span></div>
        </div>

        {/* Completion Message */}
        {finished && (
          <div className="text-center text-green-400 text-xl font-semibold">
            🎉 Typing Complete!
          </div>
        )}

        {/* Reset Button */}
        <div className="flex justify-center mt-4">
          <button onClick={resetTest} className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-2 rounded font-bold">
            🔁 Reset
          </button>
        </div>

        {/* Leaderboard */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2 text-white">🏆 Leaderboard</h2>
          <ul className="space-y-1">
            {getLeaderboard().map((item, idx) => (
              <li key={idx} className="text-sm border-b border-yellow-500 pb-1">
                {idx + 1}. WPM: <span className="text-white">{item.wpm}</span> | Accuracy: <span className="text-white">{item.accuracy}%</span> | {item.date}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TypingSpeedTest;
