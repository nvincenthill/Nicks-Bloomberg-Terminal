import React from "react";
import { Button, Well } from "react-bootstrap";

class DataWell extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <Well>
        <p> Submit a ticker </p>
        <div>
          <h2>Name</h2>
          <h3>Price</h3>
          <p>Chg on Day</p>
          <p>Mrk Cap</p>
          <p>P/E</p>
          <ul>
            <li> </li>
            <li> </li>
            <li> </li>
            <li> </li>
            <li> </li>
          </ul>
        </div>
      </Well>
    );
  }
}
export default DataWell;
