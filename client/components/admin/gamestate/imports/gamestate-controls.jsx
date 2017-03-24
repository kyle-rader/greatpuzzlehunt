import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

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
          { this._registrationButton() }
        </Form.Group>
      </Form>
    );
  }

  _registrationButton() {
    const { registration } = this.props.gamestate;
    return <Button
      color={ registration ? 'green' : 'red' }
      content={ 'Turn Registration ' + (registration ? 'Off' : 'On') }
      onClick={ (e) => this._toggleRegistration(e) }
    />;
  }

}

GamestateControlsInner.propTypes = {
  ready: PropTypes.bool.isRequired,
  gamestate: PropTypes.object,
};

export const GamestateControls = createContainer(() => {
  const handle = Meteor.subscribe('gamestate');
  const ready = handle.ready();
  const gamestate = Gamestate.findOne({});

  return {
    ready,
    gamestate,
  };
}, GamestateControlsInner);
