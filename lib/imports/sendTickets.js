import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

const { siteName, accountsEmail, eventYear, siteURL } = Meteor.settings.public;

export function sendTickets(tx, boughtBy) {
  Meteor.logger.info(`Sending tickets for tx: ${tx} to: ${boughtBy}`);

  const studentTickets = Tickets.find({ tx: tx, boughtBy: boughtBy, type: 'STUDENT' }).fetch();
  const nonStudentTickets = Tickets.find({ tx: tx, boughtBy: boughtBy, type: 'NONSTUDENT' }).fetch();

  if ((studentTickets.length + nonStudentTickets.length) === 0) {
    Meteor.logger.info(`tx:${tx} boughtBy:${boughtBy} - Has no tickets!`);
    return;
  }
  
  const studentTicketsHTML = ticketsHTML('Student', studentTickets);
  const nonStudentTicketsHTML = ticketsHTML('Non-Student', nonStudentTickets);

  const subject = `${siteName} Tickets!`;
  const html = `
<p>Thank you for purchasing tickets for the ${eventYear} ${siteName}.</p>
<p>Your next step is to <a target="_blank" href="${siteURL}/redeem">redeem a ticket</a> to activate your account.</p>
<p>These ticket codes are redeemable by whomever has them. Share them wisely!</p>
<p>
Important Registration Information:
<ul>
  <li>One ticket code must be redeemed to activate an account.</li>
  <li>Each account on a team must be activated in order to participate.</li>
  <li>You can only redeem a code that matches your account type (student or non-student).</li>
</ul>

${studentTicketsHTML}
${nonStudentTicketsHTML}

Welcome to the Hunt,<br/>
From the ${siteName} Team`;

  return Email.send({
    from: accountsEmail,
    to: boughtBy,
    subject,
    html,
  });
};

function ticketsHTML(type, tickets) {
  if (tickets.length === 0) return '';

  const intro = `<h3>${type} Tickets</h3>`;
  const ticketsList = tickets.map((t) => ticketHTML(t)).join(' ');
  return html = `
  ${intro}
  <ul>${ticketsList}</ul>
  <br/>`;
};

function ticketHTML(ticket) {
  const beginning = `<li><code style="font-size:12pt;">${ticket.code}</code>`;
  const status = ' Status: ' + (ticket.redeemed ? `Redeemed by: ${ticket.redeemedBy}` : 'Not redeemed');
  const ending = '</li>';
  return `${beginning} ${status} ${ending}`;
};
