Meteor.publish('myTeam', function() {
    if (this.userId) {
        return Teams.find({members: this.userId});
    }
});
