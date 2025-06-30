import { useState } from "react";
import CryptoJS from "crypto-js";

const TextEncryptor = () => {
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState("");
    const [mode, setMode] = useState("encrypt");

    const handleEncrypt = () => {
        if (!text || !password) return;
        const encrypted = CryptoJS.AES.encrypt(text, password).toString();
        setResult(encrypted);
        setText(""); // Clear text input
        setPassword(""); // Clear password input
    };

    const handleDecrypt = () => {
        if (!text || !password) return;
        try {
            const bytes = CryptoJS.AES.decrypt(text, password);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            if (!decrypted) throw new Error("Invalid Password");
            setResult(decrypted);
        } catch {
            setResult("Invalid Password or Encrypted Text");
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-black text-gray-300 p-6">
            <h1 className="text-4xl font-bold text-red-400 text-center mb-6">🔐 Text Encryptor & Decryptor</h1>

            <div className="w-4/5 max-w-xl bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* Input Text */}
                <textarea
                    rows="4"
                    className="w-full p-3 rounded-md bg-gray-900 text-gray-300 border border-gray-700 focus:outline-none focus:border-red-400"
                    placeholder="Enter text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                {/* Password Input */}
                <input
                    type="password"
                    className="w-full mt-4 p-3 rounded-md bg-gray-900 text-gray-300 border border-gray-700 focus:outline-none focus:border-red-400"
                    placeholder="Enter password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        className={`px-5 py-2 rounded-md transition ${mode === "encrypt" ? "bg-red-500 hover:bg-red-600" : "bg-gray-700"}`}
                        onClick={() => {
                            setMode("encrypt");
                            handleEncrypt();
                        }}
                    >
                        Encrypt
                    </button>
                    <button
                        className={`px-5 py-2 rounded-md transition ${mode === "decrypt" ? "bg-red-500 hover:bg-red-600" : "bg-gray-700"}`}
                        onClick={() => {
                            setMode("decrypt");
                            handleDecrypt();
                        }}
                    >
                        Decrypt
                    </button>
                </div>

                {/* Result Display */}
                {result && (
                    <div className="mt-6 p-4 bg-gray-900 text-gray-300 rounded-md">
                        <p className="text-red-300 font-semibold">{mode === "encrypt" ? "Encrypted Text:" : "Decrypted Text:"}</p>
                        <p className="break-words">{result}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextEncryptor;
