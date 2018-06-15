import React from "react";
import { MyContext } from "./App.js";
import { Collapse } from "react-collapse";
import Input from "./Input";

class Header extends React.Component {
  state = {};

  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <Collapse isOpened={context.state.headerDisplayed}>
            <header className="header">
              <h1 className="App-title" onClick={() => context.handleClick()}>
                {context.state.title}
              </h1>
              <Input />
            </header>
          </Collapse>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Header;
