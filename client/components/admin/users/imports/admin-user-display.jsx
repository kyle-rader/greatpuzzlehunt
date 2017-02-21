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
      <Grid>
        <Grid.Row>
          { this._name_email() }
          { this._username_team() }
          { this._buttons() }
        </Grid.Row>
        { moreInfo ? this._moreInfo() : null }
      </Grid>
    );
  }

  _name_email() {
    const { user } = this.props;
    const good = user.isVerified();
    const email = user.email || user.getEmail();
    return (
      <Grid.Column computer={5} mobile={16}>
        <h4>{ user.name }</h4>
        { email } <Icon color={ good ? 'green' : 'red' } name={ good ? 'check' : 'close' }/>
      </Grid.Column>
    );
  }

  _username_team() {
    const { user } = this.props;
    return (
      <Grid.Column computer={6} mobile={16}>
        { user.username } : { user.teamId }
      </Grid.Column>
    );
  }

  _buttons() {
    const { user } = this.props;
    const { moreInfo } = this.state;
    return (
      <Grid.Column computer={5} mobile={16} className='top-mobile-padding'>
        <Button basic size='small'
          onClick={ () => this._toggleInfo() }
          content={ moreInfo ? 'Show less' : 'Show more' }
        />
        <Button basic size='small'
          color={ user.hasRole('admin') ? 'violet' : null }
          onClick={ this.props.onToggleAdmin }
          icon={ <Icon name='power'/> }
        />
        <Button basic size='small'
          color={ user.hasRole('volunteer') ? 'teal' : null }
          onClick={ this.props.onToggleVolunteer }
          icon={ <Icon name='heart'/> }
        />
      </Grid.Column>
    );
  }

  _toggleInfo() {
    this.setState({ moreInfo: !this.state.moreInfo });
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
