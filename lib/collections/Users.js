// User collection is already define by accounts-base package

// User collections methods:

Meteor.methods({
    userUpdate(user) {
        check(Meteor.userId(), String);
        check(user, {
            favoriteQuote: String
        });

        // Actually update the user
        
    }
});