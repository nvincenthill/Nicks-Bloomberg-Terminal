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
            <p className="quote-mrkcap">
              Market Cap: ${(
                context.state.currentQuote.marketCap / 1000000000
              ).toFixed(2)}B
            </p>
            <p className="quote-peratio">
              P/E Ratio: {context.state.currentQuote.peRatio}
            </p>
            <p className="quote-peratio">
              P/E Ratio: {context.state.currentQuote.peRatio}
            </p>
            <p className="quote-peratio">
              P/E Ratio: {context.state.currentQuote.peRatio}
            </p>
            <p className="quote-peratio">
              P/E Ratio: {context.state.currentQuote.peRatio}
            </p>
            <p className="quote-peratio">
              P/E Ratio: {context.state.currentQuote.peRatio}
            </p>
            
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Stats;
