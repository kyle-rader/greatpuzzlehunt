import React from 'react';
import { Meteor } from 'meteor/meteor';

PuzzleEditor = React.createClass({

    getInitialState() {
        return {
            hints: []
        };
    },

    savePuzzle(event) {
        console.log(`Saveing Puzzle ${this.props.puzzle._id}`);
    },

    deletePuzzle(event) {
        console.log(`Deleteing puzzle ${this.props.puzzle._id}`);
    },

    handleUpload(event) {
        let input = this.refs.imageUpload;

        if (input.files && input.files[0]) {
            let reader = new FileReader();
            let preview = $(this.refs.qrPreview);
            
            reader.onload = function (e) {
                preview.attr('src', e.target.result);
                preview.removeClass('hidden');
            }
            
            reader.readAsDataURL(input.files[0]);

            Images.insert(input.files[0], function (err, fileObj) {
              if (err) {
                 console.log(err);
              } else {
                 // handle success depending what you need to do
                this.setState({
                    hints: this.state.hints.concat(fileObj._id)
                });
              }
            });
        }
    },

    render() {

        let hints = this.state.hints.map((hint) => {
            return <img className="ui image" src={`/cfs/files/images/${hint}`} />
        });

        return (
            <form className="ui form segment" style={{overflow: 'auto'}}>
                <div className="fluid field">
                    <label>Puzzle Name</label>
                    <input ref="name" type="text" placeholder="Puzzle Name" defaultValue={this.props.puzzle.name} />
                </div>
                <div className="fluid field">
                    <label>Accepted Answers (Comma Separated)</label>
                    <input ref="answers" type="text" placeholder="code, words, here" defaultValue={this.props.puzzle.answers.join([separator = ','])} />
                </div>
                <div className="fluid field">
                    <label>Bad Answers (Comma Separated). These will trigger the bad answer response.</label>
                    <input ref="badAnswers" type="text" placeholder="not right, not this either" defaultValue={this.props.puzzle.badAnswers.join([separator = ', '])} />
                </div>
                <div className="fluid field">
                    <label>Bad Answer Rresponse</label>
                    <input ref="badAnswerResponse" type="text" placeholder="close but no cigar" defaultValue={this.props.puzzle.badAnswers.join([separator = ', '])} />
                </div>
                <h3 className="ui header">Hints</h3>
                <div className="field">
                    <input className="ui small olive button" type="file" accept="image/*" ref="imageUpload" onChange={this.handleUpload}/>
                </div>
                <div className="ui images">
                    {hints}
                </div>
                <div className="ui right floated green button" onClick={this.savePuzzle}>
                    <i className="save icon"></i> Save
                </div>
                <div className="ui right floated red button" onClick={this.deletePuzzle}>
                    <i className="save icon"></i> Delete
                </div>
                <br/>
            </form>
        );
    }

});

export default PuzzleEditor;