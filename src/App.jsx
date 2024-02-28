import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const apiKey = "9c5611783264b15f4de5538d56dd0b25";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await fetch(
          `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setWeather(data);
      });
    }
  }, [apiUrl, apiKey]);

  const fetchWeather = async () => {
    if (location.trim() !== "") {
      const response = await fetch(
        `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      setWeather(data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const icon = weather && weather.weather[0].icon;
  const imageUrl = `https://openweathermap.org/img/wn/${icon}.png`;

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">
      <div className="max-w-md w-full bg-white p-4 m-2 sm:m-0 sm:p-8 rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Weather App</h2>

        <form
          onSubmit={handleSubmit}
          className="flex gap-2 sm:flex-row flex-col sm:gap-4"
        >
          <input
            type="text"
            placeholder="Enter Location"
            className="sm:p-2 p-1 text-xl border focus:outline-blue-500 border-blue-500 rounded"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white  font-semibold px-4 py-2 rounded"
          >
            Get Weather
          </button>
        </form>

        {/* // Next block */}

        {weather && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">
              Current weather in{" "}
              <span className="text-blue-500">
                {weather.name}, {weather.sys && weather.sys.country}
              </span>
            </h3>
            <p className="text-xl font-semibold">
              Temperature:{" "}
              <span className="text-blue-500">
                {weather.main && weather.main.temp}°C
              </span>
            </p>
            <p className="flex items-center text-xl font-semibold">
              Weather:
              <span>
                <img src={imageUrl} alt="weather icon" />
              </span>
              <span className="text-blue-500">{weather.weather[0].main}</span>
            </p>
            <p className="text-xl font-semibold">
              Description:{" "}
              <span className="text-blue-500">
                {weather.weather[0].description}
              </span>
            </p>
            <p className="text-xl font-semibold mt-2">
              Wind Speed:{" "}
              <span className="text-blue-500">{weather.wind.speed}m/s</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
