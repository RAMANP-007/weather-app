import React, { useState } from "react";

export default function SearchBox({ updateWeather }) {
  const [City, setCity] = useState("");
  const [error, setError] = useState(null);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "d86401cc2675ec064256836161d00763";

  const weatherInfo = async () => {
    if (!City.trim()) {
      throw new Error("City name is required!");
    }

    const response = await fetch(
      `${API_URL}?q=${City}&appid=${API_KEY}&units=metric`
    );
    const jsonResponse = await response.json();

    if (jsonResponse.cod !== 200) {
      throw new Error(jsonResponse.message || "An error occurred while fetching data.");
    }

    return {
      city: jsonResponse.name,
      temp: jsonResponse.main.temp,
      tempmin: jsonResponse.main.temp_min,
      tempmax: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.humidity,
      weather: jsonResponse.weather[0].description,
      visibility: jsonResponse.visibility,
      wind: {
        speed: jsonResponse.wind.speed,
      },
    };
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const newInfo = await weatherInfo();
      updateWeather(newInfo);
      setCity("");
    } catch (err) {
      setError(err.message);
      updateWeather(null);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="d-flex">
        <input
          id="city"
          className="form-control me-2"
          placeholder="City Name"
          required
          value={City}
          onChange={handleChange}
        />
        <button className="btn btn-themed" type="submit">
          Search
        </button>
      </form>
      {error && <p className="text-danger mt-2">{error}</p>}
    </div>
  );
}
