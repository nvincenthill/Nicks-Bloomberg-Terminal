import React, { Component } from "react";

import Header from "./Header";
import Footer from "./Footer";
import DataWell from "./DataWell";
import Input from "./Input";
import { Collapse } from "react-collapse";

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentQuote: {},
      dataDisplayed: false,
      value: "",
      universe: [],
      displayedStock: "AAPL",
      buttonText: "Submit",
      inputClass: "search",
      matchArray: [],
      autocompleteDisplayed: true,
      placeholder: "ex. AAPL, Apple Inc., ..."
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // get data on a single ticker
  getData = async => {
    let query = this.state.value;
    let endpoint = `https://api.iextrading.com/1.0/stock/${query}/quote`;
    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(responseJson => {
        this.addData(responseJson);
      })
      .catch(error => {
        console.log(error);
        this.setState({ inputClass: "animated shake search red" });
        setTimeout(() => this.setState({ inputClass: "search" }), 1000);
      });
  };

  // get universe of options from IEX
  getUniverse = async => {
    let endpoint = "https://api.iextrading.com/1.0/ref-data/symbols";
    fetch(endpoint)
      .then(response => response.json())
      .then(data => this.setState({ universe: data }));
  };

  // add data to state
  addData = data => {
    this.setState({ currentQuote: data });
    this.setState({ dataDisplayed: true });
    this.setState({ autocompleteDisplayed: false });
    this.setState({ value: "" });
    this.setState({ buttonText: "Update" });
  };

  // find stock by name or ticker
  findMatches = (wordToMatch, stocks) => {
    return stocks.filter(stock => {
      let result = [];
      // here we need to figure out if the name or ticker matches what was searched
      const regex = new RegExp(wordToMatch, "gi");
      result = stock.symbol.match(regex) || stock.name.match(regex);
      return result;
    });
  };

  //display matching stocks
  displayMatches = () => {
    let matchArray = this.findMatches(this.state.value, this.state.universe);
    matchArray = matchArray.slice(0, 50);
    console.log(matchArray, this.state.value);
    this.setState({ matchArray: matchArray });
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.setState({ autocompleteDisplayed: true });
    this.displayMatches();
  };

  handleSubmit = () => {
    this.getData();
  };

  // handle a key pressed and submit if "enter" is pressed
  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.handleSubmit();
    }
  };

  // get universe on page load
  componentWillMount() {
    this.getUniverse();
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          getData: this.getData,
          handleChange: this.handleChange,
          handleSubmit: this.handleSubmit,
          handleKeyPress: this.handleKeyPress
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

class App extends Component {
  render() {
    return (
      <MyProvider>
        <MyContext.Consumer>
          {context => (
            <div className="App">
              <Collapse isOpened={!context.state.dataDisplayed}>
                <Header />
              </Collapse>

              <Collapse isOpened={context.state.dataDisplayed}>
                <DataWell />
              </Collapse>
            </div>
          )}
        </MyContext.Consumer>
        <Input />
        <Footer />
      </MyProvider>
    );
  }
}

export default App;
export { MyContext };
