
import { useState } from "react";

const SpotifyDownloader = () => {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDownload = async () => {
        setLoading(true);
        setError(null);

        try {
            const apiUrl = `https://spotify-downloader6.p.rapidapi.com/spotify?spotifyUrl=${encodeURIComponent(
                url
            )}`;

            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "762efc4a52msh625104a068fd0b5p1b244fjsn05a712e43a48",
                    "X-RapidAPI-Host": "spotify-downloader6.p.rapidapi.com",
                },
            });

            if (!response.ok) throw new Error("Download failed");

            const data = await response.json();
            const link = document.createElement("a");
            link.href = data.download_link;
            link.download = `${data.title}.mp3`;
            link.click();
        } catch (err) {
            setError("Failed to download song. Check the URL or try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-black text-gray-300 p-4">
            <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-green-400 text-center mb-6">
                    Spotify Song Downloader
                </h1>
                <div className="mb-4">
                    <label htmlFor="spotify-url" className="text-sm mb-2">
                        Enter Spotify Song URL:
                    </label>
                    <input
                        type="text"
                        id="spotify-url"
                        className="w-full p-2 rounded-md bg-gray-900 text-gray-300 border border-gray-700 focus:outline-none focus:border-green-500"
                        placeholder="https://open.spotify.com/track/example"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleDownload}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Downloading..." : "Download Song"}
                </button>
                {error && (
                    <div className="mt-4 p-2 bg-red-600 text-white text-sm rounded">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpotifyDownloader;
