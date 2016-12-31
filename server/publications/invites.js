import { Meteor } from 'meteor/meteor';

Meteor.publish('teams.invites', function() {
  const { userId } = this;
  if (!userId) return this.ready();

  const user = Meteor.users.findOne({ _id: userId });
  if (!user) return this.ready();

  return Invites.find({ teamId: user.teamId });
});
