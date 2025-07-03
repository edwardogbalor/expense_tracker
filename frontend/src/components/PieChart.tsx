import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY_BREAKDOWN } from "../graphql/queries/transaction.query.js";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// Register required elements for Doughnut/Pie charts
ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryBreakdownItem {
  category: string;
  total: number;
}

const PieChart = () => {
    const { data } = useQuery(GET_CATEGORY_BREAKDOWN);
const breakdown: CategoryBreakdownItem[] = data?.categoryBreakdown || [];

const chartData = {
  labels: breakdown.map((item) => item.category),
  datasets: [
    {
      data: breakdown.map((item) => item.total),
      backgroundColor: ["#2dd4bf", "#f43f5e", "#3b82f6", "#facc15"], // add more as needed
      hoverOffset: 10,
    },
  ],
};

  
    return (
      <Doughnut data={chartData} options={{ plugins: { legend: { position: "bottom", labels: { color: "#ccc" } } } }} />
    );
  };
  
  export default PieChart;
  
