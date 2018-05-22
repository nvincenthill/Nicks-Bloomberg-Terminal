import React from "react";
import { Well } from "react-bootstrap";
import { MyContext } from "./App.js";
import Chart from "./Chart";
import Summary from "./Summary";
import Performance from "./Performance";
import Stats from "./Stats";
import Info from "./Info";
import News from "./News";
import Input from "./Input";
import { Button } from "react-bootstrap";
import { Collapse } from "react-collapse";

class DataWell extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    let quote = (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
          <Collapse isOpened={context.state.dataDisplayed}>
          <div className="quote-container">
            
              <Info />
              <div className="quote-chart">
                <Chart
                  chartDataPrices={context.state.chartDataPrices}
                  chartDataDates={context.state.chartDataDates}
                  name={context.state.currentQuote.symbol}
                />
              </div>
              <Stats />
              <Summary />
              <Performance />
              <News />


          </div>
          </Collapse>
          </React.Fragment>
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
