import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Form, Message } from 'semantic-ui-react';

class HintEditor extends Component {
  constructor() {
    super(props);
    this.state = {
      hints: props.hints
    }
  }
}
