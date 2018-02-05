import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Message, Icon } from 'semantic-ui-react';
import { reduce } from 'lodash';

class AdminUserTable extends Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps(props) {
    const { loading, users } = props;
    const volunteerCount = reduce(users, (acc, user) => {
      if (user.accountType === 'VOLUNTEER') {
        acc += 1;
      }
      return acc;
    }, 0);

    return {
      userCount: users.length,
      volunteerCount,
      playerCount: users.length - volunteerCount,
    };
  }

  render() {
    const { loading, users } = this.props;
    const { userCount, volunteerCount, playerCount } = this.state;
    return (
    <div>
      <Message icon>
        <Icon name="users"/>
        <Message.Content>
          <Message.Header>User Summary</Message.Header>
            <strong>Total:</strong> {userCount} &nbsp; <strong>Players:</strong> {playerCount} &nbsp; <strong>Volunteers:</strong> {volunteerCount}
          </Message.Content>
        </Message>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Created At</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        </Table.Body>
      </Table>
    </div>
    );
  }
}

AdminUserTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(PropTypes.object),
};

export default AdminUserTable;