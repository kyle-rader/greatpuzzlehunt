import React from 'react';
import { Meteor } from 'meteor/meteor';

PuzzleEditor = React.createClass({

    getInitialState() {
        return {
            hints: []
        };
    },

    savePuzzle(event) {
        let puzzle = {
            _id: this.props.puzzle._id,
            name: this.refs.name.value.trim(),
            order: parseInt(this.refs.order.value),
            answer: this.refs.answer.value.replace(/\s+/g,'').toLowerCase(),
            badAnswer: this.refs.badAnswer.value.replace(/\s+/g,'').toLowerCase(),
            badAnswerResponse: this.refs.badAnswerResponse.value.trim(),
            location: this.refs.location.value.trim(),
            hints: this.props.puzzle.hints.concat(this.state.hints.map((hint) => {
                return hint._id;
            }))
        };

        let btn = $(event.target);
        
        Meteor.call('updatePuzzle', puzzle, (err, result) => {
            if (err) {
                console.log(err);
                btn.attr('data-content', 'Save Failed! 😰');
            } else {
                btn.attr('data-content', 'Puzzle Saved! 😀');
            }

            btn.popup({
                on: 'manual'
            }).popup('show');
            setTimeout(() => {
                btn.popup('hide');
            }, 3000);
        });

        this.setState({hints: []});
    },

    deletePuzzle(event) {
        if (!confirm(`Are you sure you want to delete ${this.refs.name.value}?`))
            return;

        let btn = $(event.target);

        Meteor.call('deletePuzzle', {_id: this.props.puzzle._id}, (err, result) => {
            if (err) {
                console.log(err);
                btn.attr('data-content', 'Delete Failed! 😰');
            } else {
                btn.attr('data-content', 'Puzzle Delete! 😀');
            }

            btn.popup({
                on: 'manual'
            }).popup('show');
            setTimeout(() => {
                btn.popup('hide');
            }, 3000);
        })
    },

    handleUpload(event) {
        let input = this.refs.imageUpload;

        if (input.files && input.files[0]) {
            let reader = new FileReader();
            
            reader.onload = (e) => {
                // Store Image and add to State
                Images.insert(input.files[0], (err, fileObj) => {
                    if (err) {
                        console.log('Error inserting image into database!');
                        console.log(err);
                    } else {
                        // handle success depending what you need to do
                        console.log(`Saved image ${fileObj._id}`);
                        // Add to newly read image to state
                        this.setState(
                        {
                            hints: this.state.hints.concat(
                            {
                                data: e.target.result,
                                _id: fileObj._id
                            })
                        });
                    }
                });
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    },

    render() {
        // State hints from new upload.
        let hints = this.state.hints.map((hint) => {
            return <img className="ui image" src={hint.data} key={hint._id}/>
        });
        // Add images already stored for Puzzle
        hints = hints.concat(this.props.puzzle.hints.map((hint) => {
            return <img className="ui image" src={`/cfs/files/images/${hint}`} key={hint} />
        }));

        return (
            <form className="ui form segment" style={{overflow: 'auto'}}>
                <div className="two fields">
                    <div className="field">
                        <label>Puzzle Name</label>
                        <input ref="name" type="text" placeholder="Puzzle Name" defaultValue={this.props.puzzle.name} />
                    </div>
                    <div className="field">
                        <label>Puzzle Order (0 = First, 1 = Second, etc)</label>
                        <input ref="order" type="number" placeholder="Puzzle Order" defaultValue={this.props.puzzle.order}/>
                    </div>
                </div>
                <div className="three fields">
                    <div className="field">
                        <label>Accepted Answer</label>
                        <input ref="answer" type="text" placeholder="code, words, here" defaultValue={this.props.puzzle.answer} />
                    </div>
                    <div className="field">
                        <label>Bad Answer (will trigger the bad response)</label>
                        <input ref="badAnswer" type="text" placeholder="not right, not this either" defaultValue={this.props.puzzle.badAnswer} />
                    </div>
                    <div className="field">
                        <label>Bad Answer Rresponse</label>
                        <input ref="badAnswerResponse" type="text" placeholder="close but no cigar" defaultValue={this.props.puzzle.badAnswerResponse} />
                    </div>
                </div>
                <div className="field">
                    <label>Puzzle Location</label>
                    <input ref="location" type="text" placeholder="By that one building!" defaultValue={this.props.puzzle.location} />
                </div>
                <h4 className="ui header">Hints</h4>
                <div className="field">
                    <input className="ui small teal button" type="file" accept="image/*" ref="imageUpload" onChange={this.handleUpload}/>
                </div>
                <div ref="hints" className="ui small images">
                    {hints}
                </div>
                <div className="ui right floated green button" onClick={this.savePuzzle}>
                    <i className="save icon"></i> Save
                </div>
                <div className="ui right floated red button" onClick={this.deletePuzzle}>
                    <i className="trash icon"></i> Delete
                </div>
                <br/>
            </form>
        );
    }

});

export default PuzzleEditor;