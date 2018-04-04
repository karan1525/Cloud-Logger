import React, { Component } from 'react';
import '../styling/Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>This is home.</h1>
        <a href="/upload">Upload File</a>
      </div>
    );
  }
}

export default Home;
