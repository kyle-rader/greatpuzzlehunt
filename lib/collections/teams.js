import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { times,
  random,
  pick,
  find,
  findIndex,
  sample,
  cloneDeep,
  omit,
} from 'lodash';

import { requireUser, requireVolunteer, NonEmptyString, requirePattern, notAfterCheckIn } from '../imports/method-helpers.js';
import { getPuzzleScore } from '../imports/puzzle-helpers';

Teams = new Mongo.Collection('teams');

// Ensure index
Meteor.startup(function () {
  if (Meteor.isServer) {
    Teams._ensureIndex({ "name": 1});
  }
});

function teamPuzzleCopy(puzzle) {
  const copy = cloneDeep(omit(puzzle, ['_id']));
  copy.answer = null;
  copy.puzzleId = puzzle._id;
  // TODO: change to:
  // copy.hints.map(()=>({taken: false, takenAt: null}))
  // to only save 'taken' (t/f) and when hint was taken, if applicable
  copy.hints.forEach((hint, i) => {
    hint.taken = false;
  });
  copy.start = null; // JS Date Object
  copy.end = null; // JS Date Object
  copy.score = null; // Score will be stored in seconds.
  return copy;
}

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
    check(team, Object);

    const { name, password, division, lookingForMembers } = team;

    requirePattern(name, NonEmptyString, "You must choose a team name!");
    requirePattern(password, NonEmptyString, "You must choose a team password!");
    requirePattern(division, NonEmptyString, "You must choose a division!");
    requirePattern(lookingForMembers, Boolean, "Looking for members must be true or false!");

    const isNewTeam = !team._id;
    const user = Meteor.user();
    if (!isNewTeam) {
      notAfterCheckIn();
    }

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

    // Everything else should only run on the server.
    if (!Meteor.isServer) return true;
    notAfterCheckIn();

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
    else if (team.checkinConfirmed) {
      throw new Meteor.Error(400, 'Sorry this team is already checked in and ready to play!');
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

    // Everything else should only run on the server.
    if (!Meteor.isServer) return true;
    notAfterCheckIn();

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
    // Everything else should only run on the server.
    if (!Meteor.isServer) return true;
    notAfterCheckIn();

    const team = Teams.findOne(user.teamId);
    if (user._id !== team.owner) {
      throw new Meteor.Error(400, 'You must be the owner of your team to delete it!');
    }

    Meteor.users.update({ teamId: user.teamId }, { $set: { teamId: null } }, { multi: true });
    Invites.remove({ teamId: user.teamId });
    Teams.remove({ _id: team._id });
    return true;
  },

  'team.checkin.start'() {
    requireUser();
    const user = Meteor.user();
    if (!user.teamId) {
      throw new Meteor.Error(400, 'You must be on a team to start team check in!');
    }
    // Everything else should only run on the server.
    if (!Meteor.isServer) return true;

    // Set user's team userCheckin to true:
    Teams.update({ _id: user.teamId }, {
      $set: { userCheckin: true, checkedInBy: user._id },
    });
  },

  'team.checkin.user'(userId) {
    check(userId, String)
    requireUser();
    const currentUser = Meteor.user();
    const userToToggle = Meteor.users.findOne(userId);

    // Validate users
    if (!currentUser.teamId) { throw new Meteor.Error(400, "You must be on a team to check people in!"); }
    if (!userToToggle) { throw new Meteor.Error(400, `There is no user with id ${userId}!`); }
    if (currentUser.teamId !== userToToggle.teamId) { throw new Meteor.Error(400, `You and user "${userId}" must be on the same team!`); }
    if (!userToToggle.paid) { throw new Meteor.Error(400, `Oops, ${userToToggle.firstname} has not paid yet! Only Paid members can participate!`); }

    // Toggle user's checkIn status.
    return Meteor.users.update({ _id: userId }, {
      $set: {
        checkedIn: !userToToggle.checkedIn,
      }
    });
  },

  'team.checkin.confirm'(teamId) {
    check(teamId, String);
    requireVolunteer();

    const team = Teams.findOne(teamId);
    if (!team) { throw new Meteor.Error(400, `Error! No team found for id ${teamId}`); }
    if (!team.userCheckin) { throw new Meteor.Error(400, `Error! ${team.name} hasn't checked in yet!`); }

    return Teams.update({ _id: teamId }, { $set: { checkinConfirmed: true } });
  },

  'team.begin'() {
    requireUser();
    const user = Meteor.user();
    if (!user.teamId) {
      throw new Meteor.Error(400, 'You must be on a team to begin the Game!');
    }

    if (!Meteor.isServer) return true;

    const gamestate = Gamestate.findOne();
    if (!gamestate.gameplay) { throw new Meteor.Error(400, "You cannot start until Gameplay has begun!"); }

    const puzzles = Puzzles.find().fetch();
    if (puzzles.length === 0) throw new Meteor.Error(400, 'There are no Puzzles!');

    const team = Teams.findOne(user.teamId);
    if (team.hasBegun) { throw new Meteor.Error(400, "You're team has already begun the game!"); }

    const puzzleCopies = puzzles.map(teamPuzzleCopy);
    const startLocation = sample(puzzles.filter(p => p.stage === 0)).name;
    return Teams.update(user.teamId, {
      $set: {
        hasBegun: true,
        beganAt: new Date(),
        startLocation: startLocation,
        puzzles: puzzleCopies,
        currentPuzzle: null,
      },
    });
  },

  'team.puzzle.giveUp'(puzzleId, teamId){
    check(puzzleId, String);
    check(teamId, String);
    requireUser();
    const user = Meteor.user();
    if (!user.teamId) throw new Meteor.Error(400, 'You must be on a team to give up!');

    const team = Teams.findOne(teamId);
    if(!team) throw new Meteor.Error(400, `No team found with id ${teamId}`);
    if(!team.division === "noncompetitive"){
      throw new Meteor.Error(400, "Only non-competitive teams can give up");
    }
    if(!team.currentPuzzle) throw new Meteor.Error(400, "No active puzzle for this team");

    console.log("You gave up on this puzzle");

    if (!Meteor.isServer) return true;

    const masterPuzzle = Puzzles.findOne(puzzleId);
    if (!masterPuzzle) throw new Meteor.Error(400, `Oops, no puzzle was found with id ${puzzleId}`);

    const i = findIndex(team.puzzles, (p) => p.puzzleId === puzzleId);

    const endTime = new Date();
    const score = getPuzzleScore(team.puzzles[i], endTime, masterPuzzle, /*isNC=*/true);
    const answer = masterPuzzle.answer.trim().toLowerCase();

    Teams.update(teamId, {
      $set: {
        currentPuzzle: null,
        [`puzzles.${i}.end`]: endTime,
        [`puzzles.${i}.score`]: score,
        [`puzzles.${i}.answer`]: answer,
        [`puzzles.${i}.timedOut`]: false,
        [`puzzles.${i}.gaveUp`]: true,
      },
    });
    Meteor.logger.info(`Team ${teamId} gave up on puzzle ${puzzleId}`);
  },

  'team.puzzle.answer'(puzzleId, answer) {
    check(puzzleId, String);
    check(answer, String);
    requireUser();
    const user = Meteor.user();
    if (!user.teamId) throw new Meteor.Error(400, 'You must be on a team to answer a puzzle!');

    if (!Meteor.isServer) return true;

    const masterPuzzle = Puzzles.findOne(puzzleId);
    if (!masterPuzzle) throw new Meteor.Error(400, `Oops, no puzzle was found with id ${puzzleId}`);

    const team = Teams.findOne(user.teamId);
    if (!team) throw new Meteor.Error(400, `Oops, no team found with id ${user.teamId}`);

    const i = findIndex(team.puzzles, (p) => p.puzzleId === puzzleId);
    const cleanAnswer = answer.trim().toLowerCase();

    const isNonCompetitive = team.division === "noncompetitive";

    // Is this answer correct?
    if (cleanAnswer === masterPuzzle.answer.trim().toLowerCase()) {
      // Yes - Score Puzzle.
      const endTime = new Date();
      const score = getPuzzleScore(team.puzzles[i], endTime, masterPuzzle, isNonCompetitive);

      Teams.update(user.teamId, {
        $set: {
          currentPuzzle: null,
          [`puzzles.${i}.end`]: endTime,
          [`puzzles.${i}.score`]: score,
          [`puzzles.${i}.answer`]: cleanAnswer,
          [`puzzles.${i}.timedOut`]: false,
        },
      });
      return { message: 'Correct!' };
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
    const puzzle = team.puzzles[i];

    // Make sure there are no puzzles to solve with stage lower than this one still.
    const preReqPuzzles = team.puzzles.some((p, ix) => {
      if (ix === i) return false;
      return (!p.score && p.stage < puzzle.stage);
    });
    if (preReqPuzzles) throw new Meteor.Error(400, 'This team isn\'t ready for this puzzle yet!');

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
