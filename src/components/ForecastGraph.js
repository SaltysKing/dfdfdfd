import React from "react";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

const ForecastGraph = (props) => {
  const options = {
    responsive: true,
    // maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: "#522BFF",
        align: "top",
        offset: 15,
        font: {
          size: "23.63",
          family: "Ubuntu",
          weight: "600",
          letterSpacing: "-0.81",
        },
        display: function (context, i) {
          return (
            context.dataIndex > 0 &&
            context.dataIndex < context.dataset.data.length - 1
          );
        },
        formatter: function (value, ctx) {
          return ctx.active ? value + "°F" : value + "°F";
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    scales: {
      
      x: {
        position: "top",
        gridLines: {
          offsetGridLines: true,
        },
        // point: {
        //   color: "green",
        // },
        ticks: {
          color: "#1C1C1C",
          align: "left",
          backdropPadding: "20",
          font: {
            size: "18",
            family: "Ubuntu",
            weight: "300",
          },
        },
        grid: {
          borderWidth: "2",
          borderDash: [8, 4],
          color: "#CDC2FF",
          drawBorder: false,
          lineWidth: 2,
          tickLength: 0,
          offset: true,
        },
      },
      y: {
        suggestedMin:  (props.chartMin) ? props.chartMin  - 5 : 0,
        suggestedMax: (props.chartMax) ? props.chartMax +10 : 100,
        ticks: {
          display: false,
          beginAtZero: true,
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
    },
  };
  return (
    <Line
      width="572"
      height="162"
      options={options}
      plugins={[ChartDataLabels]}
      data={{
        labels: props.chartLabels,
        datasets: [
          {
            data: props.chartData,
            label: "Temperature",
            borderColor: "#522BFF",
            fill: true,
            backgroundColor: "#EFECFF",
            pointRadius: 7,
            pointHoverRadius: 7.1,
            pointBackgroundColor: '#522BFF',
            pointBorderColor: "white",
            pointBorderWidth: "3"
          },
        ],
      }}
    />
  );
};

export default ForecastGraph;
