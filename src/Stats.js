import React from "react";
import { MyContext } from "./App.js";

class Stats extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div className="quote-stats">
            <h2 className="quote-subtitle">KEY STATS</h2>
            {context.state.currentStats ? (
              <div>
                <p className="quote-peratio">
                  P/E Ratio: {context.state.currentQuote.peRatio}
                </p>
                <p className="quote-peratio">
                  Dividend Yield:{" "}
                  {context.state.currentStats
                    ? context.state.currentStats.dividendYield.toFixed(2) + "%"
                    : null}
                </p>
                <p className="quote-peratio">
                  Profit Margin: {context.state.currentStats.profitMargin}%
                </p>
                <p className="quote-peratio">
                  EBITDA: ${context.state.currentStats.EBITDA / 1000000000}B
                </p>
                <p className="quote-peratio">
                  EPS: {context.state.currentStats.latestEPS}
                </p>
              </div>
            ) : null}
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Stats;
