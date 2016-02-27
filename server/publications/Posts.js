Meteor.publish('posts', () => {
    return Posts.find();
});
