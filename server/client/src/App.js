import React, { Component } from 'react';
import logo from './graphic_elements/cloud_logo.svg';
import './styling/Header.css';
import './styling/Body.css';

class App extends Component {
  render() {
    return [
      <div className="Header">
        <header className="Header-banner">
          <img src={logo} className="Header-logo" alt="logo" />
          <h1>CLOUD LOGGER</h1>
          <button type="button">Google Log In</button>
        </header>
      </div>,
      <div className="Body">
        <h1>LOG YOUR FILES.</h1>
        <h1>GAIN INSIGHT FROM ERRORS.</h1>
        <h2>HARDER. BETTER. FASTER. STRONGER.</h2>
        <button type="button">SIGN UP WITH GOOGLE</button>
      </div>
    ];
  }
}

export default App;
