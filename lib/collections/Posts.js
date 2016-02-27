// Defining our Posts collection

Posts = new Mongo.Collection('posts');

Meteor.methods({
    postInsert(postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            text: String
        });

        let user = Meteor.user();
        let post = _.extend(postAttributes, {
            userId: user._id,
            username: user.username,
            createdAt: new Date(),
            likes: 0
        });

        let postId = Posts.insert(post);

        return {
            _id: postId
        };
    }
});

