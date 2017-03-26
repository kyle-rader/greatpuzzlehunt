import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Form, Message } from 'semantic-ui-react';
import { omit } from 'lodash';

import HintEditor from './hint-editor';

class PuzzleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = this._stateFormProps(props);
  }

  componentWillReceiveProps(props) {
    this.setState(this._stateFormProps(props));
  }

  _stateFormProps(props) {
    const { puzzle } = props;
    return omit(puzzle, ['_id']);
  }

  render() {
    return (
      <Form onSubmit={ (e) => this._handleSubmit(e) }>
        <Form.Input
          name='name'
          label='Puzzle Name'
          value={ this.state.name }
          onChange={ (e) => this._handleChange(e) }
        />
        <Form.Group widths='equal'>
          <Form.Input
            name='answer'
            label='Answer'
            value={ this.state.answer }
            onChange={ (e) => this._handleChange(e) }
          />
          <Form.Input
            name='stage'
            label='Stage'
            value={ this.state.stage }
            onChange={ (e) => this._handleChange(e, 'Number') }
          />
        </Form.Group>

        <Form.Input
          name='location'
          label='Location'
          value={ this.state.location }
          onChange={ (e) => this._handleChange(e) }
        />

        <HintEditor puzzle={ this.props.puzzle } onChange={ (hints) => this.setState({ hints }) } />

        <Form.Group>
          <Form.Button color='green' type='submit' content='Save'/>
          <Form.Button basic content='Cancel' onClick={this.props.afterUpdate}/>
        </Form.Group>

      </Form>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { name, stage, answer, location } = this.state;
    const fields = {
      name: name.trim(),
      stage: parseInt(stage),
      answer: answer.trim().toLowerCase(),
      location: location.trim(),
      hints: [],
    };
    Meteor.call('admin.puzzle.update', this.props.puzzle._id, fields, (error, result) => {
      if (error) return alert(error.reason);
      this.props.afterUpdate();
    });
  }

  _handleChange(e, type) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
}

PuzzleEditor.propTypes = {
  puzzle: PropTypes.object.isRequired,
  afterUpdate: PropTypes.func.isRequired,
};

export default PuzzleEditor;
