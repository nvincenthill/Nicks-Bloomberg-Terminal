import React from "react";
import { Well } from "react-bootstrap";
import { MyContext } from "./App.js";
import Chart from "./Chart";
import { Button } from "react-bootstrap";

class DataWell extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    let quote = (
      <MyContext.Consumer>
        {context => (
          <Well>
            <div className="quote-container">
              <div className="quote-info">
                <h2 className="quote-ticker">
                  {context.state.currentQuote.symbol}
                </h2>
                <h3 className="quote-name">
                  {context.state.currentQuote.companyName}
                </h3>
                <h3 className="quote-price">
                  ${context.state.currentQuote.latestPrice
                    ? context.state.currentQuote.latestPrice.toFixed(2)
                    : null}
                </h3>
                <h4
                  className={
                    context.state.currentQuote.changePercent >= 0
                      ? "quote-dodchg green-text"
                      : "quote-dodchg red-text"
                  }
                >
                  {(context.state.currentQuote.changePercent * 100).toFixed(2)}%{" "}
                </h4>
              </div>

              <div className="quote-chart">
                <Chart
                  chartDataPrice={context.state.ChartDataPrice}
                  chartDataDates={context.state.ChartDataDates}
                  name={context.state.currentQuote.symbol}
                />
                <Button onClick={() => context.handleChartRangeChange('5Y')}>5Y</Button>
                <Button onClick={() => context.handleChartRangeChange('1Y')}>1Y</Button>
                <Button onClick={() => context.handleChartRangeChange('YTD')}>YTD</Button>
                <Button onClick={() => context.handleChartRangeChange('MTD')}>MTD</Button>
                <Button onClick={() => context.handleChartRangeChange('1M')}>1M</Button>
                <Button onClick={() => context.handleChartRangeChange('1D')}>1D</Button>
              </div>
              <div className="quote-metrics">
              <h2 className="quote-subtitle">
                Key Stats
              </h2>
                <p className="quote-mrkcap">
                  Market Cap: ${(
                    context.state.currentQuote.marketCap / 1000000000
                  ).toFixed(2)}B
                </p>
                <p className="quote-peratio">
                  P/E Ratio: {context.state.currentQuote.peRatio}
                </p>
              </div>
              <div className="quote-stats">
                <h2 className="quote-subtitle">
                  Boring Financial Data
                </h2>
              </div>
              <div className="quote-news" > 
                <h2 className="quote-subtitle">
                  News
                </h2>
                <ul className="quote-news-list">
                  <a href={context.state.currentQuote.latestPrice ? context.state.currentNews[0].url : null}> <li className="quote-news-title">{context.state.currentQuote.latestPrice ? context.state.currentNews[0].headline : null}</li></a>
                  <a href={context.state.currentQuote.latestPrice ? context.state.currentNews[1].url : null}><li className="quote-news-title">{context.state.currentQuote.latestPrice ? context.state.currentNews[1].headline : null}</li></a>
                  <a href={context.state.currentQuote.latestPrice ? context.state.currentNews[2].url : null}><li className="quote-news-title">{context.state.currentQuote.latestPrice ? context.state.currentNews[2].headline : null}</li></a>
                  <a href={context.state.currentQuote.latestPrice ? context.state.currentNews[3].url : null}><li className="quote-news-title">{context.state.currentQuote.latestPrice ? context.state.currentNews[3].headline : null}</li></a>
                  <a href={context.state.currentQuote.latestPrice ? context.state.currentNews[4].url : null}><li className="quote-news-title">{context.state.currentQuote.latestPrice ? context.state.currentNews[4].headline : null}</li></a>
                </ul>
              </div>
            </div>
          </Well>
        )}
      </MyContext.Consumer>
    );
    return (
      <MyContext.Consumer>
        {context => (context.state.currentQuote ? quote : null)}
      </MyContext.Consumer>
    );
  }
}
export default DataWell;
