AuthedNav = React.createClass({
    logout(event) {
        event.preventDefault();
        return Meteor.logout( () => FlowRouter.go('/'));
    },

    componentDidMount() {
        $(this.refs.profileDropdown).dropdown();
    },

    render() {
        return (
        <div className="top-menu ui fixed labeled icon menu">
            <a className="item" href="/">
                <i className="home icon"></i>
                Home
            </a>

            <div className="right menu">
                <div className="ui dropdown item" ref="profileDropdown">
                    <i className="user icon"></i>
                    {this.props.user.username}
                    <div className="menu">
                        <a className="item">
                            <i className="user icon"></i> Profile
                        </a>
                        <a className="item">
                            <i className="settings icon"></i> Settings
                        </a>
                        <div className="divider"></div>
                        <a className="item" onClick={this.logout}>
                            <i className="sign out icon"></i> Logout
                        </a>
                    </div>
                </div>
            </div>
        </div>);
    }
});