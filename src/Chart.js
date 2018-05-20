import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { MyContext } from "./App.js";
import { Button } from "react-bootstrap";

class Chart extends Component {
  render() {
    const options = {
      legend: {
        display: false
      },
      tooltips: {
        enabled: true
      },
      responsive: true,
      maintainAspectRatio: false
    };
    const data = {
      labels: this.props.chartDataDates,
      datasets: [
        {
          label: this.props.name,
          fill: false,
          lineTension: 0.1,
          borderColor: "#eeeeee",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#eeeeee",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#eeeeee",
          pointHoverBorderColor: "#eeeeee",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          color: "#eeeeee",
          data: this.props.chartDataPrice
        }
      ]
    };
    return (
      <MyContext.Consumer>
        {context => (
          <div>
            <div className="quote-chart-container">
              <Line data={data} options={options} />
            </div>

            <Button onClick={() => context.handleChartRangeChange("5Y")}>
              5Y
            </Button>
            <Button onClick={() => context.handleChartRangeChange("1Y")}>
              1Y
            </Button>
            <Button onClick={() => context.handleChartRangeChange("YTD")}>
              YTD
            </Button>
            <Button onClick={() => context.handleChartRangeChange("1M")}>
              1M
            </Button>
            <Button onClick={() => context.handleChartRangeChange("MTD")}>
              MTD
            </Button>
            <Button onClick={() => context.handleChartRangeChange("1D")}>
              1D
            </Button>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Chart;
