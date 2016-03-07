Meteor.startup(() => {
    if (Meteor.users.find().count() === 0) {
        
        // 1. Load users dump w/ getText.
        // - JSON.parse
        // .each for all of them and create a new user object & send new enrollment email.

        // 2. Load team dump file.
        // - 
    }
});