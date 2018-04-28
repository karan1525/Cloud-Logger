import React, { Component } from 'react';

class Results extends Component {
  render() {
    return <h2>{this.props.location.state.fileAnalysis}.</h2>;
  }
}

export default Results;
