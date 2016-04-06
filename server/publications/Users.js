// Allow and Denys

import { Meteor } from 'meteor/meteor';

Meteor.users.deny({
    update: () => {
        return true;
    }
});

Meteor.publish(null, function() {
    let currentUser = this.userId;

    if (currentUser) {
    return Meteor.users.find({
        _id: currentUser
    }, {
    fields: {
        // Default
        emails: 1,
        // Default
        profile: 1,
        // Created roles property
        roles: 1
    }
      });
    } else {
        return this.ready();
    }
});

Meteor.publish('users.all', function() {

    if (!this.userId) return [];

    let user = Meteor.users.findOne(this.userId);

    if (user.roles.indexOf('admin') > -1) {
        return Meteor.users.find(
            {},
            {
                username: 1,
                emails: 1,
                profile: 1,
                roles: 1
            });
    }
});

Meteor.publish("users.floaters", function(){
  //ez logged in check
  if(this.userId){
    return Meteor.users.find({"profile.teamId": null}, {fields:{emails:1, profile:1}});
  }
});
