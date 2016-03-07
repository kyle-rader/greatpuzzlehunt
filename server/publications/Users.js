// Allow and Denys

Meteor.users.deny({
    update: () => {
        return true;
    }
});
