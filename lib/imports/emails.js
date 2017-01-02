import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

const { siteName, accountsEmail, eventYear } = Meteor.settings.public;

export const emailTeamInvite = (team, user, to) => {

  const subject = `You've been invited to join ${team.name} in the Great Puzzle Hunt!`;
  const registerUrl = Meteor.absoluteUrl('register', { secure: Meteor.isProduction });
  const loginUrl = Meteor.absoluteUrl('profile', { secure: Meteor.isProduction });

  const html = `
<h2>Hello there!</h2>
<p>You have been invited by ${user.name} to join the team "${team.name}" in the 2017 Great Puzzle Hunt!</p>
<p>To accept your invitiation follow these steps:</p>
<ol>
  <li>If you have not done so already, <a href="${registerUrl}" target="_blank">register for the ${eventYear} Great Puzzle Hunt</a></li>
  <li><a href="${loginUrl}" target="_blank">Log in to your profile</a> and accept your invitation!</li>
</ol>
<br>

<p>We'll see you soon!</p>
<p>If you have any questions email support@greatpuzzlehunt.com</p>
<br>
<p>Cheers,
The ${siteName} team!</p>
`;

  return Email.send({
    from: accountsEmail,
    to,
    subject,
    html,
  });
};
