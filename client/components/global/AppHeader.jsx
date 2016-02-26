AppHeader = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    render() {
        return this.props.hasUser ? <AuthedNav user={this.data.user} /> : <PublicNav />;
    }
});
