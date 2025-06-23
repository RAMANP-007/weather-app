import React, { useState, useEffect } from 'react';
import Scarchbox from './scarchbox.jsx';
import Infobox from './weatherinfo.jsx';

const getWeatherTheme = (weather) => {
    if (!weather) return '';
    const lowerCaseWeather = weather.toLowerCase();
    if (lowerCaseWeather.includes('clear')) return 'theme-clear';
    if (lowerCaseWeather.includes('clouds')) return 'theme-clouds';
    if (lowerCaseWeather.includes('rain')) return 'theme-rain';
    if (lowerCaseWeather.includes('thunderstorm')) return 'theme-thunderstorm';
    if (lowerCaseWeather.includes('snow')) return 'theme-snow';
    if (lowerCaseWeather.includes('mist') || lowerCaseWeather.includes('haze')) return 'theme-mist';
    return '';
};

export default function Weather() {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [theme, setTheme] = useState('light');

    const updateWeather = (newInfo) => {
        setWeatherInfo(newInfo);
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        const weatherTheme = getWeatherTheme(weatherInfo?.weather);
        document.body.className = `${theme === 'dark' ? 'dark-mode' : ''} ${weatherTheme}`.trim();
    }, [theme, weatherInfo]);

    return (
        <div className="weather-app-container" style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
                        <div className="glass-card p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="m-0">Weather App</h2>
                                <button onClick={toggleTheme} className="btn theme-toggle-btn">
                                    {theme === 'light' ? '🌙' : '☀️'}
                                </button>
                            </div>
                            <Scarchbox updateWeather={updateWeather} />
                            {weatherInfo ? <Infobox info={weatherInfo} /> : <p className="text-center mt-3">Search for a city to see the weather.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}