import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { sendReports } from '../../lib/imports/sendReports';

const CHECK_INTERVAL = {
  minutes: 30,
};

function autoSendReports() {
  const now = moment();
  const lastAutoReportSend = moment(Gamestate.findOne().lastAutoReportSend || moment(now).subtract(2, 'day'));
  const waitingUntil = moment(lastAutoReportSend).add(1, 'day');

  Meteor.logger.info(`Checking to send auto reports. now: ${now} .. waiting for ${waitingUntil}`);

  if (now.isAfter(waitingUntil)) {
    const sendTime = moment(now).startOf('hour');
    Meteor.logger.info(`Sending auto reports at ${sendTime}`);
    Gamestate.update({}, { lastAutoReportSend: sendTime });
    sendReports();
  }
}

Meteor.startup(() => {
  // On Startup, init Interval for puzzle timeout watcher.
  const interval = moment.duration(CHECK_INTERVAL).asMilliseconds();
  Meteor.setInterval(autoSendReports, interval);
});
