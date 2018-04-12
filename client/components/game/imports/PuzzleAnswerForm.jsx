import { Meteor } from 'meteor/meteor';
import React, {PropTypes} from 'react';
import { Grid, Form, Message } from 'semantic-ui-react';

export default class PuzzleAnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      message: null,
      error: null,
    };
  }

  render() {
    return (
      <Form onSubmit={ (e) => this._handleSubmit(e) } style={ { paddingTop: '10px' }}>
        <Form.Input
          size='large'
          name='answer'
          label='Puzzle Answer (Case Insensitive)'
          placeholder='Answer'
          value={ this.state.answer }
          onChange={ (e) => this._handleChange(e) }
        />
        <Form.Button basic fluid color='green' content='Submit Answer'/>
        { this._message() }
        { this._error() }
      </Form>
    );
  }

  _handleSubmit(e) {
    e.preventDefault();
    const { puzzle } = this.props;
    const { answer } = this.state;

    Meteor.call('team.puzzle.answer', puzzle.puzzleId, answer, (error, result) => {
      this.setState({ answer: '' });
      if (error) return this.setState({ error });
      if (result.message) {
        this.setState({ message: result.message });
        Meteor.setTimeout(() => this.setState({ message: null }), 2000);
      }
    });
  }

  _handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _message() {
    const { message } = this.state;
    if (!message) return null;
    return <Message
      content={ message }
      onDismiss={ () => this.setState({ message: null }) }
    />
  }

  _error() {
    const { error } = this.state;
    if (!error) return null;
    return <Message
      negative
      content={ error.reason }
      onDismiss={ () => this.setState({ error: null }) }
    />
  }
}

PuzzleAnswerForm.propTypes = {
  team: PropTypes.object.isRequired,
  puzzle: PropTypes.object.isRequired,
};
