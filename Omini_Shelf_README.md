# 🧰 Omini Shelf

**Omini Shelf** is a modern, responsive all-in-one toolkit web app built with **React.js** and **Tailwind CSS**. It provides a suite of utility tools, productivity enhancers, and fun games — all under one sleek interface with zero login required.

## 🚀 Features & Tools

| 🛠️ Tool              | ⚙️ Description |
|-----------------------|---------------|
| **QR Code Generator** | Generates shareable QR codes from text or URLs. |
| **Weather Forecaster** | Real-time weather and 24-hour forecast using OpenWeather API. |
| **Text Translator**   | Multi-language translation powered by LibreTranslate API. |
| **Spotify Downloader**| Download Spotify tracks via URL using RapidAPI. |
| **Unit Converter**    | Convert between length, weight, and temperature. |
| **Currency Converter**| Live currency conversion with country names and sorting. |
| **Speech to Text**    | Real-time transcription using Web Speech API. |
| **Text to Speech**    | Reads out loud typed text with voice options. |
| **Text Encrypter / Decrypter** | Password-based message encryption and decryption. |
| **Article Summarizer**| Summarizes long content into brief summaries. |
| **Joke Generator**    | Displays random programming or general jokes. |
| **File Converter**    | Converts documents (DOCX, TXT, PNG, etc.) to PDF and others (drag & drop support). |
| **Maze Solver**       | Navigate through a maze; includes goal, timer, and winning alert. |
| **Typing Speed Test** | Real-time typing test with WPM, accuracy, and local leaderboard. |
| **Memory Game**       | Match-pair game for 1–6 players with score and color tags. |
| **Sudoku Game**       | Classic Sudoku with hints, mistake detection, difficulty levels, and scoring. |
| **Tic Tac Toe**       | X/O game with winner strike line, draw detection, and responsive board. |
| **Chess Game**        | Full chess board using chess.js with move validation. |

## 💻 Tech Stack

- **React.js**
- **Tailwind CSS**
- **Axios** for API calls
- **Web APIs**: Web Speech, Speech Recognition, `window.speechSynthesis`
- **LocalStorage** (Leaderboard, history)
- **APIs Used**:
  - OpenWeatherMap API
  - LibreTranslate API
  - Spotify Downloader via RapidAPI
  - QRCode.react
  - REST Countries API
  - Random Joke API
  - Chess.js + react-chessboard

## 📦 Installation

```bash
git clone https://github.com/your-username/omini-shelf.git
cd omini-shelf
npm install
npm start
```

## 📁 Project Structure

```
src/
├── pages/
│   ├── QRCode.jsx
│   ├── WeatherForecaster.jsx
│   ├── TextTranslator.jsx
│   ├── SpotifyDownloader.jsx
│   ├── UnitConverter.jsx
│   ├── CurrencyConverter.jsx
│   ├── FileConverter.jsx
│   ├── ArticleSummarizer.jsx
│   ├── TextEncrypter.jsx
│   ├── SpeechToText.jsx
│   ├── TextToSpeech.jsx
│   ├── Jokes.jsx
│   ├── MiniGames/
│   │   ├── SudokuGame.jsx
│   │   ├── Typingspeedtest.jsx
│   │   ├── TicTakToe.jsx
│   │   ├── MemoryGame.jsx
│   │   ├── Maze.jsx
│   │   └── ChessGame.jsx
```

## 🧠 Inspiration

This project was created to avoid jumping across multiple websites for basic tools. The goal was to unify all useful utilities and mini-games into one responsive platform that’s intuitive and fun to use.

## 📜 License

MIT © 2025 — [Your Name]