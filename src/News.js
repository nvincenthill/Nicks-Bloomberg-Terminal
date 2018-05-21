import React from "react";
import { MyContext } from "./App.js";

class News extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div className="quote-news">
            <h2 className="quote-subtitle">NEWS</h2>
            <ul className="quote-news-list">
              <a
                href={
                  context.state.currentQuote.latestPrice
                    ? context.state.currentNews[0].url
                    : null
                }
              >
                <li className="quote-news-title">
                  {context.state.currentQuote.latestPrice
                    ? context.state.currentNews[0].headline
                    : null}
                </li>
              </a>
              <a
                href={
                  context.state.currentQuote.latestPrice
                    ? context.state.currentNews[1].url
                    : null
                }
              >
                <li className="quote-news-title">
                  {context.state.currentQuote.latestPrice
                    ? context.state.currentNews[1].headline
                    : null}
                </li>
              </a>
              <a
                href={
                  context.state.currentQuote.latestPrice
                    ? context.state.currentNews[2].url
                    : null
                }
              >
                <li className="quote-news-title">
                  {context.state.currentQuote.latestPrice
                    ? context.state.currentNews[2].headline
                    : null}
                </li>
              </a>
            </ul>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default News;
