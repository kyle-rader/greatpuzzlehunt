Meteor.startup(() => {
  Migrations.migrateTo('3');
});
