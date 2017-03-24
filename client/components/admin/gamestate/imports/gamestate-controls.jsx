import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

import GamestateComp from '../../../imports/gamestate-comp';

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
          { this._fieldButton('Registration') }
        </Form.Group>
        <Form.Group>
          { this._fieldButton('Gameplay') }
        </Form.Group>
      </Form>
    );
  }

  _fieldButton(name) {
    const field = this.props.gamestate[name.toLowerCase()];
    return <Button
      color={ field ? 'green' : 'red' }
      content={ `Turn ${name} ${(field ? 'Off' : 'On')}` }
      onClick={ (e) => this._toggleField(e, name) }
    />;
  }

  _toggleField(e, name) {
    e.preventDefault();
    if (confirm(`Are you sure you want to toggle ${name}?`)) {
      Meteor.call(`admin.gamestate.toggle${name}`, (error, result) => {
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
