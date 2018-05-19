import React from "react";
import ReactAutocomplete from "react-autocomplete";
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
          <ReactAutocomplete
            items={context.state.matchArray}
            getItemValue={item => item.name}
            renderItem={(item, highlighted) => (
              <div
                key={item.symbol}
                style={{
                  backgroundColor: highlighted ? "#eee" : "transparent"
                }}
              >
                {item.name}
              </div>
            )}
            value={context.state.value}
            onChange={context.handleChange}
            onSelect={console.log(this)}
            wrapperStyle={{
              "caretColor": "transparent",
              background: "red"
            }}
          />
        )}
      </MyContext.Consumer>
    );
  }
}
export default Autocomplete;
