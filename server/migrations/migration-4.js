import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

  if (Migrations.find({migration: '4'}).count() === 0) {

    console.log("Performing Migration 4 - Cleaning Team Memberships");

    let teams = Teams.find({}).fetch();

    let rogueIdCnt = 0;

    _.each(teams, (team) => {

      // Check that each member id belongs to an active user - otherwise remove it.
      _.each(team.members, (member) => {
        if (!Meteor.users.findOne({_id: member})) {
          rogueIdCnt++;
          Teams.update({_id: team._id},  {
            $pull: {
              members: member
            }
          });
        }
      })
    });

    console.log(`Migration Done. ${rogueIdCnt} rogue users removed.`);

    Migrations.insert({migration: '4'});
  }

});
