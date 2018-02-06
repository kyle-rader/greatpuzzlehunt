import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import AdminTransactionsTable from './AdminTransactionsTable';

export default AdminTransactionsTracker = withTracker(({ search = null }) => {
  const handle = Meteor.subscribe('admin.transactions', search);
  const loading = !handle.ready();

  if (loading) {
    return { loading, transactions: [] };
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

  return {
    loading,
    transactions,
  };
})(AdminTransactionsTable);