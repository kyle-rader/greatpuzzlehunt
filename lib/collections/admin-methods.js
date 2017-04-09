import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { times, random } from 'lodash';
import { requireAdmin, requireVolunteer, notDuringGameplay } from '../imports/method-helpers.js';
import { cloneDeep, omit, sum } from 'lodash';

function teamPuzzleCopy(puzzle) {
  const copy = cloneDeep(omit(puzzle, ['_id']));
  copy.answer = null;
  copy.hintsTaken = 0;
  copy.puzzleId = puzzle._id;
  copy.hints.forEach((hint, i) => {
    hint.taken = false;
  });
  copy.start = null; // JS Date Object
  copy.end = null; // JS Date Object
  copy.score = null; // Score will be stored in seconds.
  return copy;
}

Meteor.methods({

  'admin.validateUser'(userId) {
    check(userId, String);
    requireAdmin();

    if (!Meteor.isServer) return true;

    const user = Meteor.users.findOne(userId);
    if (!user) throw new Meteor.Error(400, 'No user Found');

    return Meteor.users.update(user._id, {
      $set: {
        'emails.0.verified': true,
      }
    });
  },

  'admin.teams.setup'() {
    requireAdmin();
    if (!Meteor.isServer) return true;

    notDuringGameplay();

    const puzzles = Puzzles.find().fetch();
    if (puzzles.length === 0) throw new Meteor.Error(400, 'There are no Puzzles!');

    const puzzleCopies = puzzles.map(teamPuzzleCopy);

    // Warning Update All Puzzle and will override!
    return Teams.update({}, {
      $set: {
        puzzles: puzzleCopies,
        currentPuzzle: null,
        finalScore: 0,
      }
    }, {
      multi: true,
    });
  },

  'admin.teams.traveled'() {
    requireAdmin();
    if (!Meteor.isServer) return [];

    let teams = Teams.find({
      hasBegun: true,
      $or: [
        { members: { $size: 4 } },
        { members: { $size: 5 } },
        { members: { $size: 6 } },
      ],
    }, {
      fields: {
        name: 1, finalScore: 1, members: 1, division: 1,
      }
    }).fetch();

    teams = teams.map((t) => {
      const users = Meteor.users.find({ teamId: t._id }, { fields: { traveled: 1, city: 1, state: 1, name: 1 } }).fetch();
      t.totalTraveled = sum(users.map((u) => u.traveled)) / 1000.0;
      t.users = users;
      return t;
    });

    return teams;
  }

});

if (Meteor.isServer) {
  Meteor.methods({
    'admin.test.makeTeams'(teamCount) {
      check(teamCount, Number);
      if (!Meteor.isServer) return true;

      if (process.env.NODE_ENV !== 'development' || !Meteor.isServer) {
        throw new Meteor.Error(400, 'This method is unavailable');
      }

      const divisions = [
        'wwu-student',
        'wwu-alumni',
        'open',
      ];

      // Create Team Iteration
      times(teamCount, (i) => {
        const userCount = random(2, 6);
        const users = new Array(userCount);

        // Create Users Iteration
        times(userCount, (j) => {
          const userUnique = `t${i}u${j}`;
          const age = random(14, 70);
          const isAdult = age >= 18;
          const registrationType = random(0, 1) ? 'student' : 'non-student';
          const photoPermission = random(0, 100) > 5;

          users[j] = Accounts.createUser({
            firstname: `firstName${userUnique}`,
            lastname: `lastName${userUnique}`,
            name: `firstName${userUnique} lastName${userUnique}`,
            username: `testuser${userUnique}`,
            password: `testpassword${userUnique}`,
            roles: ['user'],
            address: '12345 NE 1st Street',
            city: 'Bellingham',
            state: 'WA',
            zip: '98225',
            age,
            phone: '1112223333',
            isAdult,
            registrationType,
            photoPermission,
            legalGuardian: {},
            emergencyContact: {
              name: `EC for user ${userUnique}`,
              relation: 'family',
              phone: '1231231234',
              altPhone: '',
              email: ''
            }
          });
          Accounts.addEmail(users[j], `testemail${userUnique}@example.com`, true);
        });

        const now = new Date();
        const team = {
          name: `GPH Test Team ${i}`,
          password: `teampassword${i}`,
          owner: users[0],
          createAt: now,
          updatedAt: now,
          destination: '',
          members: users,
          lfm: (userCount < 6),
          division: divisions[random(0,divisions.length)],
        };

        // Create the Team
        const newTeamId = Teams.insert(team, (err) => {
          if (err) {
            throw new Meteor.Error(err.reason);
          }
        });

        const teamOptions = {
          $set: {
            "teamId": newTeamId,
            "updatedAt": new Date(),
          },
        };

        // Update all users to have this teamId.
        Meteor.users.update({ _id: { $in: users } }, teamOptions, { multi: true });

        Meteor.logger.info(`Created team ${i} (${newTeamId}) with ${userCount} member(s)`);
      });
    },

    'admin.test.reset'() {
      if (!Meteor.isServer) return true;
      if (process.env.NODE_ENV !== "development" || !Meteor.isServer) {
        throw new Meteor.Error(400, 'This method is unavailable');
      }

      // Remove Users and Teams matching the gph test pattern
      const usersResult = Meteor.users.remove({});
      const teamsResult = Teams.remove({});
      const txResult = Transactions.remove({});
      const tshirtsResult = Tshirts.remove({});
      const invitesResult = Invites.remove({});
      const promoResult = PromoCodes.remove({});

      Meteor.logger.info(`Removed ${usersResult} users...`);
      Meteor.logger.info(`Removed ${teamsResult} teams...`);
      Meteor.logger.info(`Removed ${txResult} transactions...`);
      Meteor.logger.info(`Removed ${tshirtsResult} tshirts...`);
      Meteor.logger.info(`Removed ${invitesResult} invites...`);
      Meteor.logger.info(`Removed ${promoResult} promo codes...`);
    },

    'admin.test.resetPuzzles'() {
      Teams.update({}, {
        $unset: {
          currentPuzzle: true,
          puzzles: true
        },
        $set: {
          hasBegun: false
        }
      }, {
        multi: true
      });

      const puzzles = Puzzles.find().fetch();
      const puzzleCopies = puzzles.map(teamPuzzleCopy);

      return Teams.update({
        puzzles: { $exists: false }
      }, {
        $set: {
          puzzles: puzzleCopies,
          currentPuzzle: null,
          finalScore: 0,
        }
      }, {
        multi: true,
      });
    },

  });
}
