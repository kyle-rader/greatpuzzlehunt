import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { omit } from 'lodash';

class PuzzleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = this._stateFromprops(props);
  }

  componentWillReceiveProps(props) {
    this.setState(this._stateFromprops(props));
  }

  _stateFromprops(props) = {
    const { puzzle } = props;
    return omit(puzzle, ['_id']);
  }

  render() {
    return (
      <Form onSubmit={ (e) => this._handleSubmit(e) }>
        <From.Group>
          <Form.Input
            name='name'
            fluid
            label='Puzzle Name'
            value={ this.state.name }
            onChange={ this._handleChange }
          />
        </From.Group>
        <From.Group>
          <Form.Input
            name='answer'
            width='10'
            label='Answer'
            value={ this.state.answer }
            onChange={ this._handleChange }
          />
          <Form.Input
            name='stage'
            width='6'
            label='Stage'
            value={ this.state.stage }
            onChange={ this._handleChange }
          />
        </From.Group>
        <From.Group>
          <Form.Input
            name='location'
            fluid
            label='Location'
            value={ this.state.location }
            onChange={ this._handleChange }
          />
        </From.Group>

        {/* TODO: Render Hint editor */}
      </Form>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { name, stage, answer, location } = this.state;

  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
}

PuzzleEditor.propTypes = {
  puzzle: PropTypes.object.isrequired,
};
