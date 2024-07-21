'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://api.nasa.gov/insight_weather/?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&feedtype=json&ver=1.0`);
        console.log('API Response:', response.data); // Log the entire response

        if (response.data && response.data.sol_keys && response.data.sol_keys.length > 0) {
          const { sol_keys, validity_checks, ...solData } = response.data;
          const formattedData = sol_keys.map((sol) => ({
            sol,
            ...solData[sol],
          }));
          setWeatherData(formattedData);
          console.log('Formatted Data:', formattedData); // Log the formatted data
        } else {
          console.error('Invalid or empty data structure:', response.data);
          setError('No weather data available. The API may be temporarily unavailable.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
          setError(`Failed to fetch data: ${error.response.status} ${error.response.data.error?.message || ''}`);
        } else if (error.request) {
          console.error('Error request:', error.request);
          setError('No response received from the server. Please try again later.');
        } else {
          console.error('Error message:', error.message);
          setError('An error occurred while setting up the request.');
        }
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date)) return "N/A";
    return date.toUTCString();
  };

  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Latest Weather at Elysium Planitia</h1>
        <p className="text-center mb-8">InSight is taking daily weather measurements (temperature, wind, pressure) on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars' equator.</p>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>{error}</p>
            <p className="mt-2">Please check your API key and try again later.</p>
          </div>
        ) : weatherData.length > 0 ? (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Today's Weather</h2>
              <h3 className="text-xl font-bold">Sol {weatherData[0]?.sol} - {formatDate(weatherData[0]?.Last_UTC)}</h3>
              <div className="flex justify-around mb-4">
                <div>
                  <p>High: {weatherData[0]?.AT?.mx ? `${weatherData[0].AT.mx.toFixed(1)}°C / ${celsiusToFahrenheit(weatherData[0].AT.mx).toFixed(1)}°F` : "N/A"}</p>
                  <p>Low: {weatherData[0]?.AT?.mn ? `${weatherData[0].AT.mn.toFixed(1)}°C / ${celsiusToFahrenheit(weatherData[0].AT.mn).toFixed(1)}°F` : "N/A"}</p>
                </div>
                <div>
                  <p>Wind Speed: {weatherData[0]?.HWS?.av ? `${weatherData[0].HWS.av.toFixed(1)} m/s` : "N/A"}</p>
                  <p>Pressure: {weatherData[0]?.PRE?.av ? `${weatherData[0].PRE.av.toFixed(0)} Pa` : "N/A"}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {weatherData.slice(1).map((data) => (
                <div key={data.sol} className="bg-gray-800 p-4 rounded-lg text-center">
                  <h3 className="font-bold">Sol {data.sol}</h3>
                  <p>{formatDate(data.Last_UTC)}</p>
                  <p>High: {data.AT?.mx ? `${data.AT.mx.toFixed(1)}°C / ${celsiusToFahrenheit(data.AT.mx).toFixed(1)}°F` : "N/A"}</p>
                  <p>Low: {data.AT?.mn ? `${data.AT.mn.toFixed(1)}°C / ${celsiusToFahrenheit(data.AT.mn).toFixed(1)}°F` : "N/A"}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center">No weather data available at the moment.</p>
        )}
      </div>
    </div>
  );
}