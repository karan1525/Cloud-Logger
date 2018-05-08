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
import Results from './files/Results';
import NotFoundPage from './NotFoundPage';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  privateRoutes() {
    return (
      <Route exact path="/upload" component={Upload} />,
      <Route exact path="/analyze" component={AnalyzePage} />,
      <Route exact path="/errorAnalysis" component={ErrorAnalysis} />,
      <Route exact path="/usageAnalysis" component={UsageAnalysis} />,
      <Route exact path="/results" component={Results} />,
      <Route path="/home" component={Home} />
    );
  }

  getComponentToDisplay() {
    if (window.location.pathname === '/') {
      return <Route exact path="/" component={Landing} />;
    } else {
      return <NotFoundPage />;
    }
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            {/* <Route exact path="/" component={Landing} /> */}
            {this.props.auth
              ? this.privateRoutes()
              : this.getComponentToDisplay()}
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(App);
