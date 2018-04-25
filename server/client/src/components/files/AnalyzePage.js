import React, { Component } from 'react';
import '../../styling/AnalyzePage.css';

class AnalyzePage extends Component {
  componentDidMount() {
    const receivedMessage = this.props.location.state.fileName;
    console.log(receivedMessage);
  }

  constructor() {
    super();
    this.state = {
      errorButtonVisible: false,
      usageButtonVisible: false
    };
  }

  toggleError() {
    this.setState(prevState => ({
      errorButtonVisible: !prevState.errorButtonVisible
    }));
  }

  toggleUsage() {
    this.setState(prevState => ({
      usageButtonVisible: !prevState.usageButtonVisible
    }));
  }

  render() {
    return (
      <div className="AnalyzePage">
        <div className="container">
          <div className="center">
            <h2>{this.props.location.state.fileName}</h2>
            <h2 style={{ marginBottom: '50px' }}>
              CHOOSE THE TYPE OF ANALYSIS
            </h2>
            <button
              onClick={() => this.toggleError()}
              className="waves-effect waves-light btn-large left">
              Error Analysis
            </button>
            {this.state.errorButtonVisible ? <h2>HELLO!</h2> : null}
            <button
              onClick={() => this.toggleUsage()}
              className="waves-effect waves-light btn-large right">
              Usage Analysis
            </button>
            {this.state.usageButtonVisible ? <h2>HELLO!</h2> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default AnalyzePage;
