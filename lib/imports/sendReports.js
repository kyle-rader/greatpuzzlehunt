import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

const { siteName, accountsEmail, eventYear, siteURL } = Meteor.settings.public;

const USER_FIELDS = ["createdAt", "firstname", "lastname", "email", "accountType", "paid", "ticketUsed", "lookingForTeam", "age", "city", "state", "address", "zip", "phone", "ecName", "ecRelationship", "ecPhone", "ecEmail", "photoPermission", "holdHarmless"];

function buildUserExport() {
  let userCSV = USER_FIELDS.join(",") + "\n";
  Meteor.users.find().forEach((item) => {
    userCSV += USER_FIELDS.map((field) => item[field]) + "\n"
  });
  return {
    filename: 'users.csv',
    content: userCSV,
    encoding: 'utf-8',
  };
}

const TX_FIELDS = ["createdAt", "tx", "name", "email", "studentTickets", "nonStudentTickets"]

function buildTxReport() {
  let txCSV = TX_FIELDS.join(",") + "\n";
  Transactions.find().forEach((item) => {
    txCSV += TX_FIELDS.map((field) => item[field]) + "\n"
  });
  return {
    filename: 'transactions.csv',
    content: txCSV,
    encoding: 'utf-8',
  };
}

const GEAR_FIELDS = ["createdAt", "tx", "email", "itemcode", "color", "logoColor", "size", "qty", "amount"];

function buildGearExport() {
  let gearCSV = GEAR_FIELDS.join(",") + "\n";
  GearOrders.find().forEach((item) => {
    gearCSV += GEAR_FIELDS.map((field) => item[field]) + "\n"
  });
  return {
    filename: 'gear.csv',
    content: gearCSV,
    encoding: 'utf-8',
  };
}

export function sendReports() {
  if (Meteor.isClient) return;
  const now = new Date();
  const sendTo = Gamestate.findOne().sendReportsTo;
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
      buildUserExport(),
      buildTxReport(),
      buildGearExport(),
    ]
  });
};
