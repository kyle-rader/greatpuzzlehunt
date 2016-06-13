import React from 'react';

Puzzles = React.createClass({

    render() {
        return (
        <div className="contact custom-bg red-square">
            <br/>
            <div className="ui container raised segment transparent-bg">
                <PuzzlePageTitle title="2016 Puzzles"/>

                <h4 className="ui center aligned header">
                    Remember it will be useful to have a diverse team with a diverse set of skills if you want to solve all of the puzzles :)
                    <br/><strong>Hints and Answers will be posted soon!</strong>
                </h4>

                <div className="ui stackable grid">
                    <div className="center aligned equal width row">

                        <div className="column">
                            <h2>Cite Unseen</h2>
                            <p>Visual Literature!</p>
                            <a className="ui labeled teal icon button" target="_blank" href="/puzzles/Cite Unseen FINAL.pdf">
                                <i className="download icon"></i> Download PDF
                            </a>
                        </div>

                        <div className="column">
                            <h2>Fold and Behold</h2>
                            <p>A problem about folding and geometry!</p>
                            <a className="ui labeled teal icon button" target="_blank" href="/puzzles/Fold AND Behold FINAL.pdf">
                                <i className="download icon"></i> Download PDF
                            </a>
                        </div>
                    </div>

                    <div className="center aligned equal width row">

                        <div className="column">
                            <h2>Stop the Clock</h2>
                            <p>Visual numbers, numerals, and logic!</p>
                            <a className="ui labeled teal icon button" target="_blank" href="/puzzles/Stop the Clock FINAL.pdf">
                                <i className="download icon"></i> Download PDF
                            </a>
                        </div>

                        <div className="column">
                            <h2>Time Will Tell</h2>
                            <p>Music and melody!</p>
                            <a className="ui labeled teal icon button" target="_blank" href="/puzzles/Time will tell FINAL.pdf">
                                <i className="download icon"></i> Download PDF
                            </a>
                        </div>
                    </div>

                    <div className="center aligned equal width row">

                        <div className="column">
                            <h2>Meta Puzzle</h2>
                            <p>Combine the answers to all four puzzles to finish the final Meta Puzzle!</p>
                            <a className="ui labeled teal icon button" target="_blank" href="/puzzles/Meta Puzzle FINAL.pdf">
                                <i className="download icon"></i> Download PDF
                            </a>
                        </div>

                    </div>
                </div>

            </div>
            <br/>
        </div>
        );
    }
});
