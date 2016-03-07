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

        team = _.extend(team, {
            owner: user._id,
            created: date,
            updated: date,
            members: [user._id]
        });

        // Check for existing team name
        let existingTeam = Teams.findOne({name: team.name});
        if (existingTeam) {
            throw new Mateor.Error('A team with that name already exists!');
        }

        // Create the team
        let newTeamId = Teams.insert(team, (err) => {
            if (err) {
                throw new Meteor.Error(err.reason);
            }
        });

        // Update the team owner's teamId.
        Meteor.users.update(user._id, {$set: {teamId: newTeamId}});

        return {
            _id: newTeamId
        };
    }
});
