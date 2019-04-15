import React from 'react';
import { MyContext } from './App.js';

class News extends React.Component {
  render(props) {
    // create news items
    let newsItems = (
      <MyContext.Consumer>
        {context =>
          context.state.currentNews.map((newsItem, index) => {
            return (
              <li className="quote-news-title" key={index}>
                {console.log(newsItem)}
                {newsItem.headline + ' | '}
                <span className="source">{newsItem.source}</span>
              </li>
            );
          })
        }
      </MyContext.Consumer>
    );
    return <div>{newsItems}</div>;
  }
}
export default News;
