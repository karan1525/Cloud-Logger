import React, { Component } from 'react';
import FilesList from './files/FilesList';
import '../styling/Home.css';

class Home extends Component {
  render() {
    return [
      <div>
        <FilesList />
      </div>,
      <div style={{textAlign:"center"}}>
        <a href="/upload"><a class="waves-effect waves-light btn-large blue" >New File</a></a>
      </div>
    ];
  }
}

export default Home;
