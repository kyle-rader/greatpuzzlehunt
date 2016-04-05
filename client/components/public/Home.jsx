import React from 'react';

Home = React.createClass({

    render() {
        return (
        <div className="custom-bg red-square">
            <br/>
            <div className="ui container raised segment grid transparent-bg">
                {/* Puzzle Hunt Title */}
                <div className="row">
                    <div className="column">
                        <div className="puzzle-hunt-title">
                            <h2>The First Annual</h2>
                            <h1>WWU Great</h1>
                            <a href="/"><img src="img/logo-512.png" /></a>
                            <h1>Puzzle Hunt</h1>
                            <h3>April 9th, 2016 &nbsp;&nbsp; 10AM - 3PM</h3>
                        </div>
                    </div>
                </div>
                {/* Home Panels */}
                <div className="two column equal height stackable row">
                    <div className="column">
                        <div className="ui two column grid">
                            <HomePanel
                            title="Register"
                            icon="huge blue user add icon"
                            link="/register"
                            extraText="Free to Register! Space is limited!"
                            />
                            <HomePanel
                                title="Login"
                                icon="huge green sign in icon"
                                link="/login"
                                extraText="Log in to create or join a team!"
                                />
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui two column grid">
                            <HomePanel
                            title="Info"
                            icon="huge red help icon"
                            link="/info"
                            extraText="This is an event for WWU students/faculty/staff to join forces and solve epic puzzles of all kinds!"
                            />
                            <HomePanel
                            title="Puzzles"
                            icon="huge purple puzzle icon"
                            link="/puzzles"
                            extraText="Check out example puzzles!  Teams with diverse skillsets will be advantageous :)"
                            />
                        </div>
                    </div>
                </div>
                <div className="equal width stackable row">
                    <div className="center aligned column">
                        <div className="ui items">
                            <div className="item">
                                <a className="ui huge fluid labeled icon button wwu-btn" href="https://securelb.imodules.com/s/1710/campaign/index.aspx?sid=1710&gid=2&pgid=467&cid=1175&dids=167&bledit=1" target="_blank">
                                    <i className="heart icon"></i>
                                    Help make this event happen and donate now!
                                </a>
                            </div>
                            <div className="item">
                                <a className="ui huge fluid teal labeled icon button" href="https://docs.google.com/forms/d/1aEnToLDOTY9P53mY3LRecWkY5w-4_xyYpBmMwwSh0Pw/viewform" target="_blank">
                                    <i className="bullhorn icon"></i>
                                    Volunteer to help run event!
                                </a>
                            </div>
                            <div className="item">
                                <a className="ui huge fluid labeled icon button" href="/contact">
                                    <i className="mail icon"></i>
                                    Contact Us
                                </a>
                            </div>
                            <div className="item">
                                <a className="ui huge fluid labeled icon facebook button" target="_blank" href="https://www.facebook.com/events/160687404314460/">
                                    <i className="facebook icon"></i>
                                    Share
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="center aligned column">
                        <h2 className="ui top attached header">Logistics</h2>
                        <ul className="ui raised attached segment divided items">
                            <li className="item">
                                <div className="description">Free to register this year</div>
                            </li>
                            <li className="item">
                                <div className="description">Limited space so register fast</div>
                                </li>
                            <li className="item">
                                <div className="description">Must have a <strong>@student.wwu.edu</strong> or <strong>@wwu.edu</strong> email address</div>
                            </li>
                            <li className="item">
                                <div className="description">Team size limit is 6</div>
                            </li>
                            <li className="item">
                                <div className="description">Awesome T-Shirts are $15</div>
                                <div className="extra">
                                    <a className="ui right floated button wwu-btn" href="https://commerce.cashnet.com/GreatPuzzleHunt2016" target="_blank">Order Now!</a>
                                </div>
                            </li>
                            <li className="item">
                                <div className="description">T-Shirt Ordering Deadline is <b>April 9, 2016 at midnight</b></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <br/>
        </div>
        );
    }
});
