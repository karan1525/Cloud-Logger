import React, { Component } from 'react';


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
       var filename = this.state.file.name;
       var ext = filename.split('.').pop();
       if(ext != 'txt') {
          alert('Sorry, ' + ext + ' files are not accepted. Accepted files are txt only.');
       } else {
          alert('A file was submitted: ' + filename + 'With ext: ' + ext);
       }
   }
    
  render() {
    return (
      <div>
        <h1>This is the upload page.</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
             <input type="file" file={this.state.file} onChange={this.handleChange}/>
          </label>
             <input type="submit" value="Upload" />
        </form>
      </div>
    );
  }
}

export default Upload;
