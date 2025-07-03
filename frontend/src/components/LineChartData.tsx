import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BALANCE_HISTORY } from "../graphql/queries/transaction.query.js";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

// Register required elements for Line charts
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface BalancePoint {
  date: string;
  balance: number;
}

const LineChart = () => {
  const { data, loading, error } = useQuery(GET_BALANCE_HISTORY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading chart</p>;

  const history = (data?.getBalanceHistory || []) as BalancePoint[];

  const chartData = {
    labels: history.map((point) => new Date(point.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })),
    datasets: [
      {
        label: "Balance",
        data: history.map((point) => point.balance),
        fill: false,
        tension: 0.4,
        borderColor: "#0ff",
        pointRadius: 3,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        ticks: { color: "#ccc" },
        grid: { color: "#333" },
      },
      x: {
        ticks: { color: "#ccc" },
        grid: { color: "#333" },
      },
    },
    plugins: {
      legend: { labels: { color: "#ccc" } },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
