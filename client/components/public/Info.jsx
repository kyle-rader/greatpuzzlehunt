Info = React.createClass({

    render() {
        return (
        <div className="info custom-bg red-square">
            <br/>
            <div className="ui container raised segment relaxed items transparent-bg">
                <PuzzlePageTitle title="Information"/>
                <div className="item">
                    <i className="red help info icon"></i>
                    <div className="content">
                        <div className="header">What is The WWU Great Puzzle Hunt?</div>
                        <div className="description">
                            A puzzle hunt is like a scavenger hunt, with puzzles. 
                            Teams (4-6 is a nice size) travel on foot about campus (outdoors) solving 
                            a collection of puzzles (logic puzzles, word scrambles, trivia, etc.). 
                            Lots of prizes will be awarded. Whether your team places first or two hundred 
                            and fifty-first, competing in a puzzle hunt is a great way to stretch your mental 
                            muscles, bond with your teammates, and have a lot of fun!
                        </div>
                    </div>
                </div>
            </div>
            <br/>
        </div>
        );
    }
});
