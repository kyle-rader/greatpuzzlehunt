import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Segment, Form, Button, Header } from 'semantic-ui-react';

import GamestateComp from '../../../imports/GamestateComp';

class GamestateControlsInner extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(props) {
    if (props.gamestate) {
      this.setState({
        registration: props.gamestate.registration,
        gameplay: props.gamestate.gameplay,
      });
    }
  }

  render() {
    if (this.props.ready) {
      return this._renderForm();
    }
    else {
      return <Loading />;
    }
  }

  _renderForm() {
    return (
      <Form onSubmit={ (e) => e.preventDefault() }>
        <Form.Group>
          <Form.Button icon="mail" content="Email (all 3) Reports to Me" onClick={(e) => Meteor.call('admin.sendReport')}/>
        </Form.Group>

        <Form.Group>
          <Form.Button icon="mail" content="Email List of Users & Teams to Me" onClick={(e) => { Meteor.call('admin.sendUsersAndTeams'); alert("Emails are sending!"); }}/>
        </Form.Group>

        <Header as='h3' content='Registration'/>
        <Form.Group>
          { this._fieldButton('Registration') }
        </Form.Group>

        <Header as='h3' content='Check In'/>
        <Form.Group>
          { this._fieldButton('CheckIn') }
        </Form.Group>

        <Header as='h3' content='Gameplay'/>
        <Form.Group>
          { this._fieldButton('Gameplay') }
        </Form.Group>
      </Form>
    );
  }

  _fieldButton(name) {
    const fieldName = name.toLowerCase();
    const fieldValue = this.props.gamestate[fieldName];
    return (
      <Button
        color={fieldValue ? 'green' : 'red' }
        content={`Turn ${name} ${(fieldValue ? 'Off' : 'On')}` }
        onClick={(e) => this._toggleField(e, fieldName) }
      />
    );
  }

  _toggleField(e, fieldName) {
    e.preventDefault();
    if (confirm(`Are you sure you want to toggle ${fieldName}?`)) {
      Meteor.call(`admin.gamestate.toggleField`, fieldName, (error, result) => {
        if (error) alert(error.reason);
      });
    }
  }
}

GamestateControlsInner.propTypes = {
  ready: PropTypes.bool.isRequired,
  gamestate: PropTypes.object,
};

export const GamestateControls = GamestateComp(GamestateControlsInner);
