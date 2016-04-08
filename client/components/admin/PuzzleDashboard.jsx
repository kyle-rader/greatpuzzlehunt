import React from 'react';
import { Meteor } from 'meteor/meteor';

PuzzleDashboard = React.createClass({
    getInitialState() {
        return {
            puzzleToEdit: null
        };
    },

    mixins:[ReactMeteorData],
    getMeteorData() {
        let data = {};

        let puzzlesHandle = Meteor.subscribe('puzzles.all');
        let loading = !puzzlesHandle.ready();

        if (!loading) {
            data.puzzles = PuzzleCollection.find({}).fetch()
        }

        return data;
    },

    createPuzzle(event) {
        Meteor.call('createPuzzle');
    },

    renderPuzzleTable() {

        if (this.data.puzzles) {
            let puzzles = this.data.puzzles.map((puzzle) => {
                return <tr key={puzzle._id}><td>puzzle</td></tr>;
            });

            return (
                <table className="ui compact celled table">
                    <thead>
                        <tr>
                            <th>Puzzle Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {puzzles}
                    </tbody>
                    <tfoot className="full-width">
                        <tr>
                            <th colSpan="2">
                                <div className="ui right floated green button" onClick={this.createPuzzle}>
                                    <i className="plus icon"></i> &nbsp; New Puzzle
                                </div>
                            </th>
                        </tr>
                    </tfoot>
                </table>);
        } else {
            return <div className="ui warning message">There are no puzzles yet!</div>;
        }
    },

    render() {

        let puzzleEdit = this.state.puzzleToEdit ? <PuzzleEditor puzzle={this.state.puzzleToEdit} /> : null;

        return (
            <div className="basic segment">
                <h3 className="ui header">Puzzle Creator</h3>
                {puzzleEdit}
                { this.renderPuzzleTable() }
            </div>
        );
    }

});

export default PuzzleDashboard;