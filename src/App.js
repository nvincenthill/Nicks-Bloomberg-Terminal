import React, { Component } from 'react';

import GithubCorner from 'react-github-corner';
import Header from './Header';
import Footer from './Footer';
import DataWell from './DataWell';
import Wallpaper from './Wallpaper';
import { Fade } from 'react-reveal';

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: 'Shroomberg',
      currentQuote: {},
      chartDataPrices: [],
      chartDataDates: [],
      dataDisplayed: false,
      value: '',
      universe: [],
      displayedStock: 'AAPL',
      buttonText: 'SUBMIT',
      inputClass: 'search',
      matchArray: [],
      autocompleteDisplayed: true,
      headerDisplayed: true,
      footerDisplayed: true,
      placeholder: 'ex. AAPL, TSLA, GE',
      ceoTitles: [
        'Supreme Commander',
        'Archduke',
        'Baron',
        'High Marshall',
        'Emperor',
        'King of Kings',
        'Maharajadhiraja',
        'Exhalted Shogun'
      ],
      currentCEOTitle: '',
      currentChartButton: '5Y',
      SPYData: {},
      chartShouldRedraw: false,
      SPYPrices: []
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
          throw new Error('Something went wrong');
        }
      })
      .then(responseJson => {
        this.addData(responseJson);
      })
      .catch(error => {
        console.log(error);
        this.setState({ inputClass: 'animated shake search red' });
        setTimeout(() => this.setState({ inputClass: 'search' }), 1000);
      });

    this.getQuote(query);
  };

  // get 1D price data on a single ticker
  getOneDayChartData = async => {
    let query = this.state.value;
    let endpoint = `https://api.iextrading.com/1.0/stock/${query}/batch?types=chart&range=1d`;

    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(responseJson => {
        this.addOneDayData(responseJson);
      })
      .catch(error => {
        console.log(error);
        this.setState({ inputClass: 'animated shake search red' });
        setTimeout(() => this.setState({ inputClass: 'search' }), 1000);
      });

    this.getQuote(query);
  };

  // get live quote
  getQuote = async query => {
    let endpoint = `https://api.iextrading.com/1.0/stock/${query}/batch?types=quote,chart&range=1d`;
    let quoteGetter = setInterval(() => {
      if (this.state.value !== query) {
        clearInterval(quoteGetter);
      }
      this.updateQuote(endpoint);
    }, 10000);
  };

  // update IEX live price
  updateQuote = endpoint => {
    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(responseJson => {
        this.setState({ currentQuote: responseJson.quote });
        this.addOneDayData(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // get data on a the S&P500
  getSPYData = async => {
    let query = 'SPY';
    let endpoint = `https://api.iextrading.com/1.0/stock/${query}/batch?types=stats,quote,chart&range=5y`;

    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(responseJson => {
        this.addSPYData(responseJson);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // get universe of options from IEX
  getUniverse = async => {
    let endpoint = 'https://api.iextrading.com/1.0/ref-data/symbols';
    fetch(endpoint)
      .then(response => response.json())
      .then(data => this.setState({ universe: data }));
  };

  addOneDayData = data => {
    let OneDayPrices = [];
    let OneDayDates = [];
    for (let i = 0; i < data.chart.length; i++) {
      let time = data.chart[i].label + ' ' + data.chart[i].date;
      let formattedTime = Date.parse(time);
      OneDayPrices.push(data.chart[i].close);
      OneDayDates.push(formattedTime);
    }

    this.setState({ OneDayPrices: OneDayPrices, OneDayDates: OneDayDates });
  };

  // add SPY data to state
  addSPYData = data => {
    this.setState({ SPYData: data });
    let prices = [];

    for (let i = 0; i < data.chart.length; i++) {
      prices.push(data.chart[i].close);
    }

    this.setState({ SPYPrices: prices });
  };

  // add data to state
  addData = data => {
    let prices = [];
    let dates = [];

    for (let i = 0; i < data.chart.length; i++) {
      prices.push(data.chart[i].close);
      dates.push(data.chart[i].date);
    }

    let record = Array.from(prices);

    this.setState({
      currentData: data,
      currentNews: data.news,
      currentQuote: data.quote,
      currentStats: data.stats,
      currentCompany: data.company,
      dataDisplayed: true,
      autocompleteDisplayed: false,
      headerDisplayed: true,
      buttonText: 'UPDATE',
      footerDisplayed: true,
      ChartData: data.chart,
      chartDataPrices: prices,
      chartDataPricesRecord: record,
      chartDataDates: dates,
      chartDataDatesImmutable: dates
    });

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
      const regex = new RegExp(wordToMatch, 'gi');
      result = stock.symbol.match(regex) || stock.name.match(regex);
      return result;
    });
  };

  // display matching stocks
  displayMatches = () => {
    let matchArray = this.findMatches(this.state.value, this.state.universe);
    matchArray = matchArray.slice(0, 50);
    this.setState({ matchArray: matchArray });
  };

  // handle user input changes
  handleChange = event => {
    this.setState({ value: event.target.value });
    this.setState({ autocompleteDisplayed: true });
    this.displayMatches();
  };

  // handle submit button press
  handleSubmit = () => {
    this.getData();
    this.getOneDayChartData();
    this.setState({ currentChartButton: '5Y' });
  };

  // handle a key pressed and submit if "enter" is pressed
  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  };

  // handle chart range change
  handleChartRangeChange = range => {
    // take a copy of state
    let dates = this.state.chartDataDatesImmutable;

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
    if (range === '5Y') {
      startDate = (5).years().ago();
    } else if (range === '1Y') {
      startDate = (1).years().ago();
    } else if (range === '1M') {
      startDate = (1).months().ago();
    } else if (range === 'MTD') {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (range === 'YTD') {
      startDate = Date.parse('Last December 31');
    } else if (range === '1D') {
      startDate = (1).days().ago();
    }

    let filteredDates = [];
    for (let j = 0; j < newDates.length; j++) {
      if (newDates[j] >= startDate && newDates[j] <= today) {
        filteredDates.push(this.parseDateToReadable(newDates[j]));
      }
    }

    if (range === '1D') {
      this.setChartLength(this.state.OneDayDates, true);
    } else {
      this.setChartLength(filteredDates, false);
    }
  };

  setChartLength = (dates, OneDayGraph) => {
    // slice prices to correct length
    let newPrices = this.state.chartDataPricesRecord.slice(-dates.length);
    // set state with updated range
    this.setState({ chartDataDates: dates });
    if (OneDayGraph) {
      this.setState({ chartDataPrices: this.state.OneDayPrices });
    } else {
      this.setState({ chartDataPrices: newPrices });
    }

    this.setRedraw();
  };

  // parse date to a human readable format
  parseDateToReadable = date => {
    let mm = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();

    return [
      date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-');
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
      this.setState({ buttonText: 'SUBMIT' });
    }
  };

  // set chart redraw state
  setRedraw = () => {
    this.setState({ chartShouldRedraw: true });
    setTimeout(() => this.setState({ chartShouldRedraw: false }), 100);
  };

  // get universe on page load
  componentWillMount() {
    this.getUniverse();
    this.getSPYData();
  }

  // call on window resized
  componentDidMount() {
    window.addEventListener('resize', () => this.forceUpdate());
  }

  // render context provider component
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
          handleClick: this.handleClick,
          setRedraw: this.setRedraw
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

// create App component
class App extends Component {
  render() {
    return (
      <MyProvider>
        <MyContext.Consumer>
          {context => (
            <Fade>
              <div className="App">
                <GithubCorner
                  href="https://github.com/nvincenthill/stock-quote-app"
                  octoColor="#222"
                  bannerColor="#eeeeee"
                  className="corner"
                  size="90"
                />
                <Header />
                <DataWell />
                <Wallpaper />
                <Footer />
              </div>
            </Fade>
          )}
        </MyContext.Consumer>
      </MyProvider>
    );
  }
}

// export app component
export default App;

// export context
export { MyContext };
