import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { sortBy } from 'lodash';

const { siteName, accountsEmail, eventYear, siteURL } = Meteor.settings.public;

const USER_FIELDS = ["createdAt", "firstname", "lastname", "email", "accountType", "paid", "ticketUsed", "lookingForTeam", "age", "city", "state", "address", "zip", "phone", "ecName", "ecRelationship", "ecPhone", "ecEmail", "photoPermission", "holdHarmless"];
const TX_FIELDS = ["createdAt", "tx", "name", "email", "studentTickets", "nonStudentTickets"]
const GEAR_FIELDS = ["createdAt", "tx", "email", "itemcode", "color", "logoColor", "size", "qty", "amount"];

function buildReport(name, collection, fields) {
  let csv = fields.join(",") + "\n";
  collection.find({}, {sort: {"createdAt": 1}}).forEach((item) => {
    /* Convert to local time so these times line up with CashNet report */
    item.createdAt = new Date(item.createdAt).toLocaleString(
      'en-US',
      { timeZone: 'America/Vancouver' }
    );
    csv += fields.map((field) => {
      if(item[field] === false) return "FALSE";
      if(item[field] === null) return "NULL";
      return `"${item[field] || ''}"`
    }).join(",") + "\n"
  });
  return {
    filename: `${name}.csv`,
    content: csv,
    encoding: 'utf-8',
  };
}

function buildUsersAndTeams() {
  const users = Meteor.users.find({}).fetch();  
  const teams = Teams.find({}).fetch().reduce((acc, team) => {
    acc[team._id] = team;
    return acc;
  }, {});

  const usersWithTeams = sortBy(users.map((user) => {
      if (user.teamId) {
        const team = teams[user.teamId];
        user.teamDivision = team.division;
        user.teamName = team.name;
        user.teamIsPlaying = team.hasBegun;
        user.teamSize = team.members.length

        user.checkedIn = Boolean(user.checkedIn);
      }
      return user;
    }), ['division', 'teamName', 'firstname', 'lastname']);

  const fields = ["teamDivision", "teamName", "teamIsPlaying", "checkedIn", "firstname", "lastname", "phone"];
  let csv = fields.join(",") + "\n";
  usersWithTeams.forEach((user) => {
    csv += fields.map((field) => `"${user[field] || ''}"`).join(",") + "\n";
  });

  return {
    filename: `users_and_teams.csv`,
    content: csv,
    encoding: 'utf-8',
  };
}

export function sendReports(to = null) {
  if (Meteor.isClient) return;
  const now = new Date();
  const sendTo = to || Gamestate.findOne().sendReportsTo;
  const subject = `GPH ${eventYear} Admin Reports ${now}`;
  const html = `
<h3>Admin,</h3>
<p>
Attached are the admin reports for <a href="${siteURL}/admin/users">users</a>, transactions, and gear orders.
</p>

Cheers,
${siteName}
`;

  Meteor.logger.info(`Sending reports to: ${sendTo}`);

  return Email.send({
    from: accountsEmail,
    to: sendTo,
    subject,
    html,
    attachments: [
      buildReport("users", Meteor.users, USER_FIELDS),
      buildReport("transactions", Transactions, TX_FIELDS),
      buildReport("gear_orders", GearOrders, GEAR_FIELDS),
    ]
  });
};

export function sendUsersAndTeams(to = null) {
  if (Meteor.isClient) return;
  const now = new Date();
  const sendTo = to || Gamestate.findOne().sendReportsTo;
  const subject = `GPH ${eventYear} Admin Report: Users and Teams ${now}`;
  const html = `
<h3>Admin,</h3>
<p>
Attached are the users and teams!
</p>

Cheers,
${siteName}
`;

  Meteor.logger.info(`Sending reports to: ${sendTo}`);

  return Email.send({
    from: accountsEmail,
    to: sendTo,
    subject,
    html,
    attachments: [
      buildUsersAndTeams(),
    ]
  });
};
