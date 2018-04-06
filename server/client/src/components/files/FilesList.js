import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFiles } from '../../actions';

class FilesList extends Component {
  componentDidMount() {
    this.props.fetchFiles();
  }

  renderFiles() {
    return this.props.files.reverse().map(file => {
      return (
        <div key={file._id} className="container" style={{ marginTop: '50px' }}>
          <div class="row">
            <div class="card blue darken-3">
              <div class="card-content white-text">
                <span class="card-title">{file.logFileName}</span>
                <p>
                  I am a log file that you have uploaded. If you'd like to
                  either rename, or delete me, please click one of the links
                  below.
                </p>
              </div>
              <div class="card-action">
                <a href="#">Rename this file</a>
                <a href="#">Delete </a>
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

function mapStateToProps({ files }) {
  return { files };
}

export default connect(mapStateToProps, { fetchFiles })(FilesList);
