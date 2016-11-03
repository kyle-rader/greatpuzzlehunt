import React from 'react';
import { Meteor } from 'meteor/meteor';

// Public Team List

TeamList = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        let data = {};
        let handle = Meteor.subscribe('teams');

        if (handle.ready()) {
            data.teams = Teams.find().fetch();
        }
        return data;
    },

    getTeams() {
        if (this.data.teams) {
            return this.data.teams.map((team) => {
                return <TeamListing key={team._id} showJoin={false} team={team} />;
            });
        }
    },

    render() {
        return (
        <div className="info custom-bg red-square">
            <br/>
            <div className="ui container raised segment transparent-bg">
                <PuzzlePageTitle title="2016 Teams"/>

                <div className="ui four doubling cards">
                    {this.getTeams()}
                </div>
            </div>
        </div>
        );
    }
});
