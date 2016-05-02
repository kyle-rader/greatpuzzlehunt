import React from 'react';
import { Meteor } from 'meteor/meteor';

TeamLeaderRow = React.createClass({

    mixins:[ReactMeteorData],
    getMeteorData() {
        let data = {};

        let attemptsHandle = Meteor.subscribe('attemptsLeaderboard', this.props.team._id);
        let attemptsLoading = !attemptsHandle.ready();

        if (!attemptsLoading) {
            data.attempts = PuzzleAttempts.find({teamId: this.props.team._id}, {sort: {puzzleId: 1}}).fetch();

            console.log(`Loaded ${data.attempts.length} attempts`);
        }
        return  data;
    },

    getPuzzleFields() {
        if (!this.data.attempts) {
            return <td colSpan="5"></td>;
        }

        return this.data.attempts.map((attempt) => {

            let hintCount = null;
            if (attempt.puzzleId !== 'ri4BZ8enkd5x8NgP5') {
                hintCount = (
                    <strong>Hints Used: {attempt.hintCount}</strong>
                );
            }

            return (
            <td key={attempt._id}>
                <strong>Start:</strong><br/>
                {attempt.startTime.toLocaleTimeString()} <br/>

                <strong>End:</strong> <br/>
                {attempt.finishTime.toLocaleTimeString()} <br/>

                {hintCount}
            </td>
            );
        });
    },

    render() {

        let hours = Math.floor(this.props.team.totalScore / 3600);
        let minutes = Math.floor((this.props.team.totalScore - (hours * 3600)) / 60);
        let seconds = (~~this.props.team.totalScore) % 60;

        return (
        <tr>
            <td>{this.props.team.name}</td>
            <td>{hours}:{minutes}:{seconds}</td>
            {this.getPuzzleFields()}
        </tr>
        );
    }
});