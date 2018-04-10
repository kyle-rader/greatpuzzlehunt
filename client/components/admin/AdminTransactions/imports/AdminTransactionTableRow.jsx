import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Button, Item } from 'semantic-ui-react';
import moment from 'moment';

class AdminTransactionTableRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { transaction } = this.props;
    if (!transaction) {
      return <Table.Row negative>MISSING transaction!</Table.Row>;
    }

    return (
      <Table.Row>
        <Table.Cell>{this._createdAt()}</Table.Cell>
        <Table.Cell>{this._name()}</Table.Cell>
        <Table.Cell>{this._email()}</Table.Cell>
        <Table.Cell>{this._tx()}</Table.Cell>
        <Table.Cell>{this._actions()}</Table.Cell>
        <Table.Cell>{this._tickets()}</Table.Cell>
      </Table.Row>
    );
  }

  _createdAt() {
    const { transaction } = this.props;
    return moment(transaction.createdAt).format("MMM Do");
  }

  _name() {
    const { transaction } = this.props;
    return transaction.name;
  }

  _email() {
    const { transaction } = this.props;
    return transaction.email
  }

  _tx() {
    const { transaction } = this.props;
    return transaction.tx;
  }

  _emailVerified() {
    return this.props.transaction.isVerified();
  }

  _actions() {
    const { transaction, tickets, gearOrders } = this.props;
    const { tx } = transaction;
    return [
      <Button basic key={`${tx}-btn-1`} icon='mail' content='Resend' onClick={() => this._resendTickets(transaction)}/>,
    ];
  }

  _resendTickets({ tx, email }) {
    const confirmMessage = `Are you sure you want to resend the ticket email for\nTx: ${tx} to ${email}?`;
    if (confirm(confirmMessage)) {
      Meteor.call('admin.transactions.resend', tx, email, (error, result) => {
        if (error) return alert(error.reason);
        alert("Sent!");
      });
    }
  }

  _tickets() {
    const { tickets } = this.props;
    if (!tickets) return null;
    return tickets.map((ticket) => {
      const { code, redeemed, redeemedBy } = ticket;
      return (
        <Item key={code}><code>{code}</code> &nbsp; { redeemed ? `Used by: ${redeemedBy}` : null}</Item>
      );
    });
  }
}

AdminTransactionTableRow.propTypes = {
  transaction: PropTypes.object.isRequired,
  tickets: PropTypes.arrayOf(Object),
  gearOrders: PropTypes.arrayOf(Object),
};

export default AdminTransactionTableRow;
