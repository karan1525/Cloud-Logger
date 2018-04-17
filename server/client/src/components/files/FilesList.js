import React, { Component } from 'react';
import RenameModal from './RenameModal';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchFiles } from '../../actions';

class FilesList extends Component {
  constructor(props) {
    super(props);
    this.state = { isModalOpen: false};
  }

  componentDidMount() {
    this.props.fetchFiles();
  }

  fileDelete(fileName) {
    const url = '/api/delete';
    return axios.delete(url, { data: { fileName: fileName } });
  }

  deleteFile(fileName) {
    this.fileDelete(fileName).then(response => {
      console.log(response.data);
      window.location.reload();
    });
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
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
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.openModal()}>
                  Rename
                </a>
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.deleteFile(file.logFileName)}>
                  Delete
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return [
      <div>{this.renderFiles()}</div>,
      <div>
        <RenameModal isOpen={this.state.isModalOpen} onClose={() => this.closeModal}>
          <h1>Modal title</h1>
          <p>hallo</p>
          <p><button onClick={() => this.closeModal()}>Close</button></p>
        </RenameModal>
      </div>
    ];
  }
}

function mapStateToProps({ files }) {
  return { files };
}

export default connect(mapStateToProps, { fetchFiles })(FilesList);
