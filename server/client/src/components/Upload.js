import React, { Component } from 'react';
import { connect } from 'react-redux';
import { post } from 'axios';
import '../styling/Upload.css';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
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

  handleChange(event) {
    this.setState({ file: event.target.files[0] });
  }

  bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]})`;
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }

  handleSubmit(event) {
    event.preventDefault();
    var file = this.state.file;
    if (file) {
      var filename = this.state.file.name;
      const fileSize = file.size;
      var ext = filename.split('.').pop();
      if (ext !== 'txt') {
        alert(
          'Sorry, ' +
            ext +
            ' files are not accepted. Accepted files are txt only.'
        );
      } else if (fileSize > 16841924) {
        alert(
          'Sorry. File size must be less than 16MB. Your file is: ' +
            this.bytesToSize(fileSize)
        );
      } else {
        this.fileUpload(file);
        alert('A file was submitted: ' + filename);
      }
    } else {
      alert('Please select a file to upload');
    }
  }

  fileUpload(file) {
    const url = '/api/upload';
    const formData = new FormData();
    const id = this.getUserId();
    formData.append('fileUploaded', file);
    formData.append('userId', id);
    console.log(formData);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    post(url, formData, config)
      .then(res => {
        alert('file successfully uploaded');
        window.location.href = '/home';
      })
      .catch(err => {
        if (err.response.data === 'user has reached a max limit') {
          alert('you have reached your max file limit');
        } else if (err.response.data === 'fileName already exist') {
          alert('file name already exist');
        } else {
          alert('something went wrong! please try again!');
        }
      });
  }

  render() {
    return [
      <div key="uploadForm" className="Upload">
        <form action="#" onSubmit={this.handleSubmit}>
          <div className="file-field input-field">
            <div className="btn grey">
              <span>Choose File</span>
              <input
                type="file"
                size="60"
                file={this.state.file}
                onChange={this.handleChange}
              />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="Upload a new file"
              />
            </div>
          </div>
          <p className="center-align">
            <button
              className="waves-effect waves-light btn-large center blue"
              type="submit"
              value="Upload">
              Upload
              <i className="material-icons right">cloud_upload</i>
            </button>
          </p>
        </form>
      </div>,
      <div
        key="backButton"
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

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(Upload);
