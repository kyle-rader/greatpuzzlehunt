// Defining our Posts collection

Teams = new Mongo.Collection('teams');

Meteor.methods({
    teamCreate(team) {

        check(Meteor.userId(), String);
        check(team, {
            name: String,
            password: String,
        });

        let user = Meteor.user();
        let date = new Date();

        team.name = team.name.trim();
        team = _.extend(team, {
            owner: user._id,
            created: date,
            updated: date,
            members: [user._id]
        });

        // Check for existing team name
        let existingTeam = Teams.findOne({name: team.name});
        if (existingTeam) {
            throw new Meteor.Error(400, 'A team with that name already exists!');
            return;
        }

        // Create the team
        let newTeamId = Teams.insert(team, (err) => {
            if (err) {
                throw new Meteor.Error(err.reason);
                return;
            }
        });

        // Update the team owner's teamId.
        // Only execute on the server
        if (Meteor.isServer) {
            Meteor.users.update(user._id, {$set: {'profile.teamId': newTeamId}});
        }

        return {
            _id: newTeamId
        };
    },

    teamUpdate(fields) {
        check(Meteor.userId(), String);
        check(fields, {
            name: String,
            password: String,
            teamId: String
        });

        let user = Meteor.user();
        let team = Teams.findOne({_id: fields.teamId});

        if (!team) {
            throw new Meteor.Error(400, 'No team found');
        }
        else if (team.owner !== user._id) {
            throw new Meteor.Error(400, 'You don\'t own that team');
        }

        // Team is good, and current user owns it.
        // Update team.

        if (Meteor.isServer) {
            Teams.update({_id: team._id}, {$set: {name: fields.name, password: fields.password}});
        }
    },

    teamJoin(fields) {
        check(Meteor.userId(), String);
        check(fields, {
            password: String,
            teamId: String
        });

        let user = Meteor.user();

        let team = Teams.findOne({_id: fields.teamId});
        if (!team) {
            throw new Meteor.Error(400, 'No Team with that Id!');
        }
        else if (Meteor.isServer && fields.password !== team.password) {
            throw new Meteor.Error(400, 'Incorrect password');
        }

        // Got team and password is good:
        // Add user to team.
        if (Meteor.isServer) {
            team.members.push(user._id);
            Teams.update({_id: team._id}, {$set: {members: team.members}});
            Meteor.users.update({_id: user._id}, {$set: {'profile.teamId': team._id}});
        }
    }
});
