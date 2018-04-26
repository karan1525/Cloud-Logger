import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            <h2 style={{ marginBottom: '50px' }}>
              CHOOSE THE TYPE OF ANALYSIS
            </h2>
            <Link
              className="waves-effect waves-light btn-large left"
              to={{
                pathname: '/errorAnalysis',
                state: { fileName: this.props.location.state.fileName }
              }}>
              Error Analysis
            </Link>
            <Link
              className="waves-effect waves-light btn-large right"
              to={{
                pathname: '/usageAnalysis',
                state: { fileName: this.props.location.state.fileName }
              }}>
              Usage Analysis
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default AnalyzePage;
