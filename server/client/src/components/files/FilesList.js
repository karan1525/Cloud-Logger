import React, { Component } from 'react';
import RenameModal from './RenameModal';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchFiles } from '../../actions';

class FilesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      currentFileName: null,
      newFileName: null
    };
  }

  componentDidMount() {
    this.props.fetchFiles();

    this.handleModalChange = this.handleModalChange.bind(this);
    this.handleModalSubmit = this.handleModalSubmit.bind(this);
    this.fileRename = this.fileRename.bind(this);
  }

  handleModalChange(event) {
    this.setState({ newFileName: event.target.value });
  }

  handleModalSubmit(event) {
    event.preventDefault();
    this.fileRename().then(response => {
      console.log(response.data);
      window.location.reload();
    });
  }

  fileRename() {
    const url = '/api/rename';
    const oldFileName = this.state.currentFileName;
    const newFileName = this.state.newFileName;

    console.log(oldFileName);
    console.log(newFileName);
    return axios.put(url, {
      oldFileName: oldFileName,
      newFileName: newFileName
    });
  }

  fileDelete(fileName) {
    const url = '/api/delete';
    return axios.delete(url, { data: { fileName: fileName } });
  }

  handleDelete(fileName) {
    this.fileDelete(fileName).then(response => {
      console.log(response.data);
      window.location.reload();
    });
  }

  openModal(fileName) {
    this.setState({ isModalOpen: true, currentFileName: fileName });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
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
                  onClick={() => this.openModal(file.logFileName)}>
                  Rename
                </a>
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.handleDelete(file.logFileName)}>
                  Delete
                </a>
                <a style={{ cursor: 'pointer' }}>Analyze</a>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    return [
      <div key="filesRender">{this.renderFiles()}</div>,
      <div key="renameModal">
        <RenameModal
          isOpen={this.state.isModalOpen}
          onClose={() => this.closeModal}>
          <h3>Rename {this.state.currentFileName}?</h3>
          <p>Please submit a new name for this file. </p>
          <form onSubmit={this.handleModalSubmit}>
            <input
              type="text"
              newfilename={this.state.newFileName}
              onChange={this.handleModalChange}
            />
            <button
              className="btn waves-effect waves-light left"
              type="submit"
              value="Submit">
              Submit
              <i className="material-icons right">done</i>
            </button>
            <button
              className="btn waves-effect waves-light right red"
              onClick={() => this.closeModal()}>
              Cancel
              <i className="material-icons right">cancel</i>
            </button>
          </form>
        </RenameModal>
      </div>
    ];
  }
}

function mapStateToProps({ files }) {
  return { files };
}

export default connect(mapStateToProps, { fetchFiles })(FilesList);
