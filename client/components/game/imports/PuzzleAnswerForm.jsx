import { Meteor } from 'meteor/meteor';
import React, {PropTypes} from 'react';
import { Grid, Form, Message } from 'semantic-ui-react';
import NCGiveUp from './NCGiveUp';

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
        { this._giveUpButton() }
      </Form>
    );
  }

  _giveUpButton() {
    const { team, puzzle } = this.props;
    const show = team.division === "noncompetitive";
    if(!show) return null;

    return <NCGiveUp team={team} puzzle={puzzle} />
  }

  _handleSubmit(e) {
    e.preventDefault();
    const smartQuoteRegex = /\u{201c}|\u{201d}/ug
    const smartApostropheRegex = /\u{2018}|\u{2019}/ug
    const { puzzle } = this.props;
    const answer = this.state.answer.replace(smartQuoteRegex, '"').replace(smartApostropheRegex, '\'');
    console.log(answer);

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
