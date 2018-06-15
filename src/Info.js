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
          <React.Fragment>
            {context.state.currentCompany ? (
              <div className="quote-info">
                <a href={context.state.currentCompany.website}>
                  <h2 className="quote-subtitle" id="quote-name">
                    {context.state.currentQuote.companyName}
                  </h2>
                </a>
                <h2 className="quote-ticker">
                  {context.state.currentQuote.symbol}
                </h2>

                <div>
                  <h3 className="quote-price">
                    ${context.state.currentQuote.iexRealtimePrice
                      ? context.state.currentQuote.iexRealtimePrice.toFixed(2)
                      : context.state.currentQuote.latestPrice.toFixed(2)}
                  </h3>
                  <h4
                    className={
                      context.state.currentQuote.changePercent >= 0
                        ? "quote-dodchg green-text"
                        : "quote-dodchg red-text"
                    }
                  >
                    {context.state.currentQuote.changePercent >= 0 ? "+" : ""}
                    {context.state.currentQuote.change.toFixed(2)}{" "}
                    {(context.state.currentQuote.changePercent * 100).toFixed(
                      2
                    )}%
                  </h4>
                </div>

                <p className="quote-mrkcap">
                  Market Capitalization:{" "}
                  <b>
                    ${(
                      context.state.currentQuote.marketCap / 1000000000
                    ).toFixed(2)}B
                  </b>
                </p>
                <p className="quote-latest">
                  As of the {context.state.currentQuote.latestTime}{" "}
                  {context.state.currentQuote.latestSource}
                </p>

                <p className="quote-exchange">
                  {context.state.currentCompany.exchange}
                </p>
                <p className="quote-sector">
                  Sector:{" "}
                  {context.state.currentCompany
                    ? context.state.currentCompany.sector
                    : null}
                </p>
              </div>
            ) : null}
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Info;
