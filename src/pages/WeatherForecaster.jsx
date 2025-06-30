import { useState } from "react";
import axios from "axios";
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from "react-icons/wi";

const WeatherForecaster = () => {
    const [city, setCity] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default: Today
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const getWeatherIcon = (condition) => {
        if (condition.includes("Clear")) return <WiDaySunny size={50} className="text-yellow-500" />;
        if (condition.includes("Rain")) return <WiRain size={50} className="text-blue-400" />;
        if (condition.includes("Cloud")) return <WiCloudy size={50} className="text-gray-400" />;
        if (condition.includes("Snow")) return <WiSnow size={50} className="text-blue-300" />;
        if (condition.includes("Thunder")) return <WiThunderstorm size={50} className="text-purple-500" />;
        return <WiCloudy size={50} className="text-gray-400" />;
    };

    const fetchWeather = async () => {
        if (!city) return;
        setLoading(true);
        setError("");

        try {
            const API_KEY = "a5d6474c837ef5770b4081296b129369";
            const { data } = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeather(data);
            fetchForecast(data.coord.lat, data.coord.lon);
        } catch (err) {
            setError("City not found. Try again!");
            setWeather(null);
            setForecast([]);
        }

        setLoading(false);
    };

    const fetchForecast = async (lat, lon) => {
        try {
            const API_KEY = "a5d6474c837ef5770b4081296b129369";
            const { data } = await axios.get(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );

            // Filter forecast for selected date
            const selectedDateForecast = data.list.filter((hour) => {
                const hourDate = new Date(hour.dt * 1000).toISOString().split("T")[0];
                return hourDate === date;
            });

            setForecast(selectedDateForecast.length > 0 ? selectedDateForecast : []);
        } catch (err) {
            console.error("Error fetching forecast", err);
        }
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center bg-black text-gray-300 p-6">
            {/* Title */}
            <h1 className="text-4xl font-bold text-yellow-400 text-center mb-6">Weather Forecasting</h1>

            {/* Search Bar & Date Picker */}
            <div className="w-4/5 h-2/3 flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                <input
                    type="text"
                    className="w-full md:w-2/3 p-3 rounded-md bg-gray-900 text-gray-300 border border-gray-700 focus:outline-none focus:border-yellow-400"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    type="date"
                    className="p-3 rounded-md bg-gray-900 text-gray-300 border border-gray-700 focus:outline-none focus:border-yellow-400"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <button
                    onClick={fetchWeather}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-md transition"
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Search"}
                </button>
            </div>

            {/* Main Content Layout */}
            <div className="w-4/5 h-[60vh] flex gap-6 bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* Left Section - Weather Info (30% width) */}
                <div className="w-1/3 bg-gray-900 p-4 rounded-lg flex flex-col justify-center items-center text-center">
                    {error && <p className="text-red-400">{error}</p>}

                    {weather && (
                        <>
                            <h2 className="text-3xl font-semibold text-yellow-300">
                                {weather.name}, {weather.sys.country}
                            </h2>
                            <p className="text-lg mt-2 flex items-center justify-center gap-2">
                                {getWeatherIcon(weather.weather[0].main)}
                                {weather.weather[0].description}
                            </p>
                            <p className="text-5xl font-bold text-yellow-400 m-2">{weather.main.temp}°C</p>
                            <p className="m-2 text-lg">Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s</p>
                            <p className="m-2 text-lg">Latitude: {weather.coord.lat} | Longitude: {weather.coord.lon}</p>
                            <p className="m-2 text-lg">Time: {new Date().toLocaleTimeString()}</p>
                        </>
                    )}
                </div>

                {/* Right Section - Hourly Forecast (50% width, Grid layout) */}
                {forecast.length > 0 && (
                    <div className="w-2/3">
                        <h3 className="text-xl font-semibold text-yellow-300 text-center mb-4">
                            {date} - Hourly Forecast
                        </h3>
                        <div className="grid grid-cols-4 gap-4">
                            {forecast.map((hour, index) => (
                                <div key={index} className="p-4 bg-gray-900 rounded-lg flex flex-col items-center">
                                    <p>
                                        {new Date(hour.dt * 1000).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </p>
                                    {getWeatherIcon(hour.weather[0].main)}
                                    <p className="text-lg text-yellow-300 font-bold">{hour.main.temp}°C</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherForecaster;
