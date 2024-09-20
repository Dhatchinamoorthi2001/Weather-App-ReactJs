// src/Weather.js
import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const apiKey = 'e9f31c6ed2f51def91362488657c208f'; 

    const getWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            setWeather(response.data);
            setError('');
        } catch (err) {
            setError('City not found. Please try again.');
            setWeather(null);
        }
    };

    return (
        <div>
            <h1>Weather App</h1>
            <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={getWeather}>Get Weather</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weather && (
                <div>
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
