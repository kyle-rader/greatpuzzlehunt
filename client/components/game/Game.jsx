import React from 'react';
import { Meteor } from 'meteor/meteor';
import QR from 'qrcode.react';

Game = React.createClass({

    getInitialState() {
        return {
            size: 262,
            good: '',
            bad: ''
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
            data.puzzleAttempts = PuzzleAttempts.find({finalScore: { $ne: null }}).fetch();
            data.currentAttempt = PuzzleAttempts.findOne({finishTime: null});
        }
        return data;
    },

    directions() {
        return (
        <div className="ui large info message">
            <h3>Start Location</h3>
            {this.data.team.destination}
        </div>
        );
    },

    renderCompletePuzzles() {
        return null;
    },

    submitAnswer() {
        Meteor.call('submitAnswer', {
            teamId: this.data.team._id,
            puzzleId: this.data.currentAttempt.puzzleId,
            answer: this.refs.codeWord.value.replace(/\s+/g,'').toLowerCase()
        }, (err, result) => {
            if (err)
                console.log(err);
            if(result && result.message) {
                this.setState({
                    size: 262,
                    message: result.message
                });
            }
        });
    },

    renderContent() {
        if (!this.data.gamestate) {
            return null;
        }

        if (!this.data.gamestate.gameplay) {
            return (
            <div className="ui large warning message">
                Game is not in session!
            </div>);
        }

        if (this.data.currentAttempt) {

            let message = this.state.mesage ? 
                <div className="ui info message">{this.state.message}</div> : null;
            return (
            <div className="ui form">
                <div className="field">
                    <label>Code Word(s)</label>
                    <input id="codeWord" ref="codeWord" type="text" />
                </div>

                <div className="ui blue fluid button" onClick={this.submitAnswer}>Submit</div>
                {message}
            </div>);
        }

        // We have our team and we are not solving anything.
        if (this.data.team) {
            return (
            <div className="qr">
                <h2 className="ui center aligned blue header">{this.data.team.name} QR Code</h2>
                <QR value={this.data.team._id} size={parseInt(this.state.size)} />
                {this.directions()}
            </div>
            );
        }

    },

    render() {
        return (
        <div className="custom-bg red-square">
            <br/>
            <div className="ui raised segment transparent-bg">
                { this.renderContent() }
            </div>
        </div>
        );
    }
});

