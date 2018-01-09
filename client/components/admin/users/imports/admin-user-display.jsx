import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Grid, Message, Button, Icon } from 'semantic-ui-react';

function phoneLink(phone) {
  return Boolean(phone) ? <a href={`tel:${phone}`}>{ phone }</a> : null;
}

class AdminUserDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      more_buttons: false,
    };
  }

  render() {
    const { user } = this.props;
    const { moreInfo } = this.state;
    return (
      <div>
        { this._email() }
        { this._team() }
      </div>
    );
  }

  _email() {
    const { user } = this.props;
    const good = user.isVerified();
    const email = user.email || user.getEmail();
    return (
      <p>
        <Icon name='mail' color={ good ? 'green' : 'yellow' }/> { email }
      </p>
    );
  }

  _team() {
    const { user } = this.props;
    return (
      <p>
        <Icon name='users' color={ user.teamId ? 'green' : 'yellow' }/> { user.teamName }
      </p>
    );
  }
}

AdminUserDisplay.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminUserDisplay;
