AppHeader = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            user: Meteor.user()
        };
    },

    logout(event) {
        event.preventDefault();
        return Meteor.logout( () => FlowRouter.go('/'));
    },

    componentDidMount() {
        $(this.refs.profileDropdown).dropdown();
    },

    getRightMenu() {
        // User is logged in
        if (this.data.user) {
            return (
            <div className="right menu">
                <a className="ui item" href="/team">
                    <i className="blue users icon"></i>
                    Team
                </a>
                <div className="ui dropdown item" ref="profileDropdown">
                    <i className="green user icon"></i>
                    {this.data.user.username}
                    <div className="menu">
                        <a className="item" hrelf="/profile">
                            <i className="setting icon"></i> Profile
                        </a>
                        <a className="item" onClick={this.logout}>
                            <i className="sign out icon"></i> Logout
                        </a>
                    </div>
                </div>
            </div>
            );
        }
        // No User - public menu
        else {
            return (
            <div className="right menu">
                <a className="ui item" href="/register">
                    <i className="blue user add icon"></i>
                    Register
                </a>
                <a className="ui item" href="/login">
                    <i className="green sign in icon"></i>
                    Log In
                </a>
            </div>
            );
        }
    },

    render() {
        return (
        <div className="ui fixed labeled small icon menu">
            <a className="item" href="/">
                <i className="red home icon"></i>
                Home
            </a>
            <a className="ui item" href="/info">
                <i className="purple info icon"></i>
                Info
            </a>

            {this.getRightMenu()}
        </div>);
    }
});
