import React from "react";
import { MyContext } from "./App.js";

class Performance extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div className="quote-performance">
            <h2 className="quote-subtitle">PERFORMANCE</h2>
              <ul className="quote-performance-list">
                <li className="quote-performance-list-item">
                  {context.state.currentStats
                    ? ('5Y ' + (context.state.currentStats.year5ChangePercent * 100).toFixed(2))
                    : null}
                </li>
                <li className="quote-performance-list-item">
                  {context.state.currentStats
                    ? ('2Y ' + (context.state.currentStats.year2ChangePercent * 100).toFixed(2))
                    : null}
                </li>
                <li className="quote-performance-list-item">
                  {context.state.currentStats
                    ? ('1Y ' + (context.state.currentStats.year1ChangePercent * 100).toFixed(2))
                    : null}
                </li>
                <li className="quote-performance-list-item">
                  {context.state.currentStats
                    ? ('YTD ' + (context.state.currentStats.ytdChangePercent * 100).toFixed(2))
                    : null}
                </li>
                <li className="quote-performance-list-item">
                  {context.state.currentStats
                    ? ('1M ' + (context.state.currentStats.month1ChangePercent * 100).toFixed(2))
                    : null}
                </li>
              </ul>

              <table id="customers">
                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Country</th>
                </tr>
                <tr>
                  <td>Alfreds Futterkiste</td>
                  <td>Maria Anders</td>
                  <td>Germany</td>
                </tr>
                <tr>
                  <td>Berglunds snabbköp</td>
                  <td>Christina Berglund</td>
                  <td>Sweden</td>
                </tr>
                <tr>
                  <td>Centro comercial Moctezuma</td>
                  <td>Francisco Chang</td>
                  <td>Mexico</td>
                </tr>
                <tr>
                  <td>Ernst Handel</td>
                  <td>Roland Mendel</td>
                  <td>Austria</td>
                </tr>

              </table>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Performance;
