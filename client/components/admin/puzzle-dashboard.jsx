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

    setEditPuzzle(puzzle) {
        if (this.state.puzzleToEdit) {
            this.clearPuzzle();
        }
        else {
            this.setState({
                puzzleToEdit: puzzle._id
            });
        }
    },

    clearPuzzle() {
        this.setState({
            puzzleToEdit: null
        });
    },

    renderPuzzleTable() {

        if (this.data.puzzles) {
            let puzzles = this.data.puzzles.map((puzzle) => {
                return (
                <tr key={puzzle._id}>
                    <td>{puzzle.name}</td>
                    <td>{puzzle.location}</td>
                    <td>{puzzle.order}</td>
                    <td>
                        <div className="ui right floated blue button" onClick={this.setEditPuzzle.bind(this, puzzle)}>
                            Edit
                        </div>
                    </td>
                </tr>
                );
            });

            return (
                <table className="ui compact celled table">
                    <thead>
                        <tr>
                            <th>Puzzle Name</th>
                            <th>Location</th>
                            <th>Order</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {puzzles}
                    </tbody>
                    <tfoot className="full-width">
                        <tr>
                            <th colSpan="4">
                                <div className="ui right floated green button" onClick={this.createPuzzle}>
                                    <i className="plus icon"></i> &nbsp; New Puzzle
                                </div>
                                <div className="ui right floated gray button" onClick={this.clearPuzzle}>
                                    <i className="close icon"></i> &nbsp; Close
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

        let puzzle = PuzzleCollection.findOne({_id: this.state.puzzleToEdit});
        let puzzleEdit;
        if (puzzle) {            
            puzzleEdit = <PuzzleEditor puzzle={puzzle} />
        }

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