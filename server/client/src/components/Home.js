import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFiles } from '../actions';
import FilesList from './files/FilesList';
import { ThreeBounce } from 'better-react-spinkit';
import '../styling/Home.css';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true };
  }

  componentDidMount() {
    this.props.fetchFiles();
    this.props.fetchFiles().then(() => {
      this.setState({ fetching: false });
    });
  }

  buttonCheck() {
    if (this.props.files.length != 2) {
      return (
        <a href="/upload" className="waves-effect waves-light btn-large blue">
          New File
        </a>
      );
    }
  }

  render() {
    return [
      <div key="files">
        <FilesList />
      </div>,
      <div id="newFileButton" key="upload" style={{ textAlign: 'center' }}>
        {this.state.fetching ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}>
            <ThreeBounce size={40} timingFunction="ease-in" color="#ffffff" />
          </div>
        ) : (
          this.buttonCheck()
        )}
      </div>
    ];
  }
}


function mapStateToProps({ files }) {
  return { files };
}

export default connect(mapStateToProps, { fetchFiles })(Home);
