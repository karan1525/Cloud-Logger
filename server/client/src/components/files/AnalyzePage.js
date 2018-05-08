import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styling/AnalyzePage.css';

class AnalyzePage extends Component {
  componentDidMount() {
    const receivedMessage = this.props.location.state.fileName;
    console.log(receivedMessage);
  }

  render() {
    return [
      <div key="analyzePage" className="AnalyzePage">
        <div className="container">
          <div className="center">
            <h2 style={{ marginBottom: '50px' }}>
              CHOOSE THE TYPE OF ANALYSIS:
            </h2>
            <div
              className="buttons"
              style={{
                marginRight: '15px'
              }}>
              <Link
                className="waves-effect waves-light btn-large amber darken-2"
                to={{
                  pathname: '/errorAnalysis',
                  state: { fileName: this.props.location.state.fileName }
                }}>
                Error Analysis
              </Link>
            </div>
            <div
              className="buttons"
              style={{
                marginLeft: '15px'
              }}>
              <Link
                className="waves-effect waves-light btn-large amber darken-2"
                to={{
                  pathname: '/usageAnalysis',
                  state: { fileName: this.props.location.state.fileName }
                }}>
                Usage Analysis
              </Link>
            </div>
          </div>
        </div>
      </div>,
      <div
        key="backHomeButton"
        align="center"
        style={{
          marginTop: '15px'
        }}>
        <a
          href="/home"
          className="waves-effect waves-teal btn-flat grey-text text-darken-2">
          Back Home
        </a>
      </div>
    ];
  }
}

export default AnalyzePage;
