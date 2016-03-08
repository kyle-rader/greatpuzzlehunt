// My Team comp

MyTeam = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        let data = {};
        let membersHandle = Meteor.subscribe('myTeamMembers');
        let teamHandle = Meteor.subscribe('myTeam');

        if (teamHandle.ready()) {
            data.myTeam = Teams.findOne();
        }
        if (membersHandle.ready()) {
            data.members = Meteor.users.find().fetch();
        }
        return data;
    },

    getInitialState() {
        return {
            err: null
        };
    },

    componentDidMount() {
        // Setup create Team form
        let form = $(this.refs.teamForm);

        form.form({
            fields: {
                name: {
                    identifier: 'name',
                    rules: [{
                        type: 'empty',
                        prompt: 'You must enter a team name'
                    }]
                },
                password: {
                    identifier: 'password',
                    rules: [{
                        type: 'empty',
                        prompt: 'You must enter a team password'
                    },
                    {
                        type: 'minLength[6]',
                        prompt: 'Team password must be at least 6 characters long'
                    }]
                }
            },
            inline: true,
            onSuccess: (event, fields) => {
                event.preventDefault();

                Meteor.call('teamUpdate', fields, (err, result) => {
                    if (err) {
                        this.setState({err: err});
                    }
                });
            }
        });
    },

    teamOwner() {
        return this.data.myTeam && (this.data.myTeam.owner.toString() === this.props.user._id.toString());
    },

    getError() {
        if (this.state.err) {
            return <div className="ui error message">{this.state.err.reason}</div>;
        }
    },

    getMembers() {
        // If no Members yet - loading
        if (!this.data.members) {
            return (
            <div className="ui segment">
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
                <p></p>
            </div>
            );
        }

        let members = this.data.members.map((member) => {
            return <MemberListing key={member._id} member={member}/>;
        });

        return (
        <div className="ui four doubling stackable cards">
            {members}
        </div>
        );
    },

    getTeamForm() {
        // If No data yet - render loading
        if (!this.data.myTeam) {
            return (
            <div className="ui segment">
                <div className="ui active inverted dimmer">
                    <div className="ui text loader">Loading</div>
                </div>
                <p></p>
            </div>
            );
        }

        let disabled = !this.teamOwner();
        let submit = !disabled ? <input type="submit" className="ui blue button" value="Save"/> : null;

        return (
        <div className="ui huge form">
            <h2 className="ui center aligned header">
                <div className="content">{this.data.myTeam.name}</div>
            </h2>
            <input type="hidden" name="teamId" value={this.data.myTeam._id}/>
            <div className="field">
                <label>Team Name</label>
                <input name="name" disabled={disabled} type="text" defaultValue={this.data.myTeam.name}/>
            </div>
            <div className="field">
                <label>Team Password</label>
                <input name="password" disabled={disabled} type="text" defaultValue={this.data.myTeam.password}/>
            </div>
            {submit}
        </div>
        );
    },

    render() {
        return (
        <div className="my-team custom-bg red-square">
            <br/>
            <div className="ui container raised segment transparent-bg">
                <PuzzlePageTitle title="Team"/>

                {this.getTeamForm()}

                {this.getMembers()}

            </div>
            <br/>
        </div>
        );
    }
});
