export const lineChartData = {
    labels: ["April", "June", "Sept", "April", "April"],
    datasets: [
      {
        label: "Balance",
        data: [1200, 1700, 1500, 1800, 2300],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.3,
      },
    ],
  };
  
  export const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: {
          color: "#ccc",
          callback: function (value) {
            return `$${value}`;
          },
        },
        grid: { color: "#333" },
      },
      x: {
        ticks: { color: "#ccc" },
        grid: { color: "#222" },
      },
    },
  };
  