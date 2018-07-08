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
          <Collapse
            isOpened={!context.state.dataDisplayed}
            forceInitialAnimation={true}
          >
            <img src="shroombergWallpaper.png" alt="did not load" className="wallpaper" />
          </Collapse>
        )}
      </MyContext.Consumer>
    );
  }
}
export default Wallpaper;
