import { Meteor } from 'meteor/meteor';
import googleDistance from 'google-distance';

function computeDistanceTraveled(userId, { address, city, state, zip }) {
  const origin = '48.7335, -122.4873';
  const destination = `${address} ${city}, ${state} ${zip}`;

  console.log(`find distance for ${userId}`);
  googleDistance.get({ origin, destination }, Meteor.bindEnvironment(function _getDistance(err, data) {
    if (err) {
      Meteor.logger.info(`Failed to get distance traveled for user ${userId}, coming from ${destination}`);
      Meteor.logger.info(err);
    }
    const traveled = !err && data.distanceValue ? data.distanceValue : -1;
    Meteor.users.update(userId, { $set: { traveled } });
  }));
}

function updateUsersTraveled() {
  const users = Meteor.users.find({ traveled: { $exists: false } });
  users.forEach((user) => {
    Meteor.defer(() => computeDistanceTraveled(user._id, user));
  });
}

Meteor.startup(function() {
  Meteor.setInterval(updateUsersTraveled, 15000);
});
