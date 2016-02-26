// Define our main App component

App = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData() {
        return {
            hasUser: !!Meteor.user(),
            isPublic(route) {
                let publicRoutes = ['login', 'register', 'about'];

                return publicRoutes.indexOf(route) > -1;
            },
            canView() {
                return this.isPublic(FlowRouter.current().route.name) || !!Meteor.user();
            }
        };
    },

    getView() {
        return this.data.canView() ? this.props.yield : <Login />;
    },

    needsTopMargin() {
        let current = FlowRouter.current().route.name;
        let publicRoutes = ['login', 'register', 'about'];
        let index = publicRoutes.indexOf(current);
        
        if (index > -1) return false;

        return !!Meteor.user();
    },

    render() {
        let topMargin = {
            marginTop: (this.needsTopMargin() ? '73px' : '')
        };

        return (
        <div className="app-root" style={topMargin}>
            <AppHeader hasUser={this.data.hasUser} />
            {this.getView()}
        </div>);
    }

});