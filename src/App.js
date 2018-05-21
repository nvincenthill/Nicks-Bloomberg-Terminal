import React, { Component } from "react";

import Header from "./Header";
import Footer from "./Footer";
import DataWell from "./DataWell";
import Input from "./Input";


// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Shroomberg",
      currentQuote: {},
      chartDataPrice: [],
      chartDataDates: [],
      dataDisplayed: false,
      value: "",
      universe: [],
      displayedStock: "AAPL",
      buttonText: "SUBMIT",
      inputClass: "search",
      matchArray: [],
      autocompleteDisplayed: true,
      headerDisplayed: true,
      footerDisplayed: true,
      placeholder: "ex. AAPL, TSLA, GE",
      ceoTitles: ['Supreme Commander', 'Archduke', 'Baron', 'High Marshall', 'Emperor', 'King of Kings', 'Maharajadhiraja', 'Exhalted Shogun'],
      currentCEOTitle: "",
      currentChartButton: "5Y"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // get data on a single ticker
  getData = async => {
    let query = this.state.value;
    let endpoint = `https://api.iextrading.com/1.0/stock/${query}/batch?types=quote,stats,company,news,chart&range=5y`;

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
    let price = [];
    let dates = [];

    for (let i = 0; i < data.chart.length; i++) {
      price.push(data.chart[i].close);
      dates.push(data.chart[i].date);
    }
    this.setState({ currentData: data });
    this.setState({ currentNews: data.news });
    this.setState({ currentQuote: data.quote });
    this.setState({ currentStats: data.stats });
    this.setState({ currentCompany: data.company });
    this.setState({ dataDisplayed: true });
    this.setState({ autocompleteDisplayed: false });
    this.setState({ headerDisplayed: true });
    this.setState({ footerDisplayed: true });
    this.setState({ buttonText: "UPDATE" });
    // this.setState({ title: this.state.currentQuote.companyName });
    this.setState({ ChartData: data.chart });

    this.setState({ chartDataPrice: price });
    this.setState({ chartDataDates: dates });

    let randomTitleIndex = Math.floor(Math.random() * (this.state.ceoTitles.length - 1)); 
    this.setState({ currentCEOTitle: this.state.ceoTitles[randomTitleIndex] });
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

  // handle chart range change
  handleChartRangeChange = range => {
    // take a copy of state
    let dates = this.state.ChartDataDates;
    let prices = this.state.ChartDataPrices;
    // filter array for required range
    //TODO
    // set state with updated range
    // this.setState({ chartDataDates: dates });
    // this.setState({ chartDataPrices: prices });
    this.setState({ currentChartButton: range });
  };

  // clear placeholder
  clearPlaceholder = () => {
    this.setState({ placeholder: "" });
    this.setState({ value: "" });
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
          handleKeyPress: this.handleKeyPress,
          handleChartRangeChange: this.handleChartRangeChange,
          clearPlaceholder: this.clearPlaceholder
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
              
                <Header />
              
              <DataWell />
              <Footer />
            </div>
          )}
        </MyContext.Consumer>
      </MyProvider>
    );
  }
}

export default App;
export { MyContext };
