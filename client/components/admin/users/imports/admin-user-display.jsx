import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Grid, Icon } from 'semantic-ui-react';

class AdminUserDisplay extends Component {
  render() {
    const { user } = this.props;

    return (
      <Grid>
        <Grid.Row>
          { this._name_email() }
          { this._username_team() }
          { this._info() }
        </Grid.Row>
      </Grid>
    );
  }

  _name_email() {
    const { user } = this.props;
    const good = user.isVerified();
    const email = user.email || user.getEmail();
    return (
      <Grid.Column computer={6} mobile={16}>
        <h3>{ user.name }</h3>
        { email } <Icon color={ good ? 'green' : 'red' } name={ good ? 'check' : 'close' }/>
      </Grid.Column>
    );
  }

  _username_team() {
    const { user } = this.props;
    return (
      <Grid.Column computer={6} mobile={16}>
        <pre>{ user.username } : { user.teamId }</pre>
      </Grid.Column>
    );
  }

  _info() {
    const { user } = this.props;
    return (
      <Grid.Column computer={4} mobile={16}>
        <Icon name='phone'/> { user.phone }
          {/* { JSON.stringify(user.emergencyContact, null, 2) } */}
      </Grid.Column>
    );
  }
}

AdminUserDisplay.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminUserDisplay;
