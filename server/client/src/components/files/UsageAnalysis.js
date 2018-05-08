import 'react-dates/initialize';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { post } from 'axios';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import { DateRangePicker } from 'react-dates';
import 'rc-time-picker/assets/index.css';
import '../../styling/UsageAnalysis.css';
import 'react-dates/lib/css/_datepicker.css';

class UsageAnalysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: this.props.location.state.fileName,
      fileAnalysis: null,
      loading: false,
      calendarFocused: null,
      startDate: moment(),
      endDate: moment(),
      startTime: moment(),
      endTime: moment(),
      timeAndDate: false
    };

    this.makeRequest = this.makeRequest.bind(this);
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({
      startDate: startDate,
      endDate: endDate,
      timeAndDate: true
    });
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };

  onStartTimeChange = value => {
    this.setState({ startTime: value });
  };

  onEndTimeChange = value => {
    this.setState({ endTime: value });
  };

  makeRequest() {
    const url = '/api/analyze/usage';
    const fileName = this.state.fileName;
    const formData = new FormData();
    const id = this.getUserId();
    if (this.state.timeAndDate === true) {
      const startDateTime = this.state.startDate + ' ' + this.state.startTime;
      const endDateTime = this.state.endDate + ' ' + this.state.endTime;
      formData.append('start', startDateTime);
      formData.append('end', endDateTime);
    }
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
        if (err.response.status === 422) {
          alert('Your file did not contain any logs. Try a different file');
          window.location.href = '/home';
        } else {
          alert('Something went wrong. Try again.');
        }
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
                Start and End Date (0)
              </label>
            </div>
            <div className="input-field col s6">
              <label className="active" htmlFor="endTimePicker">
                Start and End Time (O)
              </label>
            </div>
          </div>
          <div className="input-field row s6">
            <div className="input-field col s6">
              <DateRangePicker
                startDate={this.state.startDate}
                startDateId="startDate"
                endDate={this.state.endDate}
                endDateId="endDate"
                onDatesChange={this.onDatesChange}
                focusedInput={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                showClearDates={true}
                displayFormat="YYYY-MM-DD"
                numberOfMonths={1}
                isOutsideRange={() => false}
              />
            </div>
            <div className="input-field col s6">
              <TimePicker
                showSecond={true}
                onChange={this.onStartTimeChange}
                style={{ width: '100px', marginRight: '60px' }}
              />
              <TimePicker
                showSecond={true}
                onChange={this.onEndTimeChange}
                style={{ width: '100px', marginLeft: '30px' }}
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
