import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class ErrorAnalysis extends Component {
  componentDidMount() {
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      format: 'yyyy-mm-dd',
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: false,
      onClose: function() {
        $(document.activeElement).blur();
      }
    });

    $('.timepicker').pickatime({
      default: 'now',
      twelvehour: false, // change to 12 hour AM/PM clock from 24 hour
      donetext: 'OK',
      autoclose: false,
      vibrate: true // vibrate the device when dragging clock hand
    });
  }

  render() {
    return (
      <div style={{ marginTop: '55px' }}>
        <div className="row">
          <div className="input-field col s12">
            <input
              id="file_name"
              type="text"
              className="validate"
              style={{ fontSize: '20px', marginTop: '5px' }}
              disabled
              value={this.props.location.state.fileName}
            />
            <label
              className="active"
              style={{ fontSize: '25px', color: 'white' }}
              htmlFor="file_name">
              File Name
            </label>
          </div>
          <div className="input-field col s6">
            <input
              placeholder="YYYY/MM/DD"
              id="start_date"
              type="date"
              className="datepicker"
            />
            <label
              className="active"
              style={{ fontSize: '25px', color: 'white' }}
              htmlFor="start_date">
              Start Date
            </label>
          </div>
          <div className="input-field col s6">
            <input
              placeholder="YYYY/MM/DD"
              id="end_date"
              type="date"
              className="datepicker"
            />
            <label
              className="active"
              style={{ fontSize: '25px', color: 'white' }}
              htmlFor="end_date">
              End Date
            </label>
          </div>
          <div className="input-field col s6">
            <input
              placeholder="00:00"
              id="start_time"
              type="time"
              className="timepicker"
            />
            <label
              className="active"
              style={{ fontSize: '25px', color: 'white' }}
              htmlFor="start_time">
              Start Time
            </label>
          </div>
          <div className="input-field col s6">
            <input
              placeholder="00:00"
              id="end_time"
              type="time"
              className="timepicker"
            />
            <label
              className="active"
              style={{ fontSize: '25px', color: 'white' }}
              htmlFor="end_time">
              End Time
            </label>
          </div>
          <div>
            <button
              className="btn waves-effect waves-light left"
              style={{ marginLeft: '250px', marginTop: '10px' }}>
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
      </div>
    );
  }
}

export default ErrorAnalysis;
