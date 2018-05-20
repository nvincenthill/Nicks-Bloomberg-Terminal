import React from "react";
import { MyContext } from "./App.js";

class Info extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div className="quote-info">
            <h2 className="quote-ticker">
              {context.state.currentQuote.symbol}
            </h2>
            <a
              href={
                context.state.currentCompany
                  ? context.state.currentCompany.website
                  : null
              }
            >
              <h3 className="quote-name">
                {context.state.currentQuote.companyName}
              </h3>
            </a>
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
            <p className="quote-peratio">
              Sector: {context.state.currentCompany
                ? context.state.currentCompany.sector
                : null}
            </p>
            <p className="quote-peratio">
              Beta: {context.state.currentStats
                ? (context.state.currentStats.beta).toFixed(2)
                : null}
            </p>
            <p className="quote-peratio">
              Dividend Yield: {context.state.currentStats
                ? (context.state.currentStats.dividendYield).toFixed(2) + "%"
                : null}
            </p>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Info;
