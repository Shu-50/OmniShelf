import { useState } from "react";

const languages = {
    en: "English",
    hi: "Hindi",
    fr: "French",
    es: "Spanish",
    de: "German",
    zh: "Chinese",
    ja: "Japanese",
    ru: "Russian",
    ar: "Arabic",
    it: "Italian",
    pt: "Portuguese",
};

const TextTranslator = () => {
    const [text, setText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [sourceLang, setSourceLang] = useState("en"); // Default: English
    const [targetLang, setTargetLang] = useState("hi"); // Default: Hindi
    const [loading, setLoading] = useState(false);

    const handleTranslate = async () => {
        if (!text) return;

        setLoading(true);
        try {
            const response = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
            );
            const data = await response.json();
            setTranslatedText(data.responseData.translatedText || "Translation failed.");
        } catch (error) {
            setTranslatedText("Error in translation.");
        }
        setLoading(false);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(translatedText);
        alert("Copied to clipboard!");
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-900 text-gray-300 p-6">
            <div className="w-full max-w-screen-lg bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-teal-400 text-center">Text Translator</h1>

                {/* Main Layout: Full Width for Web, Responsive for Mobile */}
                <div className="flex flex-col md:flex-row gap-6 w-full">

                    {/* Left Section - Input Box */}
                    <div className="flex-1">
                        <label className="text-gray-400 mb-2 block">Enter Text:</label>
                        <textarea
                            className="w-full p-3 rounded-md bg-gray-900 text-gray-300 border border-gray-700 focus:outline-none focus:border-teal-400 overflow-y-auto scrollbar-none h-32 resize-none"
                            placeholder="Enter text..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>

                    {/* Right Section - Translated Text Box */}
                    <div className="flex-1">
                        <label className="text-gray-400 mb-2 block">Translated Text:</label>
                        <textarea
                            className="w-full p-3 rounded-md bg-gray-900 text-gray-300 border border-gray-700 focus:outline-none focus:border-teal-400 overflow-y-auto scrollbar-none h-32 resize-none"
                            placeholder="Translation will appear here..."
                            value={translatedText}
                            readOnly
                        />
                    </div>
                </div>

                {/* Language Selection Dropdowns */}
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col flex-1">
                        <label className="text-gray-400 mb-2">From:</label>
                        <select
                            className="p-3 rounded-md bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:border-teal-400"
                            value={sourceLang}
                            onChange={(e) => setSourceLang(e.target.value)}
                        >
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col flex-1">
                        <label className="text-gray-400 mb-2">To:</label>
                        <select
                            className="p-3 rounded-md bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:border-teal-400"
                            value={targetLang}
                            onChange={(e) => setTargetLang(e.target.value)}
                        >
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Buttons: Translate & Copy */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={handleTranslate}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md transition"
                        disabled={loading}
                    >
                        {loading ? "Translating..." : "Translate"}
                    </button>

                    <button
                        onClick={handleCopy}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
                        disabled={!translatedText}
                    >
                        Copy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TextTranslator;
