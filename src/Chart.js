import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { MyContext } from "./App.js";
import { Button } from "react-bootstrap";

class Chart extends Component {
  componentDidMount() {
    window.addEventListener("resize", this.props.setRedraw, false);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.props.setRedraw, false);
  }

  render() {
    let gainedOrLost =
      this.props.chartDataPrices[this.props.chartDataPrices.length - 1] -
      this.props.chartDataPrices[0];

    let date =
      this.props.currentChartButton === "1D"
        ? "DoD"
        : "since " + this.props.chartDataDates[0];

    let chartTitle = `${this.props.name} stock ${
      gainedOrLost > 0 ? "gained" : "lost"
    } ${Math.abs(
      ((this.props.chartDataPrices[this.props.chartDataPrices.length - 1] -
        this.props.chartDataPrices[0]) *
        100) /
        this.props.chartDataPrices[0]
    ).toFixed(2)}% ${date}*`;

    const options = {
      title: {
        display: true,
        text: chartTitle,
        fontColor: "#eee",
        fontSize: 20
      },
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
              color: "#F39F41"
            },
            ticks: {
              fontColor: "white",
              fontSize: 10,
              padding: 5
            },
            type: "time"
          }
        ],
        yAxes: [
          {
            id: "stock",
            display: true,
            gridLines: {
              color: "#F39F41"
            },
            scaleLabel: {
              // fontColor: "white",
              // display: true,
              // fontSize: 20,
              // labelString: "Price (USD)"
            },
            ticks: {
              fontColor: "white",
              fontSize: 10,
              padding: 5,
              callback: function(value) {
                return "$" + value;
              }
            }
          },
          {
            id: "test",
            display: false,
            position: "left",
            gridLines: {
              color: "#F39F41"
            },
            scaleLabel: {
              // fontColor: "white",
              // display: true,
              // fontSize: 20,
              // labelString: "Price (USD)"
            },
            ticks: {
              fontColor: "white",
              fontSize: 10,
              padding: 5,
              callback: function(value) {
                return "$" + value;
              }
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
          yAxisID: "stock",
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
          color: "rgba(0, 128, 0, .5)",
          data: this.props.chartDataPrices,
          backgroundColor: "rgba(0, 128, 0, .5)",
          hoverBackgroundColor: "rgba(0, 128, 0, 1)"
        }
        // {
        //   yAxisID: 'test',
        //   label: "SPY",
        //   fill: "origin",
        //   lineTension: 0.1,
        //   borderColor: "#eeeeee",
        //   borderCapStyle: "butt",
        //   borderDash: [],
        //   borderDashOffset: 0.0,
        //   borderJoinStyle: "miter",
        //   pointBorderColor: "#eeeeee",
        //   pointBackgroundColor: "#fff",
        //   pointBorderWidth: 1,
        //   pointHoverRadius: 5,
        //   pointHoverBackgroundColor: "#eeeeee",
        //   pointHoverBorderColor: "#eeeeee",
        //   pointHoverBorderWidth: 2,
        //   pointRadius: 1,
        //   pointHitRadius: 10,
        //   color: "rgba(0, 128, 0, .5)",
        //   data: this.props.chartDataSPYPrices,
        //   backgroundColor: "red",
        //   hoverBackgroundColor: "rgba(0, 128, 0, 1)"
        // }
      ]
    };
    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
            <div className="quote-chart-container">
              <Line
                redraw={context.state.chartShouldRedraw}
                data={data}
                options={options}
              />
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
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Chart;
