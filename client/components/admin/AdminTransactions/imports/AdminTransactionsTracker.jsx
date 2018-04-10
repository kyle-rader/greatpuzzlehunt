import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { groupBy } from 'lodash';

import AdminTransactionsTable from './AdminTransactionsTable';

export default AdminTransactionsTracker = withTracker(({ search = null }) => {
  const handle = Meteor.subscribe('admin.transactions', search);
  const loading = !handle.ready();

  if (loading) {
    return { loading, transactions: [], tickets: null, gearOrders: null };
  }

  const hasSearch = search && search.length > 0;

  const defaultSort = [
    ['createdAt', 'desc'],
  ];

  const options = {
    sort: defaultSort,
  };

  let query = {};
  if (hasSearch) {
    search = search.trim();
    query = {
      $or: [
        { 'name': { $regex: search, $options: 'i' } },
        { 'email': { $regex: search, $options: 'i' } },
        { 'tx': { $eq: search } },
      ],
    };
  }

  const transactions = Transactions.find(query, options).fetch();

  const tickets = groupBy(Tickets.find({}).fetch(), (ticket) => ticket.tx);
  const gearOrders = groupBy(GearOrders.find({}).fetch(), (order) => order.tx);

  return {
    loading,
    transactions,
    tickets,
    gearOrders,
  };
})(AdminTransactionsTable);
