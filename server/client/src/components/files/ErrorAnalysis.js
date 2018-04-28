import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { post } from 'axios';
import DateTimePicker from 'react-datetime-picker';

class ErrorAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: this.props.location.state.fileName,
      fileAnalysis: null,
      loading: false,
      date: new Date()
    };

    this.onChange = this.onChange.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
  }

  onChange = date => this.setState({ date });

  makeRequest() {
    const url = '/api/analyze/error';
    const fileName = this.state.fileName;
    const formData = new FormData();
    const id = this.getUserId();
    formData.append('fileName', fileName);
    formData.append('userId', id);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    this.setState({ loading: true }, () => {
      post(url, formData, config)
        .then(res =>
          this.setState({
            fileAnalysis: res.data
          })
        )
        .catch(err => {
          console.log(err.response.data);
        });
    });
    console.log(this.state);
  }

  getUserId() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <h2>YER NOT LOGGED IN</h2>;
      default:
        return this.props.auth.userId;
    }
  }

  render() {
    return (
      <div style={{ marginTop: '55px' }}>
        <div className="row">
          <div className="input-field col s6">
            <input
              id="file_name"
              type="text"
              className="validate"
              style={{ fontSize: '25px', marginTop: '20px', color: 'white' }}
              disabled
              value={this.state.fileName}
              onChange={this.makeRequest.bind(this)}
            />
            <label
              className="active"
              style={{ fontSize: '25px', color: 'white' }}
              htmlFor="file_name">
              File Name
            </label>
          </div>
          <div className="input-field col s6">
            <div
              style={{
                marginTop: '20px',
                fontSize: '15px'
              }}>
              <DateTimePicker
                id="dateTimePicker"
                locale="en-US"
                isWidgetOpen="false"
                maxDetail="second"
                onChange={this.onChange}
                value={this.state.date}
              />
            </div>
            <label
              className="active"
              style={{ fontSize: '25px', color: 'white' }}
              htmlFor="dateTimePicker">
              Start Date and Time
            </label>
          </div>
          <div>
            <button
              className="btn waves-effect waves-light left"
              style={{ marginLeft: '250px', marginTop: '10px' }}
              onClick={() => {
                this.makeRequest();
              }}>
              Submit
              <i className="material-icons right">done</i>
            </button>
            <Link
              to="/home"
              className="btn waves-effect waves-light right red"
              style={{ marginRight: '250px', marginTop: '10px' }}>
              Cancel
              <i className="material-icons right">cancel</i>
            </Link>
          </div>
        </div>
        <div className="center">
          {this.state.loading ? (
            <Link
              to={{
                pathname: '/results',
                state: { fileAnalysis: this.state.fileAnalysis }
              }}
              className="btn waves-effect waves-light"
              style={{ marginTop: '10px' }}>
              View Results
              <i className="material-icons right">check_circle</i>
            </Link>
          ) : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(ErrorAnalysis);
