import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Grid, Form, Message, Image } from 'semantic-ui-react';
import { cloneDeep, reduce, flatten } from 'lodash';

import imageSubscriber from './image-subscriber';

function buildImageMap(images) {
  return reduce(images, (acc, img) => {
    acc[img._id] = {
      name: img.name(),
      url: img.url(),
    };
    return acc;
  }, {});
}

function buildImageOptions(images) {
  return images.map((img) => ({
    key: img._id,
    value: img._id,
    text: img.name(),
  }));
}

class HintEditor extends Component {
  constructor(props) {
    super(props);
    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps(props) {
    this.setState(this._stateFromProps(props));
  }

  _stateFromProps(props) {
    return {
      hints: props.hints,
      imageMap: buildImageMap(props.images),
      imageOptions: buildImageOptions(props.images),
    };
  }

  render() {
    return (
      <div>
        <Form.Group key='add_hint_btn'>
          <Form.Button basic content='Add Hint' icon='plus' labelPosition='right' onClick={ (e) => this._addhint(e) }/>
        </Form.Group>
        { flatten(this._hintInputs()) }
      </div>
    );
  }

  _addhint(e) {
    e.preventDefault();
    const { hints } = this.state;
    hints.push({
      description: 'New Hint',
      image: {
        id: '',
        url: '',
      },
    });
    this.props.onChange(hints);
  }

  _hintInputs() {
    return this.state.hints.map((hint, i) => {
      const name = `hint_${i}_description`;
      return (
        <Grid key={ `${this.props.puzzle._id}_${name}`} widths='equal' style={{paddingBottom: '10px' }}>
          <Grid.Row columns='2'>
            <Grid.Column>
              <Form.Input
                name={name}
                label='Description'
                value={ this.state.hints[i].description }
                onChange={ (e) => {
                  const { hints } = this.state;
                  hints[i].description = e.target.value;
                  this.props.onChange(hints);
                }}
              />
            </Grid.Column>
            <Grid.Column>
              <Form.Select
                name={`hint_${i}_image`}
                label='Image'
                options={this.state.imageOptions}
                placeholder='Image'
                value={ this.state.hints[i].image.id }
                onChange={ (e, { value }) => {
                  const { hints } = this.state;
                  hints[i].image = {
                    id: value,
                    url: this.state.imageMap[value].url,
                  };
                  this.props.onChange(hints);
                }}
              />
            </Grid.Column>
          </Grid.Row>
          {
            hint.image.url ? (
              <Grid.Row columns='1'>
                <Grid.Column><Image src={hint.image.url} size='small'/></Grid.Column>
              </Grid.Row>
            ) : null
          }
        </Grid>
      );
    });
  }
}

HintEditor.propTypes = {
  puzzle: PropTypes.object.isRequired,
  hints: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default imageSubscriber(HintEditor);
