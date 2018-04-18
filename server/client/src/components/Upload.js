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

  handleSubmit(event) {
    event.preventDefault();
    var file = this.state.file;
    var filename = this.state.file.name;
    var ext = filename.split('.').pop();
    if (ext !== 'txt') {
      alert(
        'Sorry, ' +
          ext +
          ' files are not accepted. Accepted files are txt only.'
      );
    } else {
      this.fileUpload(file);
      alert('A file was submitted: ' + filename);
    }
  }

  fileUpload(file) {
    const url = '/api/upload';
    const formData = new FormData();
    const id = this.getUserId();
    formData.append('fileUploaded', file);
    formData.append('userId', id);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    /**
        ** testing purposes
        ***use this loop to print out what's inside of formData
       for (var key of formData.entries()){
        console.log(key[0] + ', ' + key[1]);
       }
       **/

    post(url, formData, config)
      .then(res => {
        alert('file successfully uploaded');
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
    window.location.href = '/home';
  }

  render() {
    return (
      <div className="Upload">
        <form onSubmit={this.handleSubmit}>
          <input
            type="file"
            size="60"
            file={this.state.file}
            onChange={this.handleChange}
          />
          <button type="submit" value="Upload">
            Upload
            <i className="material-icons right">cloud_upload</i>
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(Upload);
