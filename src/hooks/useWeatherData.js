import { useState, useEffect, useCallback } from 'react';

const useWeatherData = (city) => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(`https://api.openweathermap.org/data/2.5/weather?q=${String(city)}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const weatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
            );
            if (!weatherResponse.ok) {
                throw new Error('Network response was not ok for weather');
            }
            const weatherData = await weatherResponse.json();

            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
            );
            if (!forecastResponse.ok) {
                throw new Error('Network response was not ok for forecast');
            }
            const forecastData = await forecastResponse.json();
            const now = new Date();
            const forecastList = forecastData.list.map((item) => ({
                ...item,
                dt: new Date(item.dt * 1000),
            }));

            const filteredForecast = [];
            for (let i = 0; i < 3; i++) {
                const start = now.getTime() + i * 3 * 60 * 60 * 1000;
                const end = start + 3 * 60 * 60 * 1000;
                const block = forecastList.filter(
                    (item) => item.dt.getTime() >= start && item.dt.getTime() < end
                );
                if (block.length) {
                    filteredForecast.push(block);
                }
            }
            setWeatherData(weatherData);
            setForecastData(filteredForecast);
            setLoading(false);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            setError(error);
            setLoading(false);
        }
    }, [city]);

    useEffect(() => {
        if (city) {
            fetchData();
        }
    }, [fetchData, city]);

    return { weatherData, forecastData, loading, error };
};

export default useWeatherData;
