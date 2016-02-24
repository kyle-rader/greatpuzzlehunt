AppHeader = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            brandLink: !!Meteor.user() ? '/home' : '/login',
            user: Meteor.user()
        };
    },

    render() {
        return this.props.hasUser ? <AuthedNav user={this.data.user} /> : <PublicNav />;
    }
});
