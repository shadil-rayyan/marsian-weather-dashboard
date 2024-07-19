// components/WeatherChart.js
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = ({ data, label, borderColor, backgroundColor }) => {
  const chartData = {
    labels: data.solKeys,
    datasets: [
      {
        label,
        data: data.values,
        borderColor,
        backgroundColor,
        fill: true,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default WeatherChart;
