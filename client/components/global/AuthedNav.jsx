AuthedNav = React.createClass({
    logout(event) {
        event.preventDefault();
        return Meteor.logout( () => FlowRouter.go('/login'));
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
                        <a className="item">Profile</a>
                        <a className="item">Settings</a>
                    </div>
                </div>
            </div>
        </div>);
    }
});