import React, { Component } from "react";
import { Button, Well } from "react-bootstrap";
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
      data: [],
      dataDisplayed: false
    };

    // this.updateData = this.updateData.bind(this);
  }

  // get data on a single ticker
  getData = async => {
    let query = this.state.value;

    fetch("https://api.iextrading.com/1.0/ref-data/symbols")
      .then(response => response.json())
      .then(data => this.addData(data));
  };

  // get universe of options from IEX
  getUniverse = async => {
    let query = this.state.value;
    let endpoint = "https://api.iextrading.com/1.0/ref-data/symbols"
    fetch(endpoint)
      .then(response => response.json())
      .then(data => this.setState({ universe: data }));
  };

  // add data to state
  addData = data => {
    let joined = this.state.data.concat(data);
    this.setState({ data: joined });
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
          getData: this.getData
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
          <div>
            <input type="text" class="search" placeholder="ex. AAPL" />
          </div>
          <div>
            <Button className="submit-button">Submit</Button>
          </div>

          <Footer />
        </div>
      </MyProvider>
    );
  }
}

export default App;
