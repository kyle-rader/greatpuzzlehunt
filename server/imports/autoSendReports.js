import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { sendReports } from '../../lib/imports/sendReports';

const CHECK_INTERVAL = {
  minutes: 1,
};

function autoSendReports() {
  const now = moment();
  const gameState = Gamestate.findOne();
  const lastAutoReportSend = moment(gameState.lastAutoReportSend || moment(now).subtract(2, 'day'));
  const waitingUntil = moment(lastAutoReportSend).add(1, 'day');

  Meteor.logger.info(`Checking to send auto reports. now: ${now} .. waiting for ${waitingUntil}`);

  if (now.isAfter(waitingUntil)) {
    const sendTime = moment(now).startOf('hour');
    Meteor.logger.info(`Sending auto reports at ${sendTime} to: ${gameState.sendReportsTo}`);
    sendReports(gameState.sendReportsTo);
    Gamestate.update({ _id: gameState._id}, { $set: { lastAutoReportSend: sendTime }});
  }
}

Meteor.startup(() => {
  // On Startup, init Interval for puzzle timeout watcher.
  const interval = moment.duration(CHECK_INTERVAL).asMilliseconds();
  Meteor.setInterval(autoSendReports, interval);
});
