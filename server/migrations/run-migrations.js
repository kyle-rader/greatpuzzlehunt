Meteor.startup(() => {
  Migrations.migrateTo('5');
});
