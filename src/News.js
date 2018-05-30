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
              {context.state.currentQuote.latestPrice ?
                <li className="quote-news-title"> {context.state.currentNews[0].headline + " | "}
                <span className="source">{context.state.currentNews[0].source}</span> 
                </li> : null } 
              </a>
              <a
                href={
                  context.state.currentQuote.latestPrice
                    ? context.state.currentNews[1].url
                    : null
                }
              >
              {context.state.currentQuote.latestPrice ?
                <li className="quote-news-title"> {context.state.currentNews[1].headline + " | "}
                <span className="source">{context.state.currentNews[1].source}</span> 
                </li> : null } 
              </a>
              <a
                href={
                  context.state.currentQuote.latestPrice
                    ? context.state.currentNews[2].url
                    : null
                }
              >
              {context.state.currentQuote.latestPrice ?
                <li className="quote-news-title"> {context.state.currentNews[2].headline + " | "}
                <span className="source">{context.state.currentNews[2].source}</span> 
                </li> : null } 
              </a>
              <a
                href={
                  context.state.currentQuote.latestPrice
                    ? context.state.currentNews[3].url
                    : null
                }
              >
              {context.state.currentQuote.latestPrice ?
                <li className="quote-news-title"> {context.state.currentNews[3].headline + " | "}
                <span className="source">{context.state.currentNews[3].source}</span> 
                </li> : null } 
              </a>
              <a
                href={
                  context.state.currentQuote.latestPrice
                    ? context.state.currentNews[4].url
                    : null
                }
              >
              {context.state.currentQuote.latestPrice ?
                <li className="quote-news-title"> {context.state.currentNews[4].headline + " | "}
                <span className="source">{context.state.currentNews[4].source}</span> 
                </li> : null } 
              </a>
              <a
                href={
                  context.state.currentQuote.latestPrice
                    ? context.state.currentNews[5].url
                    : null
                }
              >
              {context.state.currentQuote.latestPrice ?
                <li className="quote-news-title"> {context.state.currentNews[5].headline + " | "}
                <span className="source">{context.state.currentNews[5].source}</span> 
                </li> : null } 
              </a>
            </ul>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default News;
