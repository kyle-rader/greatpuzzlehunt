// No Team comp

NoTeam = React.createClass({

    mixins: [ReactMeteorData],
    getMeteorData() {
        let data = {};
        let handle = Meteor.subscribe('teams');
        
        if (handle.ready()) {
            data.teams = Teams.find().fetch();
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
        let form = $(this.refs.createTeamForm);

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

                Meteor.call('teamCreate', fields, (err, result) => {
                    if (err) {
                        this.setState({err: err});
                    }
                });
            }
        });
    },

    getError() {
        if (this.state.err) {
            return (
                <div className="ui error message">
                    {this.state.err.reason}
                </div>
            );
        }
    },

    // CREATE TEAM
    getCreateTeamForm() {
        return (
        <form className="ui form" ref="createTeamForm">
            <h2 className="ui center aligned header">
                <div className="content">
                    Create a new Team
                </div>
            </h2>
            <div className="field">
                <label>Team Name</label>
                <input className="ui input" name="name" placeholder="Cool Team Name"/>
            </div>
            <div className="field">
                <label>Team Password <br/><span style={{fontWeight: 500}}> (Your friends can use this to join your team after they register)</span></label>
                <input className="ui input" name="password" placeholder="Secret Password"/>
            </div>
            <input type="submit" className="ui blue button" value="Create Team"/>
        </form>
        );
    },

    getTeamList() {
        if(this.data.teams) {
            return this.data.teams.map((team) => {
                return <TeamListing key={team._id} showJoin={true} team={team} />;
            });
        }
    },

    // JOIN TEAM
    getJoinTeamForm() {
        return (
        <div>
            <h2 className="ui center aligned header">
                <div className="content">
                    Join a Team
                </div>
            </h2>
            <div className="ui two doubling stackable cards">
                {this.getTeamList()}
            </div>
        </div>
        );
    },

    render() {
        return (
        <div className="team custom-bg red-square">
            <br/>
            <div className="ui container raised segment transparent-bg">
                <PuzzlePageTitle title="Team"/>

                <div className="ui two column stackable grid" style={{position: 'relative'}}>
                    <div className="column">
                        {this.getCreateTeamForm()}
                        {this.getError()}
                    </div>
                    <div className="ui vertical divider">or</div>
                    <div className="column">
                        {this.getJoinTeamForm()}
                    </div>
                </div>
                
            </div>
            <br/>
        </div>
        );
    }
});