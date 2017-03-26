import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Segment, Card, Image, Button } from 'semantic-ui-react';

import imageSubscriber from './image-subscriber';

class ImageList extends Component {
  render() {
    if (!this.props.ready) return null;

    return (
      <Card.Group itemsPerRow='4' doubling stackable>
        { this._images() }
      </Card.Group>
    );
  }

  _images() {
    return this.props.images.map((img) => this._renderImage(img));
  }

  _renderImage(img) {
    return (
      <Card key={img._id}>
        <Image fluid src={ img.url() } />
        <Card.Content>
          <Card.Description>{ img.original.name }</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button basic color='red' content='Delete' onClick={ () => this._deleteImg(img) }/>
        </Card.Content>
      </Card>
    );
  }

  _deleteImg(img) {
    if (!confirm(`Are you sure you want to Delete ${img.name()}?`)) return false;
    Meteor.call('admin.image.delete', img._id, (error, result) => {
      if (error) return alert(error.message);
    });
  }
}

export default imageSubscriber(ImageList);
