import { Meteor } from 'meteor/meteor';
import { isAdmin } from '../../lib/imports/method-helpers.js';

Meteor.users.deny({
  update: () => {
    return true;
  }
});

Meteor.publish(null, function() {
  const { userId } = this;

  if (userId) {
    return Meteor.users.find({
      _id: userId
    }, {
      fields: {
        emails: 1,
        firstname: 1,
        lastname: 1,
        name: 1,
        roles: 1,
        updatedAt: 1,
        address: 1,
        city: 1,
        state: 1,
        zip: 1,
        age: 1,
        email: 1,
        name: 1,
        phone: 1,
        isAdult: 1,
        registrationType: 1,
        photoPermission: 1,
        legalGuardian: 1,
        teamId: 1,
      }
    });
  } else {
    return this.ready();
  }
});

Meteor.publish('admin.users', function(){
  return isAdmin() ? Meteor.users.find({}) : this.ready();
});
