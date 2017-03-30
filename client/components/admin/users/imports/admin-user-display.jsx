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
        { this._moreInfo() }
      </div>
    );
  }

  _email() {
    const { user } = this.props;
    const good = user.isVerified();
    const email = user.email || user.getEmail();
    return (
      <p>
        <Icon name='mail' size='small'/> { email } <Icon color={ good ? 'green' : 'red' } name={ good ? 'check' : 'close' }/>
      </p>
    );
  }

  _team() {
    const { user } = this.props;
    return (
      <p>
        <Icon name='users' size='small'/> { user.teamName }
      </p>
    );
  }

  _moreInfo() {
    const { user } = this.props;
    return (
      <Grid.Row>
        <Grid.Column computer={4} mobile={8}>
          <Icon name='phone'/>{ phoneLink(user.phone) }
        </Grid.Column>
        <Grid.Column computer={6} mobile={8}>
          <Icon name='location arrow'/>{ `${user.city}, ${user.state}` }
        </Grid.Column>
        <Grid.Column computer={6} mobile={16}>
          <Icon name='first aid'/>{ this._ec() }
        </Grid.Column>
      </Grid.Row>
    );
  }

  _ec() {
    const { user } = this.props;
    if (!user.emergencyContact) return null;
    const { emergencyContact: ec } = user;
    const hasAlt = Boolean(ec.altPhone);
    return (
      <span>
        { [ec.name, ec.relation].filter(n => Boolean(n)).join(', ') } <br/>
        { phoneLink(ec.phone) } { hasAlt ? ', alt: ' : '' } { phoneLink(ec.altPhone) }
      </span>
    )
  }
}

AdminUserDisplay.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminUserDisplay;
