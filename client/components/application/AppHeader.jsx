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
        if (this.refs.profileDropdown)
            $(this.refs.profileDropdown).dropdown();

        $(this.refs.menuDropdown).dropdown();
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
                        <a className="item" href="/profile">
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
        <div className="ui fixed large menu">
            <div className="ui dropdown item" ref="menuDropdown">
                <i className="red bars icon"></i> Menu
                <div className="menu">
                    <a className="item" href="/">
                        <i className="home icon"></i>&nbsp; Home
                    </a>
                    <a className="item" href="/info">
                        <i className="info circle icon"></i>&nbsp; General Info
                    </a>
                    <a className="item" href="/puzzles">
                        <i className="puzzle icon"></i>&nbsp; Puzzles
                    </a>
                    <a className="item" href="/contact">
                        <i className="mail icon"></i>&nbsp; Contact
                    </a>
                    <a className="item" href="/teamlist">
                        <i className="users icon"></i>&nbsp; Team List
                    </a>
                </div>
            </div>

            {this.getRightMenu()}
        </div>);
    }
});
