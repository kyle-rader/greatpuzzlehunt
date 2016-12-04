import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import moment from 'moment';

Profile = class Profile extends Component {

  constructor(props) {
    super(props);

    this.state = {
      edit: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.updatedAt) {
      this.setState({ updatedAt: moment(nextProps.user.updatedAt).fromNow() });
    }
  }

  _renderMain() {
    return (
    <Container>
      <PuzzlePageTitle title={`Profile: ${this.props.user.displayname}`} subTitle={`Last Updated: ${this.state.updatedAt}`}/>
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
