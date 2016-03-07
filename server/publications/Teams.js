Meteor.publish('teams', function() {
    let fields = {
        name: 1,
        members: 1
    };

    return Teams.find({}, {fields: fields});
});

Meteor.publish('myTeam', function() {
    if (this.userId) {
        return Teams.find({members: this.userId});
    }
});
