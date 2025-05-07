import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register komponen yang diperlukan untuk Chart.js
ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const CardBarChart = () => {
  const chartInstance = useRef(null); // Simpan instance chart
  const canvasRef = useRef(null); // Simpan referensi ke elemen canvas

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Hancurkan chart lama sebelum membuat yang baru
    }

    if (!canvasRef.current) return; // Pastikan canvas ada sebelum akses context

    const ctx = canvasRef.current.getContext("2d");

    chartInstance.current = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#ed64a6",
            borderColor: "#ed64a6",
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: false,
            barThickness: 8,
          },
          {
            label: new Date().getFullYear() - 1,
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [27, 68, 86, 74, 10, 4, 87],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: { color: "rgba(0,0,0,.4)" },
            align: "end",
            position: "bottom",
          },
          title: { display: false },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          x: {
            display: false,
            grid: {
              color: "rgba(33, 37, 41, 0.3)",
              borderDash: [2],
              borderDashOffset: 2,
            },
          },
          y: {
            display: true,
            grid: {
              color: "rgba(33, 37, 41, 0.2)",
              borderDash: [2],
              borderDashOffset: 2,
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Hancurkan chart saat komponen di-unmount
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
              Performance
            </h6>
            <h2 className="text-blueGray-700 text-xl font-semibold">
              Total orders
            </h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        {/* Chart */}
        <div className="relative h-350-px">
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default CardBarChart;
