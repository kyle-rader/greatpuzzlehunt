// Define our main App component

App = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            loggingIn: Meteor.loggingIn(),
            hasUser: !!Meteor.user(),
            isPublic(route) {
                let publicRoutes = ['login', 'register'];

                return publicRoutes.indexOf(route) > -1;
            },
            canView() {
                return this.isPublic(FlowRouter.current().route.name) || !!Meteor.user();
            }
        };
    },

    loading() {
        return <div className="loading"></div>;
    },

    getView() {
        return this.data.canView() ? this.props.yield : <Login />;
    },

    render() {
        return (
        <div className="app-root">
            <AppHeader hasUser={this.data.hasUser} />
            {this.data.loggingIn ? this.loading() : this.getView()}
        </div>);
    }

});