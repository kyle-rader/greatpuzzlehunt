Puzzles = React.createClass({

    render() {
        return (
        <div className="contact custom-bg red-square">
            <br/>
            <div className="ui container raised segment transparent-bg">
                <PuzzlePageTitle title="Puzzles"/>

                <h4 className="ui center aligned header">
                    Remember it will be useful to have a diverse team with a diverse set of skills if you want to solve all of the puzzles :)
                </h4>

                <div className="ui stackable grid">
                    <div className="center aligned equal width row">
                        <div className="column">
                            <h2>Think Outside The Box</h2>
                            <p>This problem involves spacial thinking/ visualization, patterns, and geometry!</p>
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
                </div>
                
            </div>
            <br/>
        </div>
        );
    }
});
