import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Navbar from '../components/layout/Navbar';

// Containers
import Random from '../containers/Random';
import Saved from '../containers/Saved';
import Trending from '../containers/Trending';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <div>
        <Navbar />
        <div className="application-content">
          <Switch location={this.props.location}>
            <Route path="/random" component={Random} />
            <Route path="/saved" component={Saved} />
            <Route path="/trending" component={Trending} />
          </Switch>
        </div>
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
