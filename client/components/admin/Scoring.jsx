import React from 'react';
import { Meteor } from 'meteor/meteor';

export default Scoring = React.createClass({

    mixins:[ReactMeteorData],
    getMeteorData() {
        let data = {};

        let teamsHandle = Meteor.subscribe('teams.all');
        let loading = !teamsHandle.ready();

        if (!loading) {
            data.teams = Teams.find({}).fetch();
        }

        return data;
    },

    getTeamList() {
        return this.data.teams.map((team) => {
            return (
                <TeamScore key={team._id} team={team} />
            );
        });
    },

    render() {

        if (this.data.teams) {
            return (
            <div className="ui basic segment">
                {this.getTeamList()}
            </div>
            );
        } else {
            return <Loading />;
        }
    }
});
