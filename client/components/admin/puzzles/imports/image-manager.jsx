import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Segment, Header, Message, Image, Button } from 'semantic-ui-react';

import ImageList from './image-list';
import ImageUploader from './image-uploader';

export default class ImageManager extends Component {
  render() {
    return (
      <div>
        <Header as='h3' content='Image Manager'/>
        <ImageUploader />
        <br/>
        <ImageList />
      </div>
    );
  }
}
