import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Image } from 'semantic-ui-react';

class ImageList extends Component {
    render() {
      if (!this.props.ready) return null;

      return (
        <Image.Group>
          { this.props.images.map((img) => <Image src={img.url()} key={img._id}/>) }
        </Image.Group>
      );
    }
}

export default createContainer(() => {
  const handle = Meteor.subscribe('admin.images');
  const ready = handle.ready();
  const images = Images.find().fetch();

  return {
    ready,
    images,
  };
}, ImageList);
