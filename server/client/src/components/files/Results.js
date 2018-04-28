import React, { Component } from 'react';

class Results extends Component {
  checkIfData() {
    if (this.props.location.state.fileAnalysis) {
      return <h2>GOT IT</h2>;
    } else {
      return <h2>NOPE!</h2>;
    }
  }

  render() {
    return this.checkIfData();
  }
}

export default Results;
