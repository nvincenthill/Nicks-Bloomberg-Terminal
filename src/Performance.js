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
            {context.state.currentStats ? (
              <table className="quote-performance-table">
              <tbody>
                <tr>
                  <th className="quote-performance-list-header">5Y</th>
                  <th className="quote-performance-list-header">2Y</th>
                  <th className="quote-performance-list-header">1Y</th>
                  <th className="quote-performance-list-header">YTD</th>
                  <th className="quote-performance-list-header">1M</th>
                  <th className="quote-performance-list-header">1D</th>
                </tr>
                <tr>
                  <td
                    className={
                      context.state.currentStats.year5ChangePercent >= 0
                        ? "quote-performance-list-item green-text"
                        : "quote-performance-list-item red-text"
                    }
                  >
                    {(
                      context.state.currentStats.year5ChangePercent * 100
                    ).toFixed(2) + "%"}
                  </td>
                  <td className={
                      context.state.currentStats.year2ChangePercent >= 0
                        ? "quote-performance-list-item green-text"
                        : "quote-performance-list-item red-text"
                    }>
                    {(
                      context.state.currentStats.year2ChangePercent * 100
                    ).toFixed(2) + "%"}
                  </td>
                  <td className={
                      context.state.currentStats.year1ChangePercent >= 0
                        ? "quote-performance-list-item green-text"
                        : "quote-performance-list-item red-text"
                    }>
                    {(
                      context.state.currentStats.year1ChangePercent * 100
                    ).toFixed(2) + "%"}
                  </td>
                  <td className={
                      context.state.currentStats.ytdChangePercent >= 0
                        ? "quote-performance-list-item green-text"
                        : "quote-performance-list-item red-text"
                    }>
                    {(
                      context.state.currentStats.ytdChangePercent * 100
                    ).toFixed(2) + "%"}
                  </td>
                  <td className={
                      context.state.currentStats.month1ChangePercent >= 0
                        ? "quote-performance-list-item green-text"
                        : "quote-performance-list-item red-text"
                    }>
                    {(
                      context.state.currentStats.month1ChangePercent * 100
                    ).toFixed(2) + "%"}
                  </td>
                  <td className={
                      context.state.currentQuote.changePercent >= 0
                        ? "quote-performance-list-item green-text"
                        : "quote-performance-list-item red-text"
                    }>
                    {(
                      context.state.currentQuote.changePercent * 100
                    ).toFixed(2) + "%"}
                  </td>
                </tr>
                </tbody>
              </table>
            ) : null}

            <p className="quote-performance-table-footer">
              *Calculated with raw price change, not total or annulized return
            </p>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Performance;
