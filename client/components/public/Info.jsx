Info = React.createClass({

    render() {
        return (
        <div className="info custom-bg red-square">
            <br/>
            <div className="ui container raised segment transparent-bg">
                <PuzzlePageTitle title="Information"/>
                
                <h2 className="ui top attached header">
                    <i className="huge red help icon"></i>
                    <div className="content">
                        What is The WWU Great Puzzle Hunt?
                        <div className="sub header">(A lot of fun is what!)</div>
                    </div>
                </h2>
                <div className="ui attached segment">
                    A puzzle hunt is like a scavenger hunt, with puzzles. 
                    Teams (4-6 is a nice size) travel on foot about campus (outdoors) 
                    solving a collection of puzzles (logic puzzles, word scrambles, trivia, etc.). 
                    Lots of prizes will be awarded. Whether your team places first or two hundred and fifty-first, 
                    competing in a puzzle hunt is a great way to stretch your mental muscles, bond with your teammates, 
                    and have a lot of fun!
                </div>

                <h2 className="ui top attached header">
                    <i className="huge orange calendar icon"></i>
                    <div className="content">
                        When is it?
                        <div className="sub header">Saturday April 9th, 2016 @ 10:00 AM, Red Square</div>
                    </div>
                </h2>


            </div>
            <br/>
        </div>
        );
    }
});
