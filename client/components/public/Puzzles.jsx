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
                            <h2>Think Outside The Box</h2>
                            <p>This problem involves spatial thinking/ visualization, patterns, and geometry!</p>
                            <a className="ui labeled teal icon button" target="_blank" href="/pdfs/Think-Outside-The-Box.pdf">
                                <i className="download icon"></i> Download PDF
                            </a>
                        </div>

                        <div className="column">
                            <h2>Read My Lips</h2>
                            <p>This problem is about speech, sound, and words!</p>
                            <a className="ui labeled teal icon button" target="_blank" href="/pdfs/Read-My-Lips.pdf">
                                <i className="download icon"></i> Download PDF
                            </a>
                        </div>
                    </div>
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
                            <p>Visual numbers and math!</p>
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
                </div>

            </div>
            <br/>
        </div>
        );
    }
});
