import React, { Component } from "react";
import GithubCorner from "react-github-corner";
import datejs from "datejs";
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
      chartDataPrices: [],
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
      ceoTitles: [
        "Supreme Commander",
        "Archduke",
        "Baron",
        "High Marshall",
        "Emperor",
        "King of Kings",
        "Maharajadhiraja",
        "Exhalted Shogun"
      ],
      currentCEOTitle: "",
      currentChartButton: "5Y",
      SPYData: {}
    };

    this.handleChange = this.handleChange.bind(this);
    // this.updateQuote = this.updateQuote.bind(this);
    this.getQuote = this.getQuote.bind(this);
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

    this.getQuote(query);
  };

  // get live quote
  getQuote = async query => {
    let endpoint = `https://api.iextrading.com/1.0/stock/${query}/batch?types=quote`;
    let quoteGetter = setInterval(() => {
      if (this.state.value != query) {
        clearInterval(quoteGetter);
      }
      this.updateQuote(endpoint);
    }, 5000);
  };

  updateQuote = endpoint => {
    console.log("getting quote");
    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(responseJson => {
        this.setState({ currentQuote: responseJson.quote });
      })
      .catch(error => {
        console.log(error);
      });
  };

  // get data on a the S&P500
  getSPYData = async => {
    let query = "SPY";
    let endpoint = `https://api.iextrading.com/1.0/stock/${query}/batch?types=stats,quote,chart&range=5y`;

    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(responseJson => {
        this.setState({ SPYData: responseJson });
      })
      .catch(error => {
        console.log(error);
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
    this.setState({ buttonText: "UPDATE" });
    this.setState({ footerDisplayed: true });
    this.setState({ ChartData: data.chart });
    this.setState({ chartDataPrices: price });
    this.setState({ chartDataPricesImmutable: price });
    this.setState({ chartDataDates: dates });
    this.setState({ chartDataDatesImmutable: dates });

    let randomTitleIndex = Math.floor(
      Math.random() * (this.state.ceoTitles.length - 1)
    );
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
    this.setState({ currentChartButton: "5Y" });
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
    let dates = this.state.chartDataDatesImmutable;
    let prices = this.state.chartDataPricesImmutable;

    // format button style
    this.setState({ currentChartButton: range });

    // get today's date
    let today = new Date();

    // format as date objects
    let newDates = [];

    for (let i = 0; i < dates.length; i++) {
      newDates.push(new Date(dates[i]));
    }

    // filter array for required range
    let startDate;
    if (range === "5Y") {
      startDate = (5).years().ago();
    } else if (range === "1Y") {
      startDate = (1).years().ago();
    } else if (range === "1M") {
      startDate = (1).months().ago();
    } else if (range === "MTD") {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (range === "YTD") {
      startDate = Date.parse("Last December 31");
    } else if (range === "1D") {
      startDate = (1).days().ago();
    }

    let filteredDates = [];

    for (let j = 0; j < newDates.length; j++) {
      if (newDates[j] >= startDate && newDates[j] <= today) {
        filteredDates.push(this.parseDateToReadable(newDates[j]));
      }
    }

    this.setChartLength(prices, filteredDates);
  };

  setChartLength = (prices, dates) => {
    // slice prices to correct length
    prices = prices.slice(-dates.length);

    // set state with updated range
    this.setState({ chartDataDates: dates });
    this.setState({ chartDataPrices: prices });
  };

  parseDateToReadable = date => {
    let mm = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();

    return [
      date.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd
    ].join("-");
  };

  // clear placeholder
  clearPlaceholder = () => {
    // this.setState({ placeholder: "" });
    // this.setState({ value: "" });
  };

  // handle click on title
  handleClick = () => {
    if (this.state.dataDisplayed === true) {
      this.setState({ dataDisplayed: false });
      this.setState({ buttonText: "SUBMIT" });
    }
  };

  // get universe on page load
  componentWillMount() {
    this.getUniverse();
    this.getSPYData();
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
          clearPlaceholder: this.clearPlaceholder,
          handleClick: this.handleClick
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
              <GithubCorner
                href="https://github.com/nvincenthill/stock-quote-app"
                octoColor="#222"
                bannerColor="#eeeeee"
                className="corner"
              />
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
