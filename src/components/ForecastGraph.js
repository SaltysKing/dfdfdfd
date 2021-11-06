import React from "react";
import styles from "./ForecastGraph.module.css";
import { Line } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const options = {
  // responsive: true,
  // maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false
    },
    datalabels: {
      color: '#522BFF',
      align: 'top',
      offset: 15,
      font: {
        size: "23.63",
        family: "Ubuntu",
        weight: "600",
        letterSpacing: "-0.81"
      },
      formatter: function(value, ctx) {
        return ctx.active
          ? 'index'
          :  (value) + '°F';
      },
    }
  },
  elements: {
    line: {
      tension: 0.4,
    },
  },
  scales: {
    // offset: 10,
    x: {
      gridLines: {
        offsetGridLines: true
      },
      offset: true,
      ticks: {
        // labelOffset: 20,
        color: "#1C1C1C",
        align: "center",
        // padding: 15,
        font: {
          size: "18",
          family: "Ubuntu",
          weight: "300",
        },
        // callback: function (val, index) {
        //   // Hide the first line and label of every dataset
        //   return index !== 0 ? this.getLabelForValue(val) : "";
        // },
      },
      grid: {
        borderWidth: "2",
        borderDash: [8, 4],
        color: "#CDC2FF",
        drawBorder: false,
        lineWidth: 2,
        tickLength: 0,
      },
    },
    y: {
      ticks: { display: false },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },
};

const ForecastGraph = (props) => {
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
          },
        ],
      }}
    />
  );

  // return <canvas id="myChart" width="572" height="162"></canvas>;
};

export default ForecastGraph;
