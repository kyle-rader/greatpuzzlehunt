import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import EmailList from './imports/email-list.jsx';

AdminEmailLists = class AdminEmailLists extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allUsers: [],
      needSetup: [],
    };

    Meteor.call('admin.getUsers', (error, result) => {
      if (error) return alert(error);

      this.setState({ allUsers: result });
    });
  }

  render() {
    return (
      <Segment basic>
        <EmailList title='All Users' emails={ this.state.allUsers }/>
      </Segment>
    );
  }
}
