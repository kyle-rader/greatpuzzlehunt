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
        <Grid.Row>
          <Grid.Column>
            <Button basic color="green" content="Add Hint" onClick={(e) => this._addHint(e)}/>
            <Button basic color="red" content="Remove Last Hint" onClick={(e) => this._removeLastHint(e)}/>
          </Grid.Column>
        </Grid.Row>

          {this._renderHints()}

      </Grid>
    );
  }

  _addHint(e) {
    e.preventDefault();
    const newHint = { text: "", imageUrl: "" };
    let { hints } = this.state;
    hints.push(newHint);
    this.props.updateHints(hints);
  }

  _removeLastHint(e) {
    e.preventDefault();
    let { hints } = this.state;
    hints.pop();
    this.props.updateHints(hints);
  }

  _renderHints() {
    const { hints } = this.state;
    if (hints.length == 0) return null;
    return (
      <Grid.Row columns={hints.length}>
        { hints.map((hint, i) => this._renderHint(hint, i)) }
      </Grid.Row>
    );
  }

  _renderHint(hint, i) {
    const hasImage = !!hint.imageUrl && hint.imageUrl.length > 0;

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

        { hasImage ? <Image src={hint.imageUrl}/> : null}
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
