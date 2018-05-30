import React from "react";
import { MyContext } from "./App.js";
import { Collapse } from "react-collapse";

class Wallpaper extends React.Component {
  state = {};

  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  render() {
    return (
      <MyContext.Consumer>
        {context => (
          <Collapse isOpened={!context.state.dataDisplayed}>
            <img src="shroombergWallpaper.png" className="wallpaper" />
          </Collapse>
          
        )}
      </MyContext.Consumer>
    );
  }
}
export default Wallpaper;
