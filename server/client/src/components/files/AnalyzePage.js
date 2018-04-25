import React, { Component } from 'react';
import '../../styling/AnalyzePage.css';

class AnalyzePage extends Component {
  componentDidMount() {
    const receivedMessage = this.props.location.state.fileName;
    console.log(receivedMessage);
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
            <button className="waves-effect waves-light btn-large left">
              Error Analysis
            </button>
            <button className="waves-effect waves-light btn-large right">
              Usage Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AnalyzePage;
