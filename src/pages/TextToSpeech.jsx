import { useState } from "react";

const TextToSpeech = () => {
    const [text, setText] = useState("");
    const [speech, setSpeech] = useState(null);

    const handleSpeak = () => {
        if (!text) return;
        const newSpeech = new SpeechSynthesisUtterance(text);
        newSpeech.lang = "en-US";
        window.speechSynthesis.speak(newSpeech);
        setSpeech(newSpeech);
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
    };

    const handleRepeat = () => {
        if (speech) {
            window.speechSynthesis.speak(speech);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-900 text-gray-300 p-4">
            <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-purple-500 text-center mb-6">
                    Text-to-Speech Converter
                </h1>
                <textarea
                    className="w-full p-3 rounded-md bg-gray-900 text-gray-300 border border-gray-700 focus:outline-none focus:border-purple-500"
                    placeholder="Enter text to convert to speech..."
                    rows="4"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={handleSpeak}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
                    >
                        Speak
                    </button>
                    <button
                        onClick={handleStop}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
                    >
                        Stop
                    </button>
                    <button
                        onClick={handleRepeat}
                        className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-md transition"
                    >
                        Repeat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextToSpeech;
