import React from "react";
import { Well } from "react-bootstrap";
import { MyContext } from "./App.js";

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

              <div className="quote-chart" />
              <div className="quote-info">
                <p className="quote-mrkcap">
                  Market Cap: ${(
                    context.state.currentQuote.marketCap / 1000000000
                  ).toFixed(2)}B
                </p>
                <p className="quote-peratio">
                  P/E Ratio: {context.state.currentQuote.peRatio}
                </p>
              </div>
              <div className="quote-metrics" />
              <div className="quote-news" />
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
