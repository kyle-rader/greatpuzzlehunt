import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import moment from 'moment';
import { extend } from 'lodash';

Profile = class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = extend({
        edit: false,
      },
      this._makeStateFromUser(props.user)
    );
  }

  _makeStateFromUser(user) {
    return {
      updatedAt: user ? moment(user.updatedAt).fromNow() : '',
      showTeamPreview: user ? !user.hasRole('volunteer')  : false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState(this._makeStateFromUser(nextProps.user));
    }
  }

  render() {
    return (
      <Authed accessLevel="user">
        { this.props.user ? this._renderMain() : <Loading /> }
      </Authed>
    );
  }

  _renderMain() {
    const { showTeamPreview } = this.state;
    return (
    <Container>
      <PuzzlePageTitle
        title={this.props.user.name}
        subTitle={this.props.user.getEmail()}
      />
      Last Updated: {this.state.updatedAt}
      <ProfileEditor user={this.props.user} />

      {showTeamPreview ? <ProfileTeamPreview /> : null }

      <PasswordEditor />
    </Container>
    );
  }
}

Profile = withTracker((props) => {
  return {
    user: Meteor.user(),
  };
})(Profile);
