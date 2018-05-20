import React from "react";
import { MyContext } from "./App.js";

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
          <header className="header">
            <h1 className="App-title">{context.state.title}</h1>
          </header>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Header;
