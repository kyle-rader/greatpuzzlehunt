// A Team listing card

TeamListing = React.createClass({
    getInitialState() {
        return {
            err: null
        };
    },

    getError() {
        if (this.state.err) {
            return <div className="ui error message">{this.state.err.reason}</div>;
        }
    },

    getJoinForm() {
        if (this.props.showJoin) {
            return (
            <div className="extra content">
                <form className="ui large form" ref="joinForm">
                    <div className="ui fluid action input">
                        <input type="password" placeholder="Team Password" name="password"/>
                        <button className="ui blue button" type="submit">Join</button>
                    </div>
                </form>
                {this.getError()}
            </div>
            );
        }
    },

    render() {
        return (
        <div className="card">
            <div className="content">
                <div className="header">{this.props.team.name}</div>
                <div className="description">
                    <div className="label">{this.props.team.members.length} members</div>
                </div>
                <br/>
                {this.getJoinForm()}
            </div>
        </div>
        );
    }
});