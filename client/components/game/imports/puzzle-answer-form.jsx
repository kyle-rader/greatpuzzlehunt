import { Meteor } from 'meteor/meteor';
import React, {PropTypes} from 'react';
import { Grid, Form, Message } from 'semantic-ui-react';

export default class PuzzleAnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
    };
  }

  render() {
    return (
      <Form onSubmit={ (e) => this._handleSubmit(e) } style={ { paddingTop: '10px' }}>
        <Form.Input
          name='answer'
          label='Puzzle Answer (Case Insensitive)'
          placeholder='Answer'
          value={ this.state.answer }
          onChange={ (e) => this._handleChange(e) }
        />
        <Form.Button basic color='green' content='Submit Answer'/>
      </Form>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();
  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
}

PuzzleAnswerForm.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};
