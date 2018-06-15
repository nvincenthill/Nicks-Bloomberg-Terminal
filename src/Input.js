import React from "react";
import { MyContext } from "./App.js";
import { Button } from "react-bootstrap";

class Input extends React.Component {
  state = {};

  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <React.Fragment>
            <input
              type="text"
              className={context.state.inputClass}
              placeholder={context.state.placeholder}
              onChange={context.handleChange}
              onClick={context.clearPlaceholder}
              onKeyPress={context.handleKeyPress}
              value={context.state.value}
            />
            <Button
              className="btn-success submit-button"
              onClick={context.handleSubmit}
            >
              {context.state.buttonText}
            </Button>
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Input;
