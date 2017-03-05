import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { times, random } from 'lodash';
import { requireUser } from '../imports/method-helpers.js';

// Defining our Posts collection

Teams = new Mongo.Collection('teams');

// Ensure index
Meteor.startup(function () {
  if (Meteor.isServer) {
    Teams._ensureIndex({ "name": 1});
  }
});

Meteor.methods({
  'teams.upsert'(team) {
    check(team, {
      name: String,
      password: String,
      division: String,
      _id: Match.Maybe(String),
    });

    const isNewTeam = !team._id;
    const user = Meteor.user();

    if (!user) {
      throw new Meteor.Error(400, 'You must be logged in!');
    }

    // Only execute the rest of this function on the server.
    if (!Meteor.isServer) {
      return true;
    }

    const now = new Date();
    team.name = team.name.trim();
    team.updatedAt = now;

    // Add initial fields for new teams
    if (isNewTeam) {
      team = _.extend(team, {
        owner: user._id,
        createdAt: now,
        members: [user._id],
        destination: null,
        lfm: true,
      });
    }

    // Trim fields:
    team.name = team.name.trim();
    team.password = team.password.trim();

    // Check for existing team name
    const opts = {
      name: team.name,
    };
    if (!isNewTeam) {
      opts._id = { $ne: team._id };
    };
    const duplicateNameTeam = Teams.findOne(opts);
    if (duplicateNameTeam) {
      throw new Meteor.Error(400, 'A team with that name already exists!');
    }

    // if team already exists check the update is comig from a current memeber:
    if (!isNewTeam) {
      const thisTeam = Teams.findOne({_id: team._id });
      if (_.indexOf(thisTeam.members, user._id) === -1) {
        throw new Meteor.Error(404, 'You are not on this team!');
      }
    }

    // Upsert the team
    const selector = isNewTeam ? { name: team.name } : { _id: team._id };
    const result = Teams.upsert(selector, { $set: team });

    if (result.insertedId) {
      Meteor.users.update(user._id, { $set: { teamId: result.insertedId } });
    }

    return result;
  },

  'teams.removeMember'(member) {
    check(member, Object);

    requireUser();
    const user = Meteor.users.findOne({ _id: this.userId });
    const memberToDelete = Meteor.users.findOne({ _id: member._id });
    const team = Teams.findOne({ _id: user.teamId });

    if (memberToDelete._id === user._id) {
      throw new Meteor.Error(400, 'You cannot remove yourself! (To delete your team you must enter the Danger Zone and delete your team!)');
    }

    // Check this user has authority to delete other users.
    if (team.owner === user._id && memberToDelete.teamId === team._id) {
      Meteor.users.update({ _id: memberToDelete._id }, { $set: { teamId: null }});
      Teams.update({ _id: team._id }, { $pull: { members: memberToDelete._id }});
      return true;
    } else {
      throw new Meteor.Error(400, 'You must be the team owner to remove members!');
    }
  },

  'teams.join'(teamId, password) {
    check(teamId, String);
    check(password, String);

    const user = Meteor.user();
    if (!user) throw new Meteor.Error(400, 'You must be logged in!');
    else if (user.teamId) throw new Meteor.Error(400, 'You are already on a team!');

    // Everything else should only run on the server.
    if (!Meteor.isServer) return true;

    const team = Teams.findOne(teamId);
    if (!team) {
      throw new Meteor.Error(400, 'No Team with that Id!');
    }
    else if (team.members.length >= 6) {
      throw new Meteor.Error(400, 'Sorry this team is full!');
    }
    else if (password.trim() !== team.password) {
      throw new Meteor.Error(400, 'Incorrect password!');
    }

    // Goo to add user to team.
    Teams.update(teamId, { $push: { members: user._id }, $set: { updatedAt: new Date() } });
    Meteor.users.update(user._id, { $set: { teamId: teamId } });
    // Also check if there were any invites for this user to this team.
    Invites.update({
      teamId,
      email: user.getEmail(),
    }, {
      $set: { accepted: true },
    });
    return true;
  },

  'teams.leave'() {
    requireUser();

    const user = Meteor.user();
    if (!user.teamId) {
      throw new Meteor.Error(400, 'You must be on a team to leave your team!');
    }
    const team = Teams.findOne({ _id: user.teamId });
    if (user._id === team.owner) {
      throw new Meteor.Error(400, 'You must delete your team if you are the owner and you want to leave your team!');
    }

    Meteor.users.update({ _id: user._id }, { $set: { teamId: null }});
    Teams.update({_id: team._id }, { $pull: { members: user._id }});
    return true;
  },

  'teams.delete'() {
    requireUser();

    const user = Meteor.user();
    if (!user.teamId) {
      throw new Meteor.Error(400, 'You must be on a team to leave your team!');
    }
    const team = Teams.findOne({ _id: user.teamId });
    if (user._id !== team.owner) {
      throw new Meteor.Error(400, 'You must be the owner of your team to delete it!');
    }

    Meteor.users.update({ teamId: user.teamId }, { $set: { teamId: null } }, { multi: true });
    Invites.remove({ teamId: user.teamId });
    Teams.remove({ _id: team._id });
    return true;
  },

  teamsAdminAssignDestinations() {
    check(this.userId, String);
    let user = Meteor.users.findOne({_id: this.userId});
    if (user.roles.indexOf('admin') < 0)
      throw new Meteor.Error(403, 'You are not allowed to do that!');

    let puzzles = PuzzleCollection.find({}).fetch();
    let numPuzzles = puzzles.length;

    if (numPuzzles < 1) {
      throw new Meteor.Error(400, 'There are no puzzles!');
    }
    let teams = Teams.find({}).fetch();

    let locations = puzzles.map((puzzle) => {
      return `${puzzle.name}: ${puzzle.location}`;
    });

    for (let i = 0; i < teams.length; i++) {
      Teams.update({_id: teams[i]._id}, {$set: {destination: locations[i % numPuzzles]}});
    }
    return true;
  },

  'test.makeTeams'(teamCount) {
    check(teamCount, Number);

    if (process.env.NODE_ENV !== 'development' || !Meteor.isServer) {
      throw new Meteor.Error(400, 'This method is unavailable');
    }

    const divisions = ['wwu-student', 'wwu-alumni', 'post-secondary', 'high-school', 'open'];

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
        division: divisions[random(0,4)],
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

  'test.reset'() {
    if (process.env.NODE_ENV !== "development" || !Meteor.isServer) {
      throw new Meteor.Error(400, 'This method is unavailable');
    }
    // Remove Users and Teams matching the gph test pattern
    const usersResult = Meteor.users.remove({});
    const teamsResult = Teams.remove({});
    const txResult = Transactions.remove({});
    const tshirtsResult = Tshirts.remove({});
    const invitesResult = Invites.remove({});

    Meteor.logger.info(`Removed ${usersResult} users...`);
    Meteor.logger.info(`Removed ${teamsResult} teams...`);
    Meteor.logger.info(`Removed ${txResult} transactions...`);
    Meteor.logger.info(`Removed ${tshirtsResult} tshirts...`);
    Meteor.logger.info(`Removed ${invitesResult} invites...`);
  }

});
