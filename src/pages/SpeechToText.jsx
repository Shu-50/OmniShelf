import { useState, useRef } from "react";

const SpeechToText = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    const handleStartListening = () => {
        if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US"; // Set language
        recognition.continuous = true; // Keep listening until stopped
        recognition.interimResults = true; // Show words as they are spoken

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event) => {
            let finalTranscript = "";
            for (let i = 0; i < event.results.length; i++) {
                finalTranscript += event.results[i][0].transcript + " ";
            }
            setText(finalTranscript.trim());
        };

        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
        recognition.start();
    };

    const handleStopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-900 text-gray-300 p-4">
            <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-purple-700 text-center mb-6">
                    Speech-to-Text Converter
                </h1>
                <textarea
                    className="w-full p-3 rounded-md bg-gray-900 text-gray-300 border border-gray-700 focus:outline-none focus:border-purple-700"
                    placeholder="Speech will appear here..."
                    rows="4"
                    value={text}
                    readOnly
                />
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={handleStartListening}
                        className={`w-full ${isListening ? "bg-purple-800" : "bg-purple-700 hover:bg-purple-800"
                            } text-white py-2 rounded-md transition`}
                        disabled={isListening}
                    >
                        {isListening ? "Listening..." : "Start Listening"}
                    </button>
                    <button
                        onClick={handleStopListening}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition"
                        disabled={!isListening}
                    >
                        Stop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpeechToText;
