import React, { Component } from "react";

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    // this.updateData = this.updateData.bind(this);
  }

  // get data
  getData = async => {
    // let query = this.state.value;
    // fetch("https://api.scryfall.com/cards/named?" + "fuzzy=" + query)
    //   .then(response => response.json())
    //   .then(data => this.setState({ card: data }));
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
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stock Quote Generator</h1>
        </header>
        <p className="App-intro">Hello World!</p>
      </div>
    );
  }
}

export default App;
