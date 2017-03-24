import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

import EmailList from './imports/email-list.jsx';

AdminEmailLists = class AdminEmailLists extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allUsers: [],
      needsSetup: [],
    };

    Meteor.call('admin.users.fetch', (error, allUsers) => {
      if (error) return alert(error);

      const needsSetup = allUsers.filter((user) => Boolean(user.email));

      this.setState({ allUsers, needsSetup });
    });
  }

  render() {
    return (
      <Segment basic>
        <h3>Columns: <pre>Firstname, Lastname, Email, Username</pre></h3>
        <EmailList title='Need to Finish Setup' emails={ this.state.needsSetup }/>
        <EmailList title='All Users' emails={ this.state.allUsers }/>
      </Segment>
    );
  }
}
