import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Form, Button, Image
} from 'semantic-ui-react';

class HintEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hints: props.hints || [],
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ hints: props.hints || this.state.hints });
  }

  render() {
    const { hints } = this.state;
    return (
      <Grid stackable celled>
        <Grid.Row columns={hints.length}>
          {this._renderHints()}
        </Grid.Row>
      </Grid>
    );
  }

  _renderHints() {
    const { hints } = this.state;
    return hints.map((hint, i) => this._renderHint(hint, i));
  }

  _renderHint(hint, i) {
    return (
      <Grid.Column key={`hint_${i}`}>
        <Form.Input
          name={`hint_${i}_text`}
          label={`Hint ${i+1} Text`}
          value={hint.text}
          onChange={(e) => this._handleHintChange('text', e, i)}
        />

        <Form.Input
          name={`hint_${i}_imageUrl`}
          label={`Hint ${i+1} Image URL`}
          value={hint.imageUrl}
          onChange={(e) => this._handleHintChange('imageUrl', e, i)}
        />

        { hint.imageUrl ? <Image src={hint.imageUrl}/> : null}
      </Grid.Column>
    );
  }

  _handleHintChange(name, { target: { value } }, hintIndex) {
    const { hints } = this.state;
    hints[hintIndex][name] = value;
    this.props.updateHints(hints);
  }
}

HintEditor.propTypes = {
  hints: PropTypes.arrayOf(Object).isRequired,
  updateHints: PropTypes.func.isRequired,
};

export default HintEditor;
