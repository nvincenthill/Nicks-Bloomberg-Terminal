import React from "react";

class Footer extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <div className="footer">
        <p id="footer-name">Copyright © 2018 Nicholas Vincent-Hill</p>
        <p id="footer-iex">Data provided for free by <a href="https://iextrading.com/api-exhibit-a"> IEX </a></p>
      </div>
    );
  }
}
export default Footer;
