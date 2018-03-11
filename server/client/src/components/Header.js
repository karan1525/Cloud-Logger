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
          <div className="right">
            <a className="waves-effect waves-light btn white black-text">
              Login with Google
            </a>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
