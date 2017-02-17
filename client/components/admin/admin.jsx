import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Container, Icon, Menu } from 'semantic-ui-react';

const adminMenuItems = [
  {
    name: 'Users',
    to: 'users',
    iconClass: 'green user',
  },
  {
    name: 'Add Users',
    to: 'add-users',
    iconClass: 'green plus',
  },
  {
    name: 'Teams',
    to: 'teams',
    iconClass: 'blue users',
  },
  {
    name: 'Puzzles',
    to: 'puzzles',
    iconClass: 'violet puzzle',
  },
  {
    name: 'Email',
    to: 'email',
    iconClass: 'orange mail',
  },
  {
    name: 'Game',
    to: 'game',
    iconClass: 'red gamepad',
  },
  {
    name: 'Scoring',
    to: 'scoring',
    iconClass: 'yellow trophy',
  },
];

Admin = class Admin extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Authed accessLevel='admin'>
        <Container>
          <PuzzlePageTitle title="Admin" />
          <Menu icon="labeled">
            { this._renderMenuLinks() }
          </Menu>

          {this.props.children}

        </Container>
      </Authed>
    );
  }

  _renderMenuLinks() {
    return adminMenuItems.map((item) => (
      <Link key={item.to} className="item" to={`/admin/${item.to}`}>
        <Icon className={item.iconClass}/>
        { item.name }
      </Link>
    ));
  }
}
