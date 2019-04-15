import React from 'react';

import Info from './Info';
import Chart from './Chart';
import Summary from './Summary';
import Performance from './Performance';
import Stats from './Stats';
import News from './News';

import { Collapse } from 'react-collapse';
import { MyContext } from './App.js';

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
                    chartDataSPYPrices={context.state.SPYPrices}
                    chartDataDates={context.state.chartDataDates}
                    symbol={context.state.currentQuote.symbol}
                    name={context.state.currentQuote.companyName}
                    chartShouldRedraw={context.state.chartShouldRedraw}
                    currentChartButton={context.state.currentChartButton}
                    setRedraw={context.state.setRedraw}
                  />
                </div>
                <Stats />
                <Summary />
                <Performance />
                {context.state.currentQuote.symbol && <News />}
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
