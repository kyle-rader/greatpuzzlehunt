import React from 'react';
import { Meteor } from 'meteor/meteor';

export default TeamList = React.createClass({

    mixins:[ReactMeteorData],
    getMeteorData() {
        let data = {};

        let teamsHandle = Meteor.subscribe('teams.all');
        let loading = !teamsHandle.ready();

        if (!loading) {
            data.teams = Teams.find({}, {sort: {"profile.firstname": 1, "profile.lastname": 1}}).fetch();
        }

        return data;
    },

    getTeamList() {
        return this.data.teams.map((team) => {
            return (
                <TeamListRow key={team._id} team={team} />
            );
        });
    },

    search(event) {
        let search = event.target.value;

        $(`div.ui.team-listing:contains(${search})`).each(function() {
            $(this).show();
        });

        $(`div.ui.team-listing:not(:contains(${search}))`).each(function() {
            console.log('Hide');
            $(this).hide();
        });
    },

    componentDidMount() {
    },

    render() {

        if (this.data.teams) {
            return (
            <div className="ui basic segment">
                <div className="ui grid">
                    <div className="three wide column">
                        <div className="ui large blue fluid label">
                            <i className="users icon"></i>
                            &nbsp;
                            {this.data.teams.length} Teams
                        </div>
                    </div>
                    <div className="ten wide column">
                        <div className="ui fluid right icon input">
                            <input type="text" placeholder="Search" onChange={this.search}/>
                            <i className="search icon"></i>
                        </div>
                    </div>
                    <div className="three wide column">
                        
                    </div>
                </div>

                { this.getTeamList() }

            </div>
            );
        } else {
            return (
            <div className="ui segment">
                <div className="ui active dimmer">
                    <div className="ui big text loader">Loading</div>
                </div>
                <br/> <br/>
                <br/> <br/>
                <br/> <br/>
            </div>
            );
        }
    }
});
