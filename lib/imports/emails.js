import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';

const { siteName, siteURL, accountsEmail, eventYear } = Meteor.settings.public;

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

export const registrationInfoHTML = `
<p>
  <h4>Registration for the ${eventYear} ${siteName} is a 3-step process:</h4>
  <ol>
    <li>
      Create account at <a target="_blank" href="${siteURL}/register">${siteURL}/register</a>.<br/>
      Deadline: <strong>11:59 PM April 12, 2018</strong>
    </li>
    <li>
      Purchase ticket code at <a target="_blank" href="https://commerce.cashnet.com/TheGreatPuzzleHunt2018">https://commerce.cashnet.com/TheGreatPuzzleHunt2018</a>.<br/>
      Deadline: <strong>10:00 AM April 14, 2018</strong>
    </li>
    <li>
      Redeem ticket code at <a target="_blank" href="${siteURL}/redeem">${siteURL}/redeem</a>.<br/>
      Deadline: <strong>10:59 AM April 14, 2018</strong>
    </li>
  </ol>
  <h4>Important Registration Information:</h4>
  <ul>
    <li>
      Participants are welcome to purchase extra ticket codes for others to redeem.
      <ul>
        <li>Anyone who gains access to a ticket code may redeem it.</li>
        <li>Each ticket code may be used only once.</li>
      </ul>
    </li>
    <li>Each participant must redeem a ticket code to complete their registration.</li>
    <li>Each member of a team must complete their registration for the team to participate.</li>
  </ul>
</p>
`;
