import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

import { registrationInfoHTML, questions, signature } from './emails';

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

  const subject = `${siteName} Ticket Codes`;
  const html = `
<p>Thank you for purchasing tickets for the ${eventYear} ${siteName}.</p>
<p><a target="_blank" href="${siteURL}/redeem">Redeem a ticket code</a> to finish registering your account.</p>
${questions}
${studentTicketsHTML}
${nonStudentTicketsHTML}
${registrationInfoHTML}
${signature}`;

  return Email.send({
    from: accountsEmail,
    to: boughtBy,
    subject,
    html,
  });
};

function ticketsHTML(type, tickets) {
  if (tickets.length === 0) return '';

  const intro = `<h4>${type} Tickets</h4>`;
  const ticketsList = tickets.map((t) => ticketHTML(t)).join(' ');
  return html = `
  ${intro}
  <ul>${ticketsList}</ul>`;
};

function ticketHTML(ticket) {
  return `<li><code style="font-size:11pt;">${ticket.code}</code></li>`;
};
