import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NASA_API_KEY = 'YOUR_NASA_API_KEY';
const NASA_WEATHER_URL = `https://api.nasa.gov/insight_weather/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`;

const MarsianWeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [solKeys, setSolKeys] = useState([]);

  useEffect(() => {
    axios.get(NASA_WEATHER_URL)
      .then(response => {
        const { sol_keys, ...solData } = response.data;
        setSolKeys(sol_keys);
        setWeatherData(solData);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  return (
    <div className="bg-gray-900 text-white p-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold">Latest Weather at Elysium Planitia</h1>
        <p className="text-lg mt-2">
          InSight is taking daily weather measurements (temperature, wind, pressure)
          on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars' equator.
        </p>
      </header>
      <div className="flex justify-center mb-10">
        <img src="/insight_photo (1).png" alt="InSight Mars Weather" className="w-full h-auto" />
      </div>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {solKeys.map((sol, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-5 text-center">
            <h2 className="text-2xl font-semibold">Sol {sol}</h2>
            <p className="text-lg">{new Date(weatherData[sol].First_UTC).toLocaleDateString()}</p>
            <p className="mt-2">High: {weatherData[sol].AT?.mx ? `${weatherData[sol].AT.mx.toFixed(1)}° C` : 'N/A'}</p>
            <p>Low: {weatherData[sol].AT?.mn ? `${weatherData[sol].AT.mn.toFixed(1)}° C` : 'N/A'}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default MarsianWeatherDashboard;
