import React, { Component } from "react";
import { Button } from "react-bootstrap";

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {}
    };

    // this.updateData = this.updateData.bind(this);
  }

  // get data
  getData = async => {
    let query = this.state.value;
    fetch("https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb,tsla,goog,msft,gild&types=quote,news,chart&range=1m&last=5")
      .then(response => response.json())
      .then(data => this.setState({ data: data }));
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state
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
        <header className="App-header">
          <h1 className="App-title">Stock Quote Generator</h1>
        </header>
        <div>
        <input></input>
        </div>
        <div>
        <Button>Submit</Button>
        </div>
      </div>
      </MyProvider>
    );
  }
}

export default App;
