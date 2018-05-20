import React from "react";
import { MyContext } from "./App.js";

class Summary extends React.Component {
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div className="quote-summary">
            <h2 className="quote-subtitle">SUMMARY</h2>
            <p className="quote-description">
              {context.state.currentCompany
                ? context.state.currentCompany.description
                : null}
            </p>
            <p className="quote-peratio">
              Led by Supreme Commander {context.state.currentCompany
                ? context.state.currentCompany.CEO
                : null}
            </p>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Summary;
