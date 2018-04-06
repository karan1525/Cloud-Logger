import React, { Component } from 'react';
import FilesList from './files/FilesList';
import '../styling/Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <FilesList />
        <a href="/upload">Upload File</a>
      </div>
    );
  }
}

export default Home;
