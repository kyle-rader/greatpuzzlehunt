import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import moment from 'moment';
import { extend } from 'lodash';

Profile = class Profile extends Component {
<<<<<<< HEAD

  _makeStateFromUser(user) {
    return {
      updatedAt: user ? moment(user.updatedAt).fromNow() : '',
    };
  }

=======
>>>>>>> 41af6de... Update user list and teams
  constructor(props) {
    super(props);

    this.state = extend({
        edit: false,
      },
      this._makeStateFromUser(props.user)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.setState(this._makeStateFromUser(nextProps.user));
    }
  }

  _renderMain() {
    return (
    <Container>
      <PuzzlePageTitle title={`Profile: ${this.props.user.name}`} subTitle={`Last Updated: ${this.state.updatedAt}`}/>
    </Container>
    );
  }

  render() {
    return (
      <Authed accessLevel="user">
        { this.props.user ? this._renderMain() : <Loading /> }
      </Authed>
    );
  }
}

Profile = createContainer((props) => {
  return {
    user: Meteor.user()
  };
}, Profile);
