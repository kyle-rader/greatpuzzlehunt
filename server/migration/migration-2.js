import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

    if (Migrations.find({migration: '2'}).count() > 0) {
      console.log('Migration 2 Already complete. Skipping...');
      return;
    }

    let numFalseUsers = Meteor.users.find({emails: { $elemMatch: {verified: false}}}).count();

    console.log(numFalseUsers + " Non-Verified Users Found, sending verification emails");

    let users = Meteor.users.find({emails: { $elemMatch: {verified: false}}}).fetch();

    _.each(users, (user) => {
      
      let usernameMatches = user.username.match(/(w[0-9]+|@students\.wwu\.edu)/i);

      if (user.username.indexOf('@') > -1 || (usernameMatches && usernameMatches.length > 0)) {
        console.log(`${user.profile.displayname} has a bad username: \"${user.username}\" skipping...`);
        return; // This user's username is malformed so their email isn't going to work.
      }

      Accounts.sendVerificationEmail(user._id);

      console.log(`Email sent to ${user.emails[0].address}`);
    });

    console.log("");
    console.log("Migration 2 Done.");

    Migrations.insert({migration: '2'});

});
