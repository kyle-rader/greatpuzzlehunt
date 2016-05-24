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
                            <h2>The Second Annual</h2>
                            <h1>WWU Great</h1>
                            <a href="/"><img src="img/logo.png" /></a>
                            <h1>Puzzle Hunt</h1>
                            <h3>April 1st, 2017 &nbsp;&nbsp; 10AM - 3PM</h3>
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
                            extraText="Registration will open near the end of 2016!"
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
                            extraText="This is an event for WWU students, faculty, and staff to join forces and solve epic puzzles!"
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

                <div className="two column equal height stackable row">
                    <div className="column">
                        <div className="ui two column grid">
                            <HomePanel
                            title="Donate"
                            icon="huge violet gift icon"
                            link="https://securelb.imodules.com/s/1710/campaign/index.aspx?sid=1710&gid=2&pgid=467&cid=1175&dids=167&bledit=1"
                            extraText="Your contribution will help make this happen!"
                            />
                            <HomePanel
                                title="Gallery"
                                icon="huge orange photo icon"
                                link="/gallery"
                                extraText="Check out the 2016 puzzle hunt!"
                                />
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui two column grid">
                            <HomePanel
                            title="Contact Us"
                            icon="huge teal mail icon"
                            link="mailto:info@wwupuzzlehunt.com"
                            extraText="Questions about teams, registration, anything!"
                            />
                            <HomePanel
                            title="Share"
                            icon="huge square facebook facebook-blue icon"
                            link="https://www.facebook.com/wwupuzzlehunt/"
                            extraText="Look for the 2017 Puzzle Hunt upcoming on Facebook and invite your friends!"
                            />
                        </div>
                    </div>
                </div>
                
            </div>
            <br/>
        </div>
        );
    }
});
