


import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
    const [text, setText] = useState("");
    const qrRef = useRef(null);

    // Function to format URL properly
    const formatURL = (input) => {
        if (input && !input.startsWith("http://") && !input.startsWith("https://")) {
            return `https://${input}`;
        }
        return input;
    };

    // Function to copy QR Code
    const copyQRCode = () => {
        const canvas = qrRef.current.querySelector("canvas");
        if (canvas) {
            canvas.toBlob((blob) => {
                const item = new ClipboardItem({ "image/png": blob });
                navigator.clipboard.write([item]).then(() => {
                    alert("QR Code copied to clipboard! 🎉");
                });
            });
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-semibold mb-6">QR Code Generator</h1>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter a URL (e.g., example.com)"
                    className="w-full p-3 rounded-md text-black focus:ring-2 focus:ring-blue-500"
                />

                {text && (
                    <div ref={qrRef} className="mt-4 mx-auto bg-white p-2 rounded-lg inline-block">
                        <QRCodeCanvas value={formatURL(text)} size={200} />
                    </div>
                )}

                {text && (
                    <button
                        onClick={copyQRCode}
                        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-bold transition duration-200"
                    >
                        Copy QR Code
                    </button>
                )}
            </div>

            {text && (
                <p className="mt-4 text-lg text-blue-400">
                    <a href={formatURL(text)} target="_blank" rel="noopener noreferrer">
                        {formatURL(text)}
                    </a>
                </p>
            )}
        </div>
    );
};

export default QRCodeGenerator;
