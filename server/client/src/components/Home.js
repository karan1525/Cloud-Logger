import React, { Component } from 'react';
import FilesList from './files/FilesList';
import '../styling/Home.css';

class Home extends Component {
  render() {
    return [
      <div key="files">
        <FilesList />
      </div>,
      <div key="upload" style={{ textAlign: 'center' }}>
        <a href="/upload" className="waves-effect waves-light btn-large blue">
          New File
        </a>
      </div>
    ];
  }
}

export default Home;
