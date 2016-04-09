import React from 'react';
import { Meteor } from 'meteor/meteor';
import QR from 'qrcode.react';

Game = React.createClass({

    getInitialState() {
        return {
            encode: 'Hello QR Codes!',
            size: 256
        };
    },

    mixins:[ReactMeteorData],
    getMeteorData() {
        let data ={};

        let gamestateHandle = Meteor.subscribe('gamestate');
        let gamestateLoading = !gamestateHandle.ready();
        
        if (!gamestateLoading) {
            data.gamestate = GameState.findOne({});
        }

        let teamHandle = Meteor.subscribe('myTeam');
        let teamLoading = !teamHandle.ready();

        if (!teamLoading) {
            data.team = Teams.findOne({});
        }

        let puzzleAttemptsHandle = Meteor.subscribe('team.puzzleAttempts');
        let puzzleAttemptsLoading = ! puzzleAttemptsHandle.ready();

        if (!puzzleAttemptsLoading) {
            data.puzzleAttempts = PuzzleAttempts.find({}).fetch();
        }
        
        return data;
    },

    componentDidMount() {
    },

    renderHeader() {
        if(this.data.team) {
            return (
            <div className="qr">
                <h2 className="ui center aligned blue header">{this.data.team.name} QR Code</h2>
                <QR value={this.data.team._id} size={parseInt(this.state.size)} />
            </div>
            );
        }
        else {
            return null;
        }
    },

    // Render the current destination for this team.
    // This will be initially assinged evenly to one of the available puzzles
    // This comp will handle the message about game state. 
    renderDestination() {

        // Check that we have GameState
        if (!this.data.gamestate) {
            return null;
        }
        // Gameplay is Off
        else if (!this.data.gamestate.gameplay) {
            return (
            <div className="ui large warning message">
                The game has not started yet!
            </div>
            );
        }
        // Gameplay is On - do we have our team?
        else if (this.data.team) {
            return (
            <div className="ui large info message">
                <h3>Current Destination</h3>
                {this.data.team.destination}
            </div>
            );
        }
    },

    renderPuzzle() {
        if (this.data.puzzleAttempts && this.data.puzzleAttempts[0]) {
            return <div className="ui warning large message">{this.data.puzzleAttempts[0].startTime.toString()}</div>;
        }
    },

    render() {
        return (
            <div className="custom-bg red-square">
                <br/>
                <div className="ui raised segment transparent-bg">

                    {this.renderHeader()}

                    <br/>

                    {this.renderDestination()}

                    <br/>

                    {this.renderPuzzle()}

                </div>
                
            </div>
        );
    }
});

