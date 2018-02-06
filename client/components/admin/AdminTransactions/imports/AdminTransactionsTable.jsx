import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Message, Icon } from 'semantic-ui-react';
import { reduce } from 'lodash';

import AdminTransactionTableRow from './AdminTransactionTableRow';

class AdminTransactionTable extends Component {
  constructor(props) {
    super(props);
    this.state = this.stateFromProps(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateFromProps(nextProps));
  }

  stateFromProps(props) {
    const { transactions } = props;
    const counts = transactions.reduce((acc, tx) => {
      acc.students = acc.students + tx.studentTickets;
      acc.nonStudents = acc.nonStudents + tx.nonStudentTickets;
      return acc;
    }, { students: 0, nonStudents: 0 });
    return {
      studentTickets: counts.students,
      nonStudentTickets: counts.nonStudents,
      total: counts.students + counts.nonStudents,
    };
  }

  render() {
    const { loading, transactions } = this.props;
    const { total, studentTickets, nonStudentTickets } = this.state;
    if (loading) return <Loading />;

    return (
      <div> {/* outer div for react root component element */}
        <Message icon>
          <Icon name="ticket" color="blue"/>
          <Message.Content>
            <Message.Header>User Summary</Message.Header>
            <strong>Total Tickets:</strong> {total} &nbsp; <strong>Student:</strong> {studentTickets} &nbsp; <strong>Non-Student:</strong> {nonStudentTickets}
          </Message.Content>
        </Message>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Created</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Tx #</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this._mapTransactions()}
          </Table.Body>
        </Table>
      </div>
    );
  }

  _mapTransactions() {
    const { transactions } = this.props;
    return transactions.map((transaction) => <AdminTransactionTableRow transaction={transaction} key={transaction._id} />);
  }
}

AdminTransactionTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object),
};

export default AdminTransactionTable;