Meteor.startup(() => {
  Migrations.migrateTo('2');
});
