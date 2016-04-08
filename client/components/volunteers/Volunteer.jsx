import React from 'react';
import { Meteor } from 'meteor/meteor';

VolunteerPage = React.createClass({

    getInitialState() {
        return {
            currentPuzzle: null,
            currentTeamId: null,
            error: null
        };
    },

    mixins:[ReactMeteorData],
    getMeteorData() {
        let data = {
            user: Meteor.user()
        };

        let gamestateHandle = Meteor.subscribe('gamestate');
        let gamestateLoading = !gamestateHandle.ready();

        let puzzlesHandle = Meteor.subscribe('puzzles.all');
        let puzzlesLoading = !puzzlesHandle.ready();

        let teamHandle = Meteor.subscribe('team.names');
        let teamLoading = !teamHandle.ready();

        if (!gamestateLoading) {
            data.gamestate = GameState.findOne({});
        }
        if (!teamLoading) {
            data.team = Teams.findOne({_id: this.state.currentTeamId}, {name: 1});
        }
        if (!puzzlesLoading) {
            data.puzzles = PuzzleCollection.find({}).fetch();
        }
        return data;
    },

    selectPuzzle(puzzle) {
        this.setState({
            currentPuzzle: puzzle._id,
            currentTeamId: this.state.currentTeamId
        });
    },

    renderPuzzleSelector() {
        let puzzles = this.data.puzzles.map((puzzle) => {
            let btnClass = this.state.currentPuzzle === puzzle._id ?
                'ui violet button' : 'ui button';
            return (
            <div className={btnClass} key={puzzle._id} onClick={this.selectPuzzle.bind(this, puzzle)}>
                {puzzle.name}
            </div>
            );
        });

        return (
        <div className="ui large vertical fluid buttons">
            {puzzles}
        </div>
        );
    },

    handleQRupload(event) {
        let input = this.refs.qrUpload;

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                qrcode.decode(e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    },

    componentDidMount() {
        qrcode.callback = (data) => {
            if (data === 'error decoding QR Code') {
                this.setState({
                    currentPuzzle: this.state.currentPuzzle,
                    currentTeamId: null,
                    error: 'Bad QR Photo! Try Again :)'
                });
            } else {
                this.setState({
                    currentPuzzle: this.state.currentPuzzle,
                    currentTeamId: data,
                    error: null
                });
            }
        };
    },

    renderQRcodeUploadButton() {
        // First make sure they have a puzzle selected
        if (!this.state.currentPuzzle) {
            return <div className="ui large warning message">You need to select a puzzle!</div>;
        } else if (!this.state.currentTeamId) {
            return (
            <div className="ui form">
                <div className="field">
                    <div className="fileUpload ui large teal fluid button">
                        <span>Get Photo of QR Code</span>
                        <input className="upload" type="file" accept="image/*" ref="qrUpload" onChange={this.handleQRupload}/>
                    </div>
                </div>
            </div>
            );
        }
    },

    renderStartTimer() {
        if (!this.state.currentPuzzle) {
            // No Puzzle Yet. Render nothing.
            return null;
        } 
        else if (this.state.error) {
            // Error Reading QR Code
            return <div className="ui large error message">{this.state.error}</div>;
        } 
        else if (!this.state.currentTeamId) {
            // Ready to Scan a Team QR Code
            return <div className="ui large info message">You are ready to scan a team's QR code!</div>;
        } 
        else if (this.data.team) {
            // We Have Aquired the Team!  This is the actual Start Button!
            return (
            <div className="ui large green fluid labeled icon button" onClick={this.startTimerForTeam}>
                <i className="large clock icon"></i>
                Start Timer for: <br/>
                <h3>{this.data.team.name}</h3>
            </div>
            );
        }
        // The case that they read a QR code - but it wasn't a valid Team ID
        else if (this.state.currentTeamId && !this.data.team) {
            return <div className="ui large error message">That QR Code wasn't a Team ID. Try Again :)</div>;
        }
    },

    startTimerForTeam() {

    },

    render() {
        // First Check Access
        if (!this.data.user) {
            return <LoadingSegment />
        }
        else if (this.data.user.roles.indexOf('volunteer') < 0) {
            return <Login />
        }

        if (!this.data.gamestate || !this.data.puzzles) {
            // GameState not loaded - we don't know what to render yet.
            return <LoadingSegment />;
        }

        // Has the Game Started?
        if (this.data.gamestate.gameplay) {
            return (
            <div className="custom-bg red-square">
                <br/>
                <div className="ui raised segment transparent-bg">
                    <h2 className="ui center aligned header">Volunteer Timer Page</h2>
                    {this.renderPuzzleSelector()}
                    <br/>
                    {this.renderQRcodeUploadButton()}
                    <br/>
                    {this.renderStartTimer()}
                </div>
            </div>
            );
        } else {
            return (
            <div className="custom-bg red-square">
                <br/>
                <div className="ui raised segment transparent-bg">
                    <h2 className="ui center aligned header">Volunteer Timer Page</h2>
                    <div className="ui large warning message">The game has not started yet!</div>
                </div>
            </div>
            );
        }
    }

});