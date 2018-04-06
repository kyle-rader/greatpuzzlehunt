import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Form, Message, Header } from 'semantic-ui-react';
import { omit } from 'lodash';

import HintEditor from './HintEditor';

class PuzzleEditor extends Component {
  constructor(props) {
    super(props);
    this.state = this._stateFromProps(props);
  }

  componentWillReceiveProps(props) {
    this.setState(this._stateFromProps(props));
  }

  _stateFromProps(props) {
    const { puzzle } = props;
    return omit(puzzle, ['_id']);
  }

  render() {
    return (
      <Form onSubmit={(e) => e.preventDefault() }>
        <Header as='h3' content='Puzzle Editor'/>
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
            onChange={ (e) => this._handleChange(e) }
          />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input
            name='allowedTime'
            label='Time Allowed (min)'
            value={ this.state.allowedTime }
            onChange={ (e) => this._handleChange(e) }
          />
          <Form.Input
            name='timeoutScore'
            label='Timeout Score (min)'
            value={ this.state.timeoutScore }
            onChange={ (e) => this._handleChange(e) }
          />
          <Form.Input
            name='bonusTime'
            label='Bonus Time (min)'
            value={ this.state.bonusTime }
            onChange={ (e) => this._handleChange(e) }
          />
        </Form.Group>

        <Form.Input
          name='location'
          label='Location'
          value={ this.state.location }
          onChange={ (e) => this._handleChange(e) }
        />

        <HintEditor hints={this.state.hints} updateHints={(hints) => this.setState({ hints })}/>

        <Form.Group>
          <Form.Button color='green' content='Save' onClick={(e) => this._save(e)}/>
          <Form.Button basic content='Close' onClick={this.props.closePuzzle}/>
        </Form.Group>

      </Form>
    );
  }

  _save(e) {
    e.preventDefault();
    const { name, stage, answer, allowedTime, timeoutScore, bonusTime, location, hints } = this.state;
    const fields = {
      name: name.trim(),
      stage: parseInt(stage),
      allowedTime: parseInt(allowedTime),
      timeoutScore: parseInt(timeoutScore),
      bonusTime: parseInt(bonusTime),
      answer: answer.trim().toLowerCase(),
      location: location.trim(),
      hints,
    };

    Meteor.call('admin.puzzle.update', this.props.puzzle._id, fields, (error, result) => {
      if (error) return alert(error.reason);
      alert(`"${fields.name}" saved!`)
    });
  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
}

PuzzleEditor.propTypes = {
  puzzle: PropTypes.object.isRequired,
  closePuzzle: PropTypes.func.isRequired,
};

export default PuzzleEditor;
