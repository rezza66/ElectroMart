// Charts.js
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

const LineChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.x),
    datasets: [
      {
        label: 'Penjualan',
        data: data.map((item) => item.y),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        labels: chartData.labels,
      },
      y: {
        type: 'linear',
        position: 'left',
      },
    },
  };

  return (
    <Line
      data={chartData}
      options={options}
    />
  );
};

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.x),
    datasets: [
      {
        label: 'Pengunjung',
        data: data.map((item) => item.y),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'x',
    scales: {
      x: {
        type: 'category',
        labels: chartData.labels,
      },
      y: {
        type: 'linear',
        position: 'left',
      },
    },
  };

  return (
    <Bar
      data={chartData}
      options={options}
    />
  );
};

export { LineChart, BarChart };