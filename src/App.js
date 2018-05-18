import React, { Component } from "react";
import { Button } from "react-bootstrap";
import Header from "./Header";
import Footer from "./Footer";
import DataWell from "./DataWell";
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
      buttonText: "Submit"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // get data on a single ticker
  getData = async => {
    let query = this.state.value;
    let endpoint = `https://api.iextrading.com/1.0/stock/${query}/quote`;
    fetch(endpoint).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((responseJson) => {
      this.addData(responseJson)
    })
    .catch((error) => {
      console.log(error)
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
    this.setState({ buttonText: "Update" });
  };

  // find stock by name or ticker
  findMatches = (wordToMatch, stocks) => {
    return stocks.filter(stock => {
      // here we need to figure out if the name or ticker matches what was searched
      const regex = new RegExp(wordToMatch, "gi");
      return stock.symbol.match(regex) || stock.name.match(regex);
    });
  };

  //display matching stocks
  displayMatches = () => {
    let matchArray = this.findMatches(this.state.value, this.state.universe);
    console.log(matchArray);
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    this.displayMatches();
  };

  handleSubmit = () => {
    this.getData();
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

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
        <div className="App">
          <Header />
          <MyContext.Consumer>
            {context => (
              <Collapse isOpened={context.state.dataDisplayed}>
                <DataWell />
              </Collapse>
            )}
          </MyContext.Consumer>
          <MyContext.Consumer>
            {context => (
              <React.Fragment>
                <div className="input">
                  <input
                    type="text"
                    className="search"
                    placeholder="ex. AAPL"
                    onChange={context.handleChange}
                    onKeyPress={context.handleKeyPress}
                  />
                  <Button
                    className="submit-button"
                    onClick={context.handleSubmit}
                  >
                    {context.state.buttonText}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </MyContext.Consumer>
          <Footer />
        </div>
      </MyProvider>
    );
  }
}

export default App;
export { MyContext };
