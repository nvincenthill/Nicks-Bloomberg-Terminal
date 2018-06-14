import React from "react";
import { MyContext } from "./App.js";

class News extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}

  //TO DO Refactor with iterator and variable
  // handle HTML apostrophies and special characters
  render() {
    const numbers = [0, 1, 2, 3, 4];
    let newsItems = numbers.map(number => (
      <MyContext.Consumer>
        {context =>
          context.state.currentQuote.latestPrice ? (
            <li className="quote-news-title">
              {context.state.currentNews[numbers].headline + " | "}
              <span className="source">
                {context.state.currentNews[numbers].source}
              </span>
            </li>
          ) : null
        }
      </MyContext.Consumer>
    ));
    return (
      <MyContext.Consumer>
        {context => (
          <div className="quote-news">
            {context.state.currentQuote.latestPrice ? (
              <React.Fragment>
                <h2 className="quote-subtitle">NEWS</h2>
                <ul className="quote-news-list">
                  <a
                    href={
                      context.state.currentNews[0].url
                        ? context.state.currentNews[0].url
                        : null
                    }
                  >
                    {context.state.currentQuote.latestPrice ? (
                      <li className="quote-news-title">
                        {" "}
                        {context.state.currentNews[0].headline + " | "}
                        <span className="source">
                          {context.state.currentNews[0].source}
                        </span>
                      </li>
                    ) : null}
                  </a>
                  <a
                    href={
                      context.state.currentNews[1]
                        ? context.state.currentNews[1].url
                        : null
                    }
                  >
                    {context.state.currentNews[1] ? (
                      <li className="quote-news-title">
                        {" "}
                        {context.state.currentNews[1].headline + " | "}
                        <span className="source">
                          {context.state.currentNews[1].source}
                        </span>
                      </li>
                    ) : null}
                  </a>
                  <a
                    href={
                      context.state.currentNews[2]
                        ? context.state.currentNews[2].url
                        : null
                    }
                  >
                    {context.state.currentNews[2] ? (
                      <li className="quote-news-title">
                        {" "}
                        {context.state.currentNews[2].headline + " | "}
                        <span className="source">
                          {context.state.currentNews[2].source}
                        </span>
                      </li>
                    ) : null}
                  </a>
                  <a
                    href={
                      context.state.currentNews[3]
                        ? context.state.currentNews[3].url
                        : null
                    }
                  >
                    {context.state.currentNews[3] ? (
                      <li className="quote-news-title">
                        {" "}
                        {context.state.currentNews[3].headline + " | "}
                        <span className="source">
                          {context.state.currentNews[3].source}
                        </span>
                      </li>
                    ) : null}
                  </a>
                  <a
                    href={
                      context.state.currentNews[4]
                        ? context.state.currentNews[4].url
                        : null
                    }
                  >
                    {context.state.currentNews[4] ? (
                      <li className="quote-news-title">
                        {" "}
                        {context.state.currentNews[4].headline + " | "}
                        <span className="source">
                          {context.state.currentNews[4].source}
                        </span>
                      </li>
                    ) : null}
                  </a>
                  <a
                    href={
                      context.state.currentNews[5]
                        ? context.state.currentNews[5].url
                        : null
                    }
                  >
                    {context.state.currentNews[5] ? (
                      <li className="quote-news-title">
                        {" "}
                        {context.state.currentNews[5].headline + " | "}
                        <span className="source">
                          {context.state.currentNews[5].source}
                        </span>
                      </li>
                    ) : null}
                  </a>
                </ul>
              </React.Fragment>
            ) : null}
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default News;
