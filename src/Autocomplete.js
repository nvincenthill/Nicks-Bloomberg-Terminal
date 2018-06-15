import React from "react";
import { MyContext } from "./App.js";

class Autocomplete extends React.Component {
  state = {};

  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <div className="autocomplete">
            <ul>
              <li onClick={context.handleSubmit}>
                {context.state.matchArray[0] !== undefined
                  ? context.state.matchArray[0].name
                  : null}
              </li>
              <li>
                {context.state.matchArray[1] !== undefined
                  ? context.state.matchArray[1].name
                  : null}
              </li>
              <li>
                {context.state.matchArray[2] !== undefined
                  ? context.state.matchArray[2].name
                  : null}
              </li>
              <li>
                {context.state.matchArray[3] !== undefined
                  ? context.state.matchArray[3].name
                  : null}
              </li>
            </ul>
          </div>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Autocomplete;
