Meteor.startup(() => {
    if (Meteor.users.find().count() === 0) {
      console.log("Fresh Install Performing Migration...");
      users = JSON.parse(Assets.getText("migration/users.json"));
      teams = JSON.parse(Assets.getText("migration/teams.json"));
      _.each(users.data, (elm)=>{
        var userObject = {
          email: elm.email,
          firstname: elm.firstName,
          lastname: elm.lastName,
          displayname: `${elm.firstName} ${elm.lastName}`,
          major: elm.major,
          phone: elm.phone,
          created: new Date(),
          updated: new Date(),
          teamId: null
        };

        let uid = Accounts.createUser(userObject);
        Accounts.sendEnrollmentEmail(uid);
      });

      _.each(teams.data, (elm)=>{
        let members = _.map(elm.memberIds, (e)=>{
          return Accounts.users.findOne({"emails.address":e})._id;
        });

        let name = elm.teamName;
        let pass = Math.random().toString(36).slice(2);
        let date = new Date();

        let teamId = Teams.insert({
          name: name,
          pass: pass,
          members: members,
          owner: members[0],
          updated: date,
          created: date
        });
        if (Meteor.isServer) {
          _.each(members, (elm)=>{
            Meteor.users.update(elm, {$set: {'profile.teamId': teamId}});
          });

        }
      });


      console.log("Migration Done.");
    }
});
