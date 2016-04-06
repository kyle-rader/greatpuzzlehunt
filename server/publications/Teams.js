import { Meteor } from 'meteor/meteor';

Meteor.publish('teams', function() {
    let fields = {
        name: 1,
        members: 1
    };

    return Teams.find({}, {fields: fields});
});

Meteor.publish('myTeam', function() {
    if (this.userId) {
        return Teams.find({members: this.userId});
    }
});


Meteor.publish("myTeamMembers", function() {
  if (this.userId) {
      team = Teams.findOne({members: this.userId});
      return Meteor.users.find({_id:{$in:team.members}},
        {fields: {profile:1}});
  }
});

Meteor.publish('teams.all', function() {
  if (!this.userId) return [];

  let user = Meteor.users.findOne(this.userId);

  if (user.roles.indexOf('admin') > -1) {
    return Teams.find({});
  }

});

Meteor.publish('team.members', function(teamId) {
  check(teamId, String);
  
  if (!this.userId) return [];

  let user = Meteor.users.findOne(this.userId);

  if (user.roles.indexOf('admin') < 0) {
    return [];
  } else {
    return Meteor.users.find({"profile.teamId": teamId}, {username: 1, profile: 1, emails: 1});
  }
})