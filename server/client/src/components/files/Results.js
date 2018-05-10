import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import '../../styling/Results.css';


class Results extends Component {
  render() {
    var arr = _.values(this.props.location.state.fileAnalysis);
    if (typeof arr !== undefined && arr.length > 0) {
      console.log(arr);
      var labels_find = Object.keys(arr[0]);
      var item_lenght = labels_find.length;
      var data_values = [];
      for (var x = 0; x < item_lenght; x++) {
        data_values[x] = 0;
      }
      arr.forEach(function(arrayitems) {
        x = 0;
        for (var y in arrayitems) {
          if (x < item_lenght) {
            data_values[x] = data_values[x] + arrayitems[y];
            x++;
          }
        }
      });

      var sum = 0;
      for (var n in data_values) {
        sum += data_values[n];
      }

      if (sum === 0) {
        return (
          <div>
            <h2 className="center" style={{ color: 'white' }}>
              No Data to Display
            </h2>
            <div className="center">
              <Link to="/home" className="btn waves-effect waves-light blue">
                Return Home
              </Link>
            </div>
          </div>
        );
      }

      const data = {
        labels: labels_find,
        datasets: [
          {
            label: 'Analysis Results',
            backgroundColor: '#ff8f00',
            borderColor: '#ff6f00',
            borderWidth: 3,
            hoverBackgroundColor: '#fff8e1',
            hoverBorderColor: '#ffecb3',
            data: data_values
          }
        ]
      };

      return (
        <div style={{
          marginTop: '30px',
          marginLeft: '50px',
          marginRight: '50px'
        }}>
          <h2 className="center" style={{ color: 'white'}}>
            Results
          </h2>
          <Bar
            data={data}
            width={100}
            height={100}
            options={{
              maintainAspectRatio: false,
              legend: {
                labels: {
                  fontColor: 'white',
                  fontSize: 18
                }
              },
              scales: {
                xAxes: [{
                    ticks: {
                      fontColor: 'white',
                      fontSize: 14,
                      fontStyle: 'normal',
                      beginAtZero: true
                    },
                    gridLines: {
                      color: 'white'
                    }
                  }],

                yAxes: [{
                  ticks: {
                    fontColor: 'white',
                  },
                  gridLines: {
                    color: 'white'
                  }
                }]
              }
            }}
          />
          <div className="center">
            <Link to="/home" className="btn waves-effect waves-light blue">
              Return Home
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h2 className="center" style={{ color: 'white' }}>
            No Data to Display
          </h2>
          <div className="center">
            <Link to="/home" className="btn waves-effect waves-light blue">
              Return Home
            </Link>
          </div>
        </div>
      );
    }
  }
}

export default Results;
