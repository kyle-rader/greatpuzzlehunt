import React from 'react';
import { Meteor } from 'meteor/meteor';

VolunteerPage = React.createClass({

    getInitialState() {
        return {
            selectedPuzzle: null
        };
    },

    mixins:[ReactMeteorData],
    getMeteorData() {
        let data = {
            user: Meteor.user()
        };

        let gamestateHandle = Meteor.subscribe('gamestate');
        let puzzlesHandle = Meteor.subscribe('puzzles.all');

        let gamestateLoading = !gamestateHandle.ready();
        let puzzlesLoading = !puzzlesHandle.ready();

        if (!gamestateLoading) {
            data.gamestate = GameState.findOne({});
        }
        if (!puzzlesLoading) {
            data.puzzles = PuzzleCollection.find({}).fetch();
        }
        return data;
    },

    renderPuzzleSelector() {
        let puzzles = this.data.puzzles.map((puzzle) => {
            return <option value={puzzle._id} key={puzzle._id}>{puzzle.name}</option>;
        });

        return (
        <div className="ui form">
            <div className="field">
                <label>Select Your Puzzle</label>
                <select ref="puzzleSelect" className="ui dropdown">
                    {puzzles}
                </select>
            </div>
        </div>
        );
    },

    handleQRupload(event) {
        let input = this.refs.qrUpload;
        console.log(input);

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            let preview = $(this.refs.qrPreview);
            
            reader.onload = function (e) {
                preview.attr('src', e.target.result);
                preview.removeClass('hidden');
                qrcode.decode(e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    },

    renderQRcodeUploadButton() {
        return (
        <div className="ui form">
            <div className="field">
                <div className="fileUpload ui teal fluid button">
                    <span>Get Photo of QR Code</span>
                    <input className="upload" type="file" accept="image/*" ref="qrUpload" onChange={this.handleQRupload}/>
                </div>
            </div>
        </div>
        );
    },

    componentDidMount() {
        $(this.refs.puzzleSelect).dropdown();
    },

    render() {
        // First Check Access
        if (!this.data.user) {
            return <LoadingSegment />
        }
        else if (this.data.user.roles.indexOf('admin') < 0) {
            return <Login />
        }

        if (!this.data.gamestate || !this.data.puzzles) {
            // GameState not loaded - we don't know what to render yet.
            return <LoadingSegment />;
        }

        // Game state & Puzzles loaded
        return (
        <div className="custom-bg red-square">
            <br/>
            <div className="ui raised segment transparent-bg">
                {this.renderPuzzleSelector()}
            </div>

            {this.renderQRcodeUploadButton()}
        </div>
        );

    }

});