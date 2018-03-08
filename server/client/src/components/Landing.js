import React, { Component } from 'react';
import Header from './Header';
import '../styling/Body.css';

class Landing extends Component {
  render() {
    return (
      <div>
        <Header />,
        <div className="Body">
          <h1>LOG YOUR FILES.</h1>
          <h1>GAIN INSIGHT FROM ERRORS.</h1>
          <h2>HARDER. BETTER. FASTER. STRONGER.</h2>
        </div>
      </div>
    );
  }
}

export default Landing;
