import React from "react";
import { Well } from "react-bootstrap";
import { MyContext } from "./App.js";

class DataWell extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <Well>
            <div>
              <h2>{context.state.currentQuote.symbol}</h2>
              <h3>{context.state.currentQuote.companyName}</h3>
              <h3>${context.state.currentQuote.iexRealtimePrice}</h3>
              <p>{context.state.currentQuote.changePercent * 100}% </p>
              <p>${Math.round(context.state.currentQuote.marketCap / 1000000000)}B</p>
              <p>{context.state.currentQuote.peRatio}</p>
            </div>
          </Well>
        )}
      </MyContext.Consumer>
    );
  }
}
export default DataWell;
