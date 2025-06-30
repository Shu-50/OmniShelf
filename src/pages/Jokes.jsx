
import { useState, useEffect } from "react";

const Jokes = () => {
    const [joke, setJoke] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState("Any");
    const [language, setLanguage] = useState("en");
    const [blacklistFlags, setBlacklistFlags] = useState({
        nsfw: false,
        religious: false,
        political: false,
        racist: false,
        sexist: false,
        explicit: false,
    });
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage on initial render
    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    // Save favorites to localStorage whenever they are updated
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const fetchJoke = async () => {
        setLoading(true);

        const selectedFlags = Object.keys(blacklistFlags)
            .filter((flag) => blacklistFlags[flag])
            .join(",");

        const url = `https://v2.jokeapi.dev/joke/${categories}?lang=${language}&blacklistFlags=${selectedFlags}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                setJoke("Error fetching joke. Try again.");
            } else {
                setJoke(data.type === "twopart" ? `${data.setup} - ${data.delivery}` : data.joke);
            }
        } catch (err) {
            setJoke("Failed to fetch a joke. Please check your internet connection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJoke();
    }, []);

    function toggleFlag(flag) {
        setBlacklistFlags((prev) => ({
            ...prev,
            [flag]: !prev[flag],
        }));
    }

    const addToFavorites = () => {
        if (joke && !favorites.includes(joke)) {
            setFavorites((prev) => [...prev, joke]);
        }
    };

    const removeFromFavorites = (favJoke) => {
        setFavorites((prev) => prev.filter((j) => j !== favJoke));
    };

    return (
        <div className="min-h-[80vh] flex flex-col md:flex-row bg-black text-orange-500">
            {/* Left: Joke Generator */}
            <div className="flex-1 bg-black border border-gray-700 p-6 rounded-lg shadow-lg mx-4 mb-4 md:mb-0  md:w-1/3">
                <h1 className="text-3xl font-bold text-center mb-6">Joke Generator</h1>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Category</label>
                    <select
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        className="w-full bg-gray-800 border border-orange-500 text-orange-500 p-2 rounded"
                    >
                        <option value="Any">Any</option>
                        <option value="Programming">Programming</option>
                        <option value="Misc">Misc</option>
                        <option value="Dark">Dark</option>
                        <option value="Pun">Pun</option>
                        <option value="Spooky">Spooky</option>
                        <option value="Christmas">Christmas</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Language</label>
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full bg-gray-800 border border-orange-500 text-orange-500 p-2 rounded"
                    >
                        <option value="en">English</option>
                        <option value="de">German</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-semibold">Blacklist Flags</label>
                    <div className="flex flex-wrap space-x-4">
                        {Object.keys(blacklistFlags).map((flag) => (
                            <div key={flag} className="flex items-center mb-2 w-1/2 sm:w-auto">
                                <input
                                    type="checkbox"
                                    id={flag}
                                    checked={blacklistFlags[flag]}
                                    onChange={() => toggleFlag(flag)}
                                    className="mr-2 text-orange-500 focus:ring-orange-500"
                                />
                                <label htmlFor={flag} className="capitalize">{flag}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={fetchJoke}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded transition"
                >
                    {loading ? "Loading..." : "Get a Joke"}
                </button>
                {joke && (
                    <div className="min-h-fit mt-4 flex items-center justify-between bg-gray-800 p-4 rounded">
                        <p>{joke}</p>
                        <button
                            onClick={addToFavorites}
                            className="text-red-500 hover:text-red-700 text-2xl"
                            title="Add to Favorites"
                        >
                            ❤️
                        </button>
                    </div>
                )}
            </div>

            {/* Right: Favorite Jokes */}
            <div className="md:w-1/2 bg-black border  border-gray-700 p-6 rounded-lg shadow-lg mx-4">
                <h2 className="text-2xl font-bold text-center mb-4">Favorite Jokes</h2>
                {favorites.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2">
                        {favorites.map((fav, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <span>{fav}</span>
                                <button
                                    onClick={() => removeFromFavorites(fav)}
                                    className="text-red-500 hover:text-red-700 text-lg"
                                    title="Remove from Favorites"
                                >
                                    ✖
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center">No favorite jokes yet.</p>
                )}
            </div>
        </div>
    );
};

export default Jokes;
