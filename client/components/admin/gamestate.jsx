import React from 'react';
import { Meteor } from 'meteor/meteor';

export default GamePlay = React.createClass({

    getInitialState() {
        return {

        };
    },

    mixins:[ReactMeteorData],
    getMeteorData() {
        let data = {};

        let gameStatehandle = Meteor.subscribe('gamestate');
        let loading = !gameStatehandle.ready();

        if (!loading) {
            data.gamestate = GameState.findOne({});
        }

        return data;
    },

    toggleRegistration() {

        if (!confirm(`Are you sure you want ${this.data.gamestate.registration ? 'DISABLE' : 'ENABLE'} registration?`))
            return;

        Meteor.call('toggleRegistration', (err, result) => {
            if (err) {
                console.log(err);
                alert(err.reason);
            }
        });
    },

    toggleGameplay() {

        if (!confirm(`Are you sure you want ${this.data.gamestate.gameplay ? 'DISABLE' : 'ENABLE'} gameplay?`))
            return;

        Meteor.call('toggleGameplay', (err, result) => {
            if (err) {
                console.log(err);
                alert(err.reason);
            }
        });
    },

    assignTeamsLocations() {
        if (!confirm('Are you sure you want to generate start positions?'))
            return;

        Meteor.call('teamsAdminAssignDestinations', (err, result) => {
            if (err) {
                alert(err);
            } else if (result) {
                alert('Assinged');
            }
        });
    },

    render() {
        if (this.data.gamestate) {
            return (
            <div className="ui segment">
                <h2 className="ui dividing header">Game State Controls</h2>
                <div className="ui form">
                    <div className="field">
                        <div className={`ui button ${this.data.gamestate.registration ? 'green' : 'red'}`} onClick={this.toggleRegistration}>
                            {`Registration is ${this.data.gamestate.registration ? 'On' : 'Off'}`}
                        </div>
                    </div>
                    <div className="field">
                        <div className={`ui button ${this.data.gamestate.gameplay ? 'green' : 'red'}`} onClick={this.toggleGameplay}>
                            {`Gameplay is ${this.data.gamestate.gameplay ? 'On' : 'Off'}`}
                        </div>
                    </div>
                </div>

                <h2 className="ui dividing header">Setup Controls</h2>
                <div className="ui form">
                    <div className="field">
                        <div className="ui blue button" onClick={this.assignTeamsLocations}>
                            Assign Teams Start Locations
                        </div>
                    </div>
                </div>

            </div>
            );
        } else {
            return <Loading />;
        }
    }
});
