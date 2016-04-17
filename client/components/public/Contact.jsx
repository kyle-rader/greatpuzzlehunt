import React from 'react';

Contact = React.createClass({

    render() {
        return (
        <div className="contact custom-bg red-square">
            <br/>
            <div className="ui container raised segment transparent-bg">
                <PuzzlePageTitle title="Contact"/>

                <div className="ui equal width stackable internally celled grid">
                    <div className="center aligned row">
                        <div className="column">
                            <h2>Event Coordinator</h2>
                            <h2><a href="mailto:millie.johnson@wwu.edu">Millie.Johnson@wwu.edu</a></h2>
                        </div>
                        <div className="column">
                            <h2>Website Support</h2>
                            <h2><a href="mailto:raderk@students.wwu.edu">raderk@students.wwu.edu</a></h2>
                            <h3>Track development progress on <a target="_blank" href="https://trello.com/b/y8B6gqg1/wwu-puzzle-hunt">Trello</a></h3>
                        </div>
                    </div>
                </div>

            </div>
            <br/>
        </div>
        );
    }
});
