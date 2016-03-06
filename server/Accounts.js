// Setup Email
Accounts.emailTemplates.siteName = 'WWU Puzzle Hunt';
Accounts.emailTemplates.from = 'WWU Puzzle Hunt <accounts@wwupuzzlehunt.com>';
Accounts.emailTemplates.verifyEmail = {
    subject(user) {
        return 'Welcome to the WWU Puzzle Hunt ' + user.profile.firstname;
    },
    text(user, url) {
        return 'Welcome ' + user.profile.firstname + ', to the First Annual WWU Great Puzzle Hunt!\n\n' +
        'Please verify your email address by clicking the link below.\n' +
        url + ' \n\n' +
        'Cheers,\n' +
        'The WWU Puzzle Hunt Team';
    }
};