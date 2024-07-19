'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/mock-mars-weather');
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Mars Weather for the Next 7 Days</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weatherData.sol_keys.map(sol => (
          <div key={sol} className="bg-white p-4 rounded-lg shadow-lg border border-gray-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Sol {sol}</h2>
            <p className="text-gray-600"><strong>Temperature:</strong> {weatherData[sol].AT.av}°C</p>
            <p className="text-gray-600"><strong>Pressure:</strong> {weatherData[sol].PRE.av} Pa</p>
            <p className="text-gray-600"><strong>Wind Speed:</strong> {weatherData[sol].HWS.av} m/s</p>
          </div>
        ))}
      </div>
    </div>
  );
}
