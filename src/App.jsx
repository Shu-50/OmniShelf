
import { useState } from "react";
import { FaChess,FaQrcode, FaCloud, FaLanguage, FaMusic, FaCalculator, FaGlobe, FaFileAlt, FaMicrophone, FaSmile, FaGamepad, FaFileCode, FaHeadphones, FaLock,FaYoutube, FaKeyboard, FaQuoteRight } from "react-icons/fa";
import { GiBrain,GiMaze, GiTicTacToe } from "react-icons/gi";


import QRCode from "./pages/QRCode";
import WeatherForecast from "./pages/WeatherForecaster";
import TextTranslator from "./pages/TextTranslator";
import SpotifyDownloader from "./pages/SpotifyDownloader";
import UnitConverter from "./pages/UnitConverter";
import CurrencyConverter from "./pages/CurrencyConverter";
import Maze from "./pages/MiniGames/Maze";
// import FileConverter from "./pages/FileConverter";
import SpeechToText from "./pages/SpeechToText";
import Jokes from "./pages/Jokes";
import SudokuGame from "./pages/MiniGames/SudokuGame";
import ArticleSummarizer from "./pages/ArticleSummarizer";
import TextEncrypter from "./pages/TextEncrypter";
import TextToSpeech from "./pages/TextToSpeech";
import MemoryGame from "./pages/MiniGames/MemoryGame";
import Tying from "./pages/MiniGames/Typingspeedtest";
import TicTacToe from "./pages/MiniGames/TicTakToe";
// import YouTube from "./pages/MiniGames/ChessGame";
import ChessGame from "./pages/MiniGames/ChessGame";

const apps = [
  { name: "QR Code", icon: <FaQrcode />, component: <QRCode /> },
  { name: "Weather", icon: <FaCloud />, component: <WeatherForecast /> },
  { name: "Translate", icon: <FaLanguage />, component: <TextTranslator /> },
  { name: "Music Downloader", icon: <FaMusic />, component: <SpotifyDownloader /> },
  { name: "Unit Converter", icon: <FaCalculator />, component: <UnitConverter /> },
  { name: "Currency Converter", icon: <FaGlobe />, component: <CurrencyConverter /> },
  { name: "Maze Runner", icon: <GiMaze />, component: <Maze /> },
  { name: "Speech to Text", icon: <FaMicrophone />, component: <SpeechToText /> },
  { name: "Jokes", icon: <FaSmile />, component: <Jokes /> },
  { name: "MemoryGame", icon: <GiBrain />, component: <MemoryGame /> },
  { name: "Sudoku", icon: <FaGamepad />, component: <SudokuGame /> },
  { name: "Article Summarizer", icon: <FaFileCode />, component: <ArticleSummarizer /> },

  { name: "Text Encrypter", icon: <FaLock />, component: <TextEncrypter /> },
  { name: "Text to Speech", icon: <FaHeadphones />, component: <TextToSpeech /> },
  { name: "TypingTest", icon: <FaKeyboard />, component: <Tying /> },
  { name: "TicTacToe", icon: <GiTicTacToe />, component: <TicTacToe /> },

  { name: "Chess", icon: <FaChess />, component: <ChessGame /> },
];

export default function App() {
  const [activeApp, setActiveApp] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      {activeApp ? (
        <div className="w-full p-4 bg-white shadow-lg rounded-lg">
          <button onClick={() => setActiveApp(null)} className="mb-4 text-blue-500">Back</button>
          {activeApp}
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5  ">
          {apps.map((app, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform  p-5"
              onClick={() => setActiveApp(app.component)}
            >
              <div className="text-4xl p-4 bg-white rounded-xl shadow-md">{app.icon}</div>
              <p className="mt-2 text-sm font-medium text-gray-700">{app.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}