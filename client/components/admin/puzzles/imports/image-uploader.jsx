import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Header, Message, Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

export default class ImageUploader extends Component {
  render() {
    const style = {
      cursor: 'pointer',
    };

    return (
      <Dropzone
        style={ style }
        accept='image/*'
        onDrop={(files) => this.onDrop(files)}>
        <Button fluid color='teal' content='Upload Images (Drag & Drop or Click Here)'/>
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
      window.URL.revokeObjectURL(file.preview);
    });
  }
}
