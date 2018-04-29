import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';

class Results extends Component {
  checkIfData() {
    if (this.props.location.state.fileAnalysis) {
      console.log(this.props.location.state.fileAnalysis);
      return <h2>GOT IT</h2>;
    } else {
      return <h2>NOPE!</h2>;
    }
  }

  render() {
    console.log(this.props.location.state.fileAnalysis);
    var arr = _.values(this.props.location.state.fileAnalysis);
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
    console.log(data_values);
    const data = {
      labels: labels_find,
      datasets: [
        {
          label: 'Analysis Results',
          backgroundColor: 'rgba(255,99,132,0.75)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 3,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'black',
          data: data_values
        }
      ]
    };

    return (
      <div style={{ marginTop: '30px' }}>
        <h2 className="center" style={{ color: 'white' }}>
          Results
        </h2>
        <Bar
          data={data}
          width={100}
          height={50}
          options={{
            maintainAspectRatio: false,
            legend: {
              labels: {
                fontColor: 'white',
                fontSize: 18
              }
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    fontColor: 'white',
                    fontSize: 14,
                    fontStyle: 'normal',
                    beginAtZero: true
                  }
                }
              ]
            }
          }}
        />
        <div className="center">
          <Link to="/home" className="btn waves-effect waves-light">
            Return Home
          </Link>
        </div>
      </div>
    );
  }
}

export default Results;
