import React, { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Daftarkan elemen yang diperlukan
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const CardLineChart = () => {
  const chartInstance = useRef(null); // Simpan instance chart
  const canvasRef = useRef(null); // Simpan referensi ke elemen canvas

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Hancurkan chart lama sebelum membuat yang baru
    }

    if (!canvasRef.current) return; // Pastikan canvas ada sebelum akses context

    const ctx = canvasRef.current.getContext("2d");

    chartInstance.current = new ChartJS(ctx, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
          {
            label: new Date().getFullYear() - 1,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: [40, 68, 86, 74, 56, 60, 87],
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: { color: "white" },
            align: "end",
            position: "bottom",
          },
          title: { display: false },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          x: {
            ticks: { color: "rgba(255,255,255,.7)" }, // Warna tetap sesuai yang kamu tetapkan
            grid: { display: false, color: "rgba(33, 37, 41, 0.3)" },
          },
          y: {
            ticks: { color: "rgba(255,255,255,.7)" }, // Warna tetap sesuai yang kamu tetapkan
            grid: { color: "rgba(255, 255, 255, 0.15)" },
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
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-gray-800">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-gray-400 mb-1 text-xs font-semibold">
              Overview
            </h6>
            <h2 className="text-white text-xl font-semibold">Sales value</h2>
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

export default CardLineChart;
