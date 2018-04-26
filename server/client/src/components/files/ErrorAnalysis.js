import React, { Component } from 'react';
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
  }

  render() {
    return (
      <div>
        <div className="center">
          <h4 className="white-text">
            Analyze the file: {this.props.location.state.fileName}
          </h4>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input
              placeholder="YYYY/MM/DD"
              id="start_date"
              type="date"
              className="datepicker"
            />
            <label
              className="active"
              style={{ fontSize: '20px' }}
              for="start_date">
              Start Date
            </label>
          </div>
          <div class="input-field col s6">
            <input
              placeholder="YYYY/MM/DD"
              id="end_date"
              type="date"
              className="datepicker"
            />
            <label
              className="active"
              style={{ fontSize: '20px' }}
              for="end_date">
              End Date
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorAnalysis;
