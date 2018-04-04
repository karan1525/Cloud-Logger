import React, { Component } from 'react';

var _validFileExts = [".txt", ".csv"];

class Upload extends Component {
  render() {
    return (
      <div>
        <h1>This is the upload page.</h1>
        <form >
          <label>
            <input type="file" />
          </label>
          <input type="submit" value="Upload" />
        </form>
      </div>
    );
  }
}

export default Upload;
