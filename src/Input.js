import React from "react";
import { MyContext } from "./App.js";
import Autocomplete from "./Autocomplete";
import { Collapse } from "react-collapse";
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
            <div className="input-container">
              <div className="input">
                <input
                  type="text"
                  className={context.state.inputClass}
                  placeholder={context.state.placeholder}
                  onChange={context.handleChange}
                  onKeyPress={context.handleKeyPress}
                  value={context.state.value}
                />
              </div>
              <Button className="btn-success submit-button" onClick={context.handleSubmit}>
                {context.state.buttonText}
              </Button>
            </div>
          </React.Fragment>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Input;
