import React from 'react';

const getWeatherIcon = (weather) => {
  const lowerCaseWeather = weather.toLowerCase();
  if (lowerCaseWeather.includes('clear')) return '☀️';
  if (lowerCaseWeather.includes('clouds')) return '☁️';
  if (lowerCaseWeather.includes('rain')) return '🌧️';
  if (lowerCaseWeather.includes('thunderstorm')) return '⛈️';
  if (lowerCaseWeather.includes('snow')) return '❄️';
  if (lowerCaseWeather.includes('mist') || lowerCaseWeather.includes('haze')) return '🌫️';
  return '🌡️'; // Default icon
};

export default function Infobox({ info }) {
  if (!info) {
    return null;
  }

  return (
    <div className="weather-info-container text-center mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h2 className="display-4 fw-bold">{Math.round(info.temp)}°C</h2>
          <p className="lead">{info.city}</p>
        </div>
        <div className="weather-icon display-1">
          {getWeatherIcon(info.weather)}
        </div>
      </div>
      <p className="text-capitalize mt-3">{info.weather}</p>
      <hr />
      <div className="row mt-3 text-center">
        <div className="col-4">
          <p className="mb-0">Humidity</p>
          <p className="fw-bold">{info.humidity}%</p>
        </div>
        <div className="col-4">
          <p className="mb-0">Visibility</p>
          <p className="fw-bold">{info.visibility / 1000} km</p>
        </div>
        <div className="col-4">
          <p className="mb-0">Wind</p>
          <p className="fw-bold">{info.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
}