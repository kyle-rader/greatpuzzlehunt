Meteor.startup(() => {
  Migrations.migrateTo('4');
});
