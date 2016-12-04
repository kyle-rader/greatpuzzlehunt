/*
 * Meteor Startup:
 * For running appliction startup code
*/

Meteor.startup(() => {

  if (!Meteor.isServer)
    return;

  // Check for Admin account
  let adminUser = Meteor.users.findOne({roles: 'admin'});

  if (adminUser === undefined) {
    if (Meteor.settings.admin === undefined) {
        Meteor.logger.error("No \"admin\" object found in \"Meteor.settings\"");
        process.exit(1);
    }
    else if (Meteor.settings.admin.username === undefined) {
        Meteor.logger.error("No \"username\" field found in \"Meteor.settings.admin\"");
        process.exit(1);
    }
    else if (Meteor.settings.admin.email === undefined) {
        Meteor.logger.error("No \"email\" field found in \"Meteor.settings.admin\"");
        process.exit(1);
    }
    else if (Meteor.settings.admin.password === undefined) {
        Meteor.logger.error("No \"password\" field found in \"Meteor.settings.admin\"");
        process.exit(1);
    }

    const adminId = Accounts.createUser({
      username: Meteor.settings.admin.username,
      password: Meteor.settings.admin.password,
      firstname: Meteor.settings.admin.firstname,
      lastname: Meteor.settings.admin.lastname,
    });

    Accounts.addEmail(adminId, Meteor.settings.admin.email, true);

    Meteor.users.update({_id: adminId}, {
      $push: { roles: { $each: ['admin', 'volunteer'] } },
      $set: { updatedAt: new Date() },
    });

    adminUser = Meteor.users.findOne({roles: 'admin'});
    Meteor.logger.info("New Admin User: ");
  } else {
    Meteor.logger.info("Found Admin User: ");
  }
  Meteor.logger.logobj(adminUser);


  // const ONE_HOUR = 3600000;
  // const ONE_SEC = 1000;

  // // Check every 15 seconds.
  // Meteor.setInterval(() => {

  //     let gameState = GameState.findOne({});
  //     if (!gameState.gameplay)
  //         return; // Game not one - don't check for puzzles.

  //     console.log('Checking For Timed Out Puzzles');
  //     // Game ON Check For Puzzles out of time
  //     let attempts = PuzzleAttempts.find({finishTime: null}).fetch();

  //     for (let i = 0; i < attempts.length; i++) {
  //         // Is this Puzzle Attempt out of time?
  //         let attempt = attempts[i];
  //         if (Date.now() - attempt.startTime.getTime() >= ONE_HOUR) {
  //             PuzzleAttempts.update({_id: attempt._id}, {$set: {
  //                 finishTime: new Date(),
  //                 finalScore: (2 * ONE_HOUR)
  //             }});
  //         }
  //     }
  // }, ONE_SEC * 15);

});
