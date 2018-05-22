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
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              color: "#eeeeee"
            },
            ticks: {
              fontColor: "white",
              fontSize: 10
            }
          }
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              color: "#eeeeee"
            },
            scaleLabel: {
              fontColor: "white",
              display: true,
              fontSize: 20,
              labelString: "Price (USD)"
            },
            ticks: {
              fontColor: "white",
              fontSize: 10
            }
          }
        ]
      },
      responsive: true,
      maintainAspectRatio: false
    };
    const data = {
      labels: this.props.chartDataDates,
      datasets: [
        {
          label: this.props.name,
          fill: "origin",
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
          color: "green",
          data: this.props.chartDataPrices,
          backgroundColor: "green"
        }
      ]
    };
    return (
      <MyContext.Consumer>
        {context => (
          <div>
            <div className="quote-chart-container">
              <Line redraw={true} data={data} options={options} />
            </div>
            <div className="quote-chart-buttons-container">
              <Button
                className={
                  context.state.currentChartButton === "5Y"
                    ? "quote-chart-button-active"
                    : "quote-chart-button"
                }
                onClick={() => context.handleChartRangeChange("5Y")}
              >
                5Y
              </Button>
              <Button
                className={
                  context.state.currentChartButton === "1Y"
                    ? "quote-chart-button-active"
                    : "quote-chart-button"
                }
                onClick={() => context.handleChartRangeChange("1Y")}
              >
                1Y
              </Button>
              <Button
                className={
                  context.state.currentChartButton === "YTD"
                    ? "quote-chart-button-active"
                    : "quote-chart-button"
                }
                onClick={() => context.handleChartRangeChange("YTD")}
              >
                YTD
              </Button>
              <Button
                className={
                  context.state.currentChartButton === "1M"
                    ? "quote-chart-button-active"
                    : "quote-chart-button"
                }
                onClick={() => context.handleChartRangeChange("1M")}
              >
                1M
              </Button>
              <Button
                className={
                  context.state.currentChartButton === "MTD"
                    ? "quote-chart-button-active"
                    : "quote-chart-button"
                }
                onClick={() => context.handleChartRangeChange("MTD")}
              >
                MTD
              </Button>
              <Button
                className={
                  context.state.currentChartButton === "1D"
                    ? "quote-chart-button-active"
                    : "quote-chart-button"
                }
                onClick={() => context.handleChartRangeChange("1D")}
              >
                1D
              </Button>
            </div>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Chart;
