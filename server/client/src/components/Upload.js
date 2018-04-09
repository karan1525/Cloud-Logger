import React, { Component } from 'react';
import '../styling/Upload.css';

class Upload extends Component {
   constructor(props) {
      super(props);
      this.state = {file:null};
        
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }
    
   handleChange(event) {
       this.setState({file: event.target.files[0]});
   }
    
   handleSubmit(event) {
       event.preventDefault;
       var file = this.state.file;
       var filename = this.state.file.name;
       var ext = filename.split('.').pop();
       if(ext != 'txt') {
          alert('Sorry, ' + ext + ' files are not accepted. Accepted files are txt only.');
       } else {
          this.props.uploadFile(file);
          alert('A file was submitted: ' + filename + 'With ext: ' + ext);
       }
   }
    
  render() {
    return (
      <div className="Upload">
        <h2>This is the upload page.</h2>
        <form onSubmit={this.handleSubmit}>
             <input type="file" size="60" file={this.state.file} onChange={this.handleChange}/>
             <input type="submit" value="Upload" />
        </form>
      </div>
    );
  }
}

export default Upload;
