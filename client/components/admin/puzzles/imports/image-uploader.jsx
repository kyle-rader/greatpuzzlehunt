import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Header, Message, Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

export default class ImageUploader extends Component {
  render() {
    const style = {
      width: '100%',
      height: '120px',
    };

    const msgStyle = {
      padding: '15px',
    };

    return (
      <Dropzone
        style={ style }
        accept='image/*'
        onDrop={(files) => this.onDrop(files)}>
        <Message style={ msgStyle } content='Uploade Images (Drag and Drop or Click Here)'/>
      </Dropzone>
    );
  }

  onDrop(files) {
    files.map((f) => this.upload(f));
  }

  upload(file) {
    Images.insert(file, (error, fileObj) => {
      if (error) return alert(error.reason);
      console.log('Uploaded:', fileObj);
    });
  }
}
