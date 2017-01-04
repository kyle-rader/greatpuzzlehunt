import React from 'react';
import { Meteor } from 'meteor/meteor';

export default TeamScore = React.createClass({

    propTypes: {
        team: React.PropTypes.object,
    },

    getInitialState() {
        return {
            editMode: false
        };
    },

    mixins:[ReactMeteorData],
    getMeteorData() {
        let data = {};
        let attemptsHandle = Meteor.subscribe('allPuzzleAttempts');

        if (attemptsHandle.ready()) {
            data.attempts = PuzzleAttempts.find({teamId: this.props.team._id}).fetch();
        }

        return data;
    },

    getTimes() {
        if (!this.data.attempts) {
            return <div className="ui message">Loading</div>;
        }

        let total = 0;
        for(let i = 0; i < this.data.attempts.length; i++) {
            total += (((this.data.attempts[i].finalScore + (this.data.attempts[i].puzzleId.toString() === 'ri4BZ8enkd5x8NgP5' ? 900000 : 0)) / 1000));
        }

        return this.data.attempts.map((attempt) => {


            if (!attempt.finishTime) {
                return <div className="ui small warning message" key={attempt._id}>Still solving</div>;
            }
            return (
            <div className="ui info message" key={attempt._id}>
                <strong>Team Sum:</strong> &nbsp; {total.toFixed(2)}
                <div className="ui items">
                    <div className="item">
                        Start:&nbsp; {attempt.startTime.toTimeString()}
                    </div>
                    <div className="item">
                        End:&nbsp; {attempt.finishTime.toTimeString()}
                    </div>
                    <div className="item">
                        <strong>Time: </strong>&nbsp; {(((attempt.finishTime - attempt.startTime) / 1000)).toFixed(2) } &nbsp; sec
                    </div>
                    <div className="item">
                        <strong>Final: </strong>&nbsp; { (((attempt.finalScore + (attempt.puzzleId.toString() === 'ri4BZ8enkd5x8NgP5' ? 900000 : 0)) / 1000)).toFixed(2) } &nbsp; sec
                    </div>
                </div>
            </div>
            );
        });
    },

    render() {

        return (
        <div className="ui segment">
            <h2 className="ui header">{this.props.team.name}</h2>
                {this.getTimes()} 
        </div>
        );
    }
});

