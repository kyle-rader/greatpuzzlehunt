// Feed Component

Team = React.createClass({
    
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    render() {
        console.log('user:', this.data.user);
        console.log('team:', this.data.user.teamId);
        
        if (this.data.user && this.data.user.teamId) {
            return <MyTeam user={this.data.user}/>;
        }
        else {
            return <NoTeam user={this.data.user}/>
        }
    }
});