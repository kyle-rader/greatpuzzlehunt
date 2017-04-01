import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { times, random } from 'lodash';
import { requireUser, requireVolunteer } from '../imports/method-helpers.js';
import { pick, find, findIndex } from 'lodash';

import { scorePuzzle } from '../imports/puzzle-helpers';

Teams = new Mongo.Collection('teams');

// Ensure index
Meteor.startup(function () {
  if (Meteor.isServer) {
    Teams._ensureIndex({ "name": 1});
  }
});

Meteor.methods({
  'team.owner'(userId) {
    check(userId, String);
    const user = Meteor.user();
    if (!user) {
      throw new Meteor.Error(400, 'You must be logged in!');
    }

    const owner = Meteor.users.findOne(userId);
    return owner ? {
      name: owner.name,
      email: owner.getEmail(),
      phone: owner.phone,
    } : null;
  },

  'teams.upsert'(team) {
    check(team, {
      name: String,
      password: String,
      division: String,
      lookingForMembers: Boolean,
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
    team.updatedAt = now;
    team.name = team.name.trim();

    // Add initial fields for new teams
    if (isNewTeam) {
      team = _.extend(team, {
        owner: user._id,
        createdAt: now,
        members: [user._id],
        destination: null,
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
    const team = Teams.findOne(user.teamId);
    if (user._id !== team.owner) {
      throw new Meteor.Error(400, 'You must be the owner of your team to delete it!');
    }

    Meteor.users.update({ teamId: user.teamId }, { $set: { teamId: null } }, { multi: true });
    Invites.remove({ teamId: user.teamId });
    Teams.remove({ _id: team._id });
    return true;
  },

  'team.begin'() {
    requireUser();
    const user = Meteor.user();
    if (!user.teamId) {
      throw new Meteor.Error(400, 'You must be on a team to leave your team!');
    }
    if (!Meteor.isServer) return true;

    return Teams.update(user.teamId, { $set: { hasBegun: true } });
  },

  'team.puzzle.answer'(puzzleId, answer) {
    check(puzzleId, String);
    check(answer, String);
    requireUser();
    const user = Meteor.user();
    if (!user.teamId) throw new Meteor.Error(400, 'You must be on a team to leave your team!');

    if (!Meteor.isServer) return true;

    const masterPuzzle = Puzzles.findOne(puzzleId);
    if (!masterPuzzle) throw new Meteor.Error(400, `Oops, no puzzle was found with id ${puzzleId}`);

    const team = Teams.findOne(user.teamId);
    if (!team) throw new Meteor.Error(400, `Oops, no team found with id ${user.teamId}`);

    const i = findIndex(team.puzzles, (p) => p.puzzleId === puzzleId);
    const cleanAnswer = answer.trim().toLowerCase();

    // Is this answer correct?
    if (cleanAnswer === masterPuzzle.answer.trim().toLowerCase()) {
      // Yes - Score Puzzle.
      const endTime = new Date();
      const score = scorePuzzle(team.puzzles[i].start, endTime, team.puzzles[i].hintsTaken, team.puzzles[i].bonusTime);

      Teams.update(user.teamId, {
        $set: {
          currentPuzzle: null,
          [`puzzles.${i}.end`]: endTime,
          [`puzzles.${i}.score`]: score,
          [`puzzles.${i}.answer`]: cleanAnswer,
          [`puzzles.${i}.timedOut`]: false,
        },
        $inc: {
          finalScore: score,
        },
      });
      return true;
    } else {
      Teams.update(user.teamId, {
        $inc: {
          [`puzzles.${i}.tries`]: 1,
        },
      });
      return { message: 'Nope, keep trying!' };
    }
  },

  'team.puzzle.takeHint'(puzzleId, hintIndex) {
    check(puzzleId, String);
    check(hintIndex, Number);
    requireUser();
    const user = Meteor.user();
    if (!user.teamId) throw new Meteor.Error(400, 'You must be on a team to leave your team!');

    if (!Meteor.isServer) return true;

    const team = Teams.findOne(user.teamId);
    if (!team) throw new Meteor.Error(400, `Oops, no team found with id ${user.teamId}`);

    const puzzleIndex = findIndex(team.puzzles, (p) => p.puzzleId === puzzleId);

    return Teams.update(user.teamId, {
      $set: {
        [`puzzles.${puzzleIndex}.hints.${hintIndex}.taken`]: true,
      },
      $inc: {
        [`puzzles.${puzzleIndex}.hintsTaken`]: 1,
      },
    });
  },

  'volunteer.team.startPuzzle'(teamId, puzzleId) {
    check(teamId, String);
    check(puzzleId, String);
    requireVolunteer();
    if (!Meteor.isServer) return true;

    const team = Teams.findOne(teamId);
    if (!team) throw new Meteor.Error(400, `Oops, no team found with id ${teamId}`);
    const i = findIndex(team.puzzles, (p) => p.puzzleId === puzzleId);

    return Teams.update(teamId, {
      $set: {
        [`puzzles.${i}.start`]: new Date(),
        currentPuzzle: puzzleId,
      },
    });
  },

  'volunteer.team.resetPuzzle'(teamId, puzzleId) {
    check(teamId, String);
    check(puzzleId, String);
    requireVolunteer();
    if (!Meteor.isServer) return true;

    const team = Teams.findOne(teamId);
    if (!team) throw new Meteor.Error(400, `Oops, no team found with id ${teamId}`);
    const i = findIndex(team.puzzles, (p) => p.puzzleId === puzzleId);

    return Teams.update(teamId, {
      $set: {
        [`puzzles.${i}.start`]: null,
        currentPuzzle: null,
      }
    });
  },

});
