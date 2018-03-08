import React, { Component } from 'react';
import logo from '../styling/graphic_elements/cloud_logo.svg';
import '../styling/Header.css';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <header className="Header-banner">
          <img src={logo} className="Header-logo" alt="logo" />
          <h1>CLOUD LOGGER</h1>
          <button type="button">Google Log In</button>
        </header>
      </div>
    );
  }
}

export default Header;
