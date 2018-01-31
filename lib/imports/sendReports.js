import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

const { siteName, accountsEmail, eventYear, siteURL } = Meteor.settings.public;

const USER_FIELDS = ["createdAt", "firstname", "lastname", "email", "accountType", "paid", "ticketUsed", "lookingForTeam", "age", "city", "state", "address", "zip", "phone", "ecName", "ecRelationship", "ecPhone", "ecEmail", "photoPermission", "holdHarmless"];

function buildUserExport() {
  let userCSV = USER_FIELDS.join(",") + "\n";
  Meteor.users.find().forEach((user) => {
    userCSV += USER_FIELDS.map((field) => user[field]) + "\n"
  });
  return {
    filename: 'users.csv',
    content: userCSV,
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
    ]
  });
};
