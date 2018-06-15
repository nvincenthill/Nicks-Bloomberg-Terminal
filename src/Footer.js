import React from "react";
import { MyContext } from "./App.js";

class Footer extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div className="footer">
            <p id="footer-name">
              Copyright © 2018{" "}
              <a href="http://nvincenthill.herokuapp.com/">
                Nicholas Vincent-Hill
              </a>{" "}
              <span className="footer-IEX">
                Data provided for free by{" "}
                <a href="https://iextrading.com/api-exhibit-a"> IEX </a>
              </span>
            </p>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Footer;
