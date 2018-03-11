import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';

const fileUpload = () => <h2>File Upload!</h2>;

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/upload" component={fileUpload} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
