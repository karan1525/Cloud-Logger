import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Home from './Home';
import Upload from './Upload';
import AnalyzePage from './files/AnalyzePage';
import ErrorAnalysis from './files/ErrorAnalysis';
import UsageAnalysis from './files/UsageAnalysis';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/analyze" component={AnalyzePage} />
            <Route exact path="/errorAnalysis" component={ErrorAnalysis} />
            <Route exact path="/usageAnalysis" component={UsageAnalysis} />
            <Route path="/home" component={Home} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
