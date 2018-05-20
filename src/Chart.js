import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { MyContext } from "./App.js";

class Chart extends Component {
  render() {
    const options = {
      legend: {
        display: false
      },
      tooltips: {
        enabled: true,

      }
    };
    const data = {
      labels: this.props.chartDataDates,
      datasets: [
        {
          label: this.props.name,
          fill: false,
          lineTension: 0.1,
          borderColor: "white",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "white",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "white",
          pointHoverBorderColor: "white",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          color: "white",
          data: this.props.chartDataPrice
        }
      ]
    };
    return <Line data={data} options={options} />;
  }
}

export default Chart;
