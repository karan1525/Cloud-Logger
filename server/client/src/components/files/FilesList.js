import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchFiles } from '../../actions';

class FilesList extends Component {
  componentDidMount() {
    this.props.fetchFiles();
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

  fileDelete(fileName) {
    const url = '/api/delete';
    const formData = new FormData();
    const id = this.getUserId();
    formData.append('fileName', fileName);
    formData.append('userId', id);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    return axios.delete(url, formData, config);
  }

  deleteFile(fileName) {
    this.fileDelete(fileName).then(response => {
      console.log(response.data);
    });
  }

  renderFiles() {
    return this.props.files.reverse().map(file => {
      return (
        <div key={file._id} className="container" style={{ marginTop: '50px' }}>
          <div className="row">
            <div className="card blue darken-3">
              <div className="card-content white-text">
                <span className="card-title">{file.logFileName}</span>
                <p>
                  I am a log file that you have uploaded. If you'd like to
                  either rename, or delete me, please click one of the links
                  below.
                </p>
              </div>
              <div className="card-action">
                <a href="/rename">Rename this file</a>
                <button onClick={this.deleteFile(file.logFileName)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return <div>{this.renderFiles()}</div>;
  }
}

function mapStateToProps({ auth, files }) {
  return { auth, files };
}

export default connect(mapStateToProps, { fetchFiles })(FilesList);
