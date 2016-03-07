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
    }
});
