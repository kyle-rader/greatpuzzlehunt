import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Menu } from 'semantic-ui-react';

AdminEmailContainer = class AdminEmailContainer extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title='Email'/>
        <Menu>
          <Menu.Item>
            <Link to='/admin/email/mailer'>Mailer</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to='/admin/email/lists'>Lists</Link>
          </Menu.Item>
        </Menu>
        { this.props.children }
      </Container>
    );
  }
}
