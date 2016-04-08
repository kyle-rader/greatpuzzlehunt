// Puzzles and Images publications

Images.deny({
 insert: function(){
 return false;
 },
 update: function(){
 return false;
 },
 remove: function(){
 return false;
 },
 download: function(){
 return false;
 }
 });

Images.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    },
    download: function(userId, fileObj) {
        return true;
    }
});

Meteor.publish('puzzles.all', function() {
    let user = Meteor.users.findOne({_id: this.userId});
    if (!user) return [];

    let projection;
    if (user.roles.indexOf('admin') < 0) {
        // Normal user getting puzzle list
        projection = {name: 1};
    } else {
        // Admin, get all
        projection = {};
    }

    return PuzzleCollection.find({}, projection);
});
