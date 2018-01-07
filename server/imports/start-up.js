/*
 * Meteor Startup:
 * For running appliction startup code
*/
import { cloneDeep } from 'lodash';

Meteor.startup(() => {

  if (!Meteor.isServer)
    return;

  // Check for Admin account
  let adminUser = Meteor.users.findOne({ email: 'kyle@kylerader.ninja', roles: 'admin' });

  if (adminUser === undefined) {

    if (!Meteor.settings.admin) {
      Meteor.logger.error('No "admin" object found in "Meteor.settings"');
      process.exit(1);
    }

    const adminProps = cloneDeep(Meteor.settings.admin);
    adminProps.updatedAt = new Date();

    const adminId = Accounts.createUser(adminProps);
    Accounts.addEmail(adminId, Meteor.settings.admin.email, true);

    adminUser = Meteor.users.findOne({ roles: 'admin' });
    Meteor.logger.info("New Admin User: ");

  } else {
    Meteor.logger.info("Found Admin User: ");
  }

  Meteor.logger.logobj(adminUser);

});
