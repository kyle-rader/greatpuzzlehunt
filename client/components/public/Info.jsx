Info = React.createClass({

    render() {
        return (
        <div className="info custom-bg red-square">
            <br/>
            <div className="ui container raised segment transparent-bg">
                <PuzzlePageTitle title="Information"/>
                
                {/* WHAT IS IT? */}
                <h2 className="ui top attached header">
                    <i className="red help icon"></i>
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

                {/* WHEN IS IT? */}
                <h2 className="ui top attached header">
                    <i className="orange calendar icon"></i>
                    <div className="content">
                        When is it?
                        <div className="sub header">Saturday April 9th, 2016 @ 10:00 AM, Red Square</div>
                    </div>
                </h2>
                <div className="ui attached segment">
                    <strong>Important Dates</strong>
                    <div className="ui list">
                        <div className="item">
                            <div className="ui horizontal label">
                                March 31, 2016
                            </div>
                            Last day to mark yourself as wanting to buy a T-Shirt <strong>if</strong> you want to pick it up at the event.
                        </div>
                    </div>
                </div>

                {/* WHO IS IT FOR? */}
                <h2 className="ui top attached header">
                    <i className="large icons">
                        <i className="yellow users icon"></i>
                        <i className="blue help corner icon"></i>
                    </i>
                    <div className="content">
                        Who is invited?
                        <div className="sub header">All WWU students, faculty, and staff!</div>
                    </div>
                </h2>
                <div className="ui attached segment">
                    All WWU students, faculty, and staff regardless of major or puzzle-solving experience!
                    <a href="/register"> Sign up</a> and create a team of up to 6 people, or 
                    register as an individual and browse existing teams and find one in need of your skills!
                </div>

                {/* DO I HAVE TO DO MATH? */}
                <h2 className="ui top attached header">
                    <i className="large icons">
                        <i className="olive calculator icon"></i>
                        <i className="green flask corner icon"></i>
                    </i>
                    <div className="content">
                        Do I have to be a math/ science person to do well?
                        <div className="sub header">Nope!</div>
                    </div>
                </h2>
                <div className="ui attached segment">
                    NO! A common misconception is that only mathematically inclined people are good at solving puzzles. 
                    In this puzzle hunt, it will be to your advantage to have people on your team with 
                    knowledge of music, art, humanities and social sciences, as well as science and mathematics.
                </div>

                {/* COST? */}
                <h2 className="ui top attached header">
                    <i className="green money icon"></i>
                    <div className="content">
                        How much does this cost?
                        <div className="sub header">Free this year! (Unless you want to buy an awesome T-Shirt)</div>
                    </div>
                </h2>

                {/* WHAT TO BRING? */}
                <h2 className="ui top attached header">
                    <i className="teal suitcase icon"></i>
                    <div className="content">
                        What should I bring to the puzzle hunt?
                        <div className="sub header">Your creativity and problem solving skills!</div>
                    </div>
                </h2>
                <div className="ui attached segment">
                    <div className="ui list">
                        <div className="item">
                            <div className="ui horizontal red label">
                                <i className="large mobile icon"></i>Smart Phone
                            </div>
                            <strong>Required</strong> to submit puzzle codes to the website during the event.
                        </div>
                        <div className="item">
                            <div className="ui horizontal label">
                                <i className="large ion-android-clipboard icon"></i>Clipboard
                            </div>
                            Or notepad with graph paper might come in handy
                        </div>
                        <div className="item">
                            <div className="ui horizontal label">
                                <i className="large pencil icon"></i>Pencil
                            </div>
                            Or other writing utencils (highlighters, pens).
                        </div>
                        <div className="item">
                            <div className="ui horizontal label">
                                <i className="large ion-scissors icon"></i>Scissors
                            </div>
                            For cutting paper. Also tape!
                        </div>
                        <div className="item">
                            <div className="ui horizontal label">
                                <i className="large umbrella icon"></i>Umbrella
                            </div>
                            Not for you... for the problem packet/ paper.
                        </div>
                    </div>
                </div>

                {/* WHAT IF IT RAINS? */}
                <h2 className="ui top attached header">
                    <i className="large icons">
                        <i className="blue cloud icon"></i>
                        <i className="yellow lightning corner icon"></i>
                    </i>
                    <div className="content">
                        What if it rains?
                        <div className="sub header">You live in Washington... it rains here.</div>
                    </div>
                </h2>

                {/* HOW LONG? */}
                <h2 className="ui top attached header">
                    <i className="violet clock icon"></i>
                    <div className="content">
                        How long will the puzzle hunt last?
                        <div className="sub header">10AM - 3PM</div>
                    </div>
                </h2>
                <div className="ui attached segment">
                    Registration and check-in will start at 10:00 a.m. in Red Square where your 
                    team will receive a rules packet and team T-shirts pre-ordered by March 31, 2016. 
                    The Puzzle Hunt will start at 11:00 a.m. when the first puzzle is released. 
                    Prizes will be awarded at approximately 3:00 p.m.
                </div>

                {/* PUZZLES? */}
                <h2 className="ui top attached header">
                    <i className="purple puzzle icon"></i>
                    <div className="content">
                        What kinds of puzzles will there be?
                        <div className="sub header"><a href="/puzzles">See examples</a></div>
                    </div>
                </h2>
                <div className="ui attached segment">
                    Each puzzle results in a code word or words that must be entered to stop the clock for that problem. 
                    Time is a factor, so make sure everyone on the team is assigned to a job. 
                    Some members can cut out objects if needed. If a problem has several parts, see if different 
                    members can tackle different parts independently.
                    <br/><br/>
                    Once the proper code word(s) are entered, your team will be sent to the next destination. 
                    If your team is stuck, you may ask for hints. Each hint will add time to your clock. 
                    This information will be in the rules packet. Not all teams will travel the same paths. 
                    At each destination, you will need to scan a QR code to receive your next puzzle and re-start the clock.
                </div>

                {/* T-Shirts? */}
                <h2 className="ui top attached header">
                    <i className="pink ion-tshirt icon"></i>
                    <div className="content">
                        What do the T-Shirts look like?
                        <div className="sub header">Represent as a Puzzle Master!</div>
                    </div>
                </h2>
                <div className="ui attached segment">
                    <a className="ui button wwu-btn" href="https://commerce.cashnet.com/GreatPuzzleHunt2016" target="_blank">Buy Now!</a>
                    <br/><br/>
                    <div className="ui medium images">
                        <img className="ui image" src="img/T-Shirt-front.png"/>
                        <img className="ui image" src="img/T-Shirt-back.png"/>
                    </div>
                </div>
            </div>
            <br/>
        </div>
        );
    }
});
