// Feed Component

Team = React.createClass({
    
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    render() {
        if (this.data.user && this.data.user.profile.teamId) {
            return <MyTeam />;
        }
        else {
            return <NoTeam />
        }
    }
});