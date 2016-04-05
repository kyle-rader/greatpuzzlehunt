import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  if (Meteor.users.find().count() === 0 && Migrations.find({migration: '2'}).count() === 0) {

    console.log("Fresh Install Performing Migration...");

    let users = JSON.parse(Assets.getText("migration/users.json"));
    let teams = JSON.parse(Assets.getText("migration/teams.json"));

    let userCnt = 0;
    _.each(users, (user) => {

      // Clearing fields that have special JSON type keys.
      user.services.resume= {};
      if (user.services.email) {
        user.services.email.verificationTokens = [];
      }
      if (user.services.password.reset) {
        user.services.password.reset = {};
      }

      let created = new Date(user.createdAt.$date);
      user.createdAt = created;

      Meteor.users.insert(user);

      if (user.emails.length > 0 && !user.emails[0].verified) {
        console.log(`User \"${user.username}\" has not verified their email!`);
        // Accounts.sendVerificationEmail(user._id);
      }

      userCnt++;

    });

    console.log(`\n*** Found ${teams.length} teams ***\n`);
    
    let teamCnt = 0;
    _.each(teams, (team) => {

      let created = new Date(team.created.$date);
      let updated = new Date(team.updated.$date);
      team.created = created;
      team.updated = updated;

      Teams.insert(team);

      teamCnt++;

    });

    console.log(`Migration Done. ${userCnt} users added.  ${teamCnt} teams added.`);
    Migrations.insert({migration: '2'});
  }

});
