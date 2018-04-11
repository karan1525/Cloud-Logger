import React, { Component } from 'react';
import axios, { post } from 'axios';
import '../styling/Upload.css';

class Upload extends Component {
   constructor(props) {
      super(props);
      this.state = {file:null};
        
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fileUpload = this.fileUpload.bind(this);
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
          this.fileUpload(file, filename, ext)
          // .then((response)=> {
          //   console.log("hi im here")
          //     console.log(response.data);
          // })
          alert('A file was submitted: ' + filename + 'With ext: ' + ext);
         
       }
   }
    
   fileUpload(file, fileName,ext) {
       const url = '/api/upload';
       const formData = new FormData();
       formData.append('fileUploaded', file)
       formData.append('userId', "samSmith")
       const config = {
           headers: {
               'content-type': 'multipart/form-data'
           }
       }
        /**
        ** testing purposes
        ***use this loop to print out what's inside of formData 
       for (var key of formData.entries()){
        console.log(key[0] + ', ' + key[1]);
       }
       **/

      //console.log(post(url, formData, config))

       post(url, formData, config).then(function(response){
        console.log("hi im running")
        console.log(response.data)
        alert('File Uploaded.')
         
       }).catch(function(err){
        console.log(err.response.data)
          if (err.response.data == 'user has reached a max limit')
            alert('sorry you have reached your file limit.');
          else if (err.response.data == 'fileName already exist')
            alert('file name already exist')
          else
            alert('sorry! something went wrong. please try again')
       })
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
