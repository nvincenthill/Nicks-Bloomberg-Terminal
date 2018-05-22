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
            {context.state.currentCompany ? (
              <div>
                <h2 className="quote-subtitle">SUMMARY</h2>
                <p className="quote-description">
                  {context.state.currentCompany
                    ? context.state.currentCompany.description
                    : null}
                </p>
                {context.state.currentCompany.CEO ? (
                  <p className="quote-peratio">
                    Led by {context.state.currentCEOTitle}{" "}
                    {context.state.currentCompany.CEO}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Summary;
