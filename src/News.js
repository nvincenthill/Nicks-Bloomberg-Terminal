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
    const numbers = [0, 1, 2, 3];
    let newsItems = numbers.map(number => (
      <MyContext.Consumer>
        {context =>
          context.state.currentQuote.latestPrice ? (
            <li className="quote-news-title">
              {context.state.currentNews[number].headline + " | "}
              <span className="source">
                {context.state.currentNews[number].source}
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
                  {newsItems}
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
