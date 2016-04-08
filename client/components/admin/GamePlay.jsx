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
        Meteor.call('toggleRegistration', (err, result) => {
            if (err) {
                console.log(err);
                alert(err.reason);
            }
        });
    },

    toggleGameplay() {
        Meteor.call('toggleGameplay', (err, result) => {
            if (err) {
                console.log(err);
                alert(err.reason);
            }
        });
    },

    render() {
        if (this.data.gamestate) {
            return (
            <div className="ui segment">
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