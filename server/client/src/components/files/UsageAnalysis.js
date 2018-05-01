import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { post } from 'axios';
import DateTimePicker from 'react-datetime-picker';
import '../../styling/UsageAnalysis.css';

class UsageAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: this.props.location.state.fileName,
      fileAnalysis: null,
      loading: false,
      endDate: new Date(),
      startDate: new Date()
    };

    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.makeRequest = this.makeRequest.bind(this);
  }

  onStartDateChange = startDate => this.setState({ startDate });
  onEndDateChange = endDate => this.setState({ endDate });

  makeRequest() {
    const url = '/api/analyze/usage';
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

    post(url, formData, config)
      .then(res => {
        alert('file analyzed');
        this.setState({ loading: true, fileAnalysis: res.data });
        console.log(this.state);
      })
      .catch(err => {
        console.log(err.response.data);
      });
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
      <div className="UsageAnalysis">
        <div className="row">
          <div className="input-field row s6">
            <label className="active" htmlFor="file_name">
              File Name
            </label>
            <input
              id="file_name"
              type="text"
              className="validate"
              disabled
              value={this.state.fileName}
              onChange={this.makeRequest.bind(this)}
            />
          </div>

          <div className="input-field row s6">
            <div className="input-field col s6">
              <label className="active" htmlFor="dateTimePicker">
                Start Date and Time (O)
              </label>
            </div>
            <div className="input-field col s6">
              <label className="active" htmlFor="endTimePicker">
                End Date and Time (O)
              </label>
            </div>
          </div>
          <div className="input-field row s6">
            <div className="input-field col s6">
              <DateTimePicker
                id="dateTimePicker"
                locale="en-US"
                isWidgetOpen="false"
                maxDetail="second"
                onChange={this.onStartDateChange}
                value={this.state.startDate}
              />
            </div>
            <div className="input-field col s6">
              <DateTimePicker
                id="endTimePicker"
                locale="en-US"
                isWidgetOpen="false"
                maxDetail="second"
                onChange={this.onEndDateChange}
                value={this.state.endDate}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: '300px'
            }}>
            <button
              className="btn waves-effect waves-light right blue"
              onClick={() => {
                this.makeRequest();
              }}>
              Submit
              <i className="material-icons right">done</i>
            </button>
            <Link
              to="/home"
              className="btn waves-effect waves-light grey lighten-2 grey-text text-darken-2 left">
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
              className="btn-large waves-effect waves-light amber">
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

export default connect(mapStateToProps, null)(UsageAnalysis);
