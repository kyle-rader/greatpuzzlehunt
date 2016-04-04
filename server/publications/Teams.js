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


Meteor.publish("myTeamMembers", function(){
  if (this.userId) {
      team = Teams.findOne({members: this.userId});
      return Meteor.users.find({_id:{$in:team.members}},
        {fields: {profile:1}});
  }
});
