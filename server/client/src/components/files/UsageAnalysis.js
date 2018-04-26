import React, { Component } from 'react';

class ErrorAnalysis extends Component {
  render() {
    return <h1>{this.props.location.state.fileName}</h1>;
  }
}

export default ErrorAnalysis;
