import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

const { siteName, accountsEmail, eventYear, siteURL } = Meteor.settings.public;

const USER_FIELDS = ["createdAt", "firstname", "lastname", "email", "accountType", "paid", "ticketUsed", "lookingForTeam", "age", "city", "state", "address", "zip", "phone", "ecName", "ecRelationship", "ecPhone", "ecEmail", "photoPermission", "holdHarmless"];
const TX_FIELDS = ["createdAt", "tx", "name", "email", "studentTickets", "nonStudentTickets"]
const GEAR_FIELDS = ["createdAt", "tx", "email", "itemcode", "color", "logoColor", "size", "qty", "amount"];

function buildReport(name, collection, fields) {
  let csv = fields.join(",") + "\n";
  collection.find().forEach((item) => {
    csv += fields.map((field) => `"${item[field] || ''}"`).join(",") + "\n"
  });
  return {
    filename: `${name}.csv`,
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
