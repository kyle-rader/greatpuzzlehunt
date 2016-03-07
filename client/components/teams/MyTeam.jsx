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
            {this.getError()}
        </form>
        );
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
        {/* LOAD TEAMS EACH ON A CARD */}
        </div>
        );
    },

    render() {
        return (
        <div className="team custom-bg red-square">
            <br/>
            <div className="ui container raised segment transparent-bg">
                <PuzzlePageTitle title="Team"/>

                My Team: {this.data.myTeam ? this.data.myTeam.name : '...loading'} <br/>
                Members Length: {this.data.myTeam ? this.data.myTeam.members.length : 'no members'}
                
            </div>
            <br/>
        </div>
        );
    }
});