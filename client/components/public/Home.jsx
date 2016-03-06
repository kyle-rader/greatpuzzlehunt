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
                            <img src="img/logo-512.png" />
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
                                title="Login" 
                                icon="huge green sign in icon" 
                                link="/login" 
                                extraText="Log in to create or join a team!"
                                />
                            <HomePanel 
                            title="Register" 
                            icon="huge blue user add icon" 
                            link="/register" 
                            extraText="Free to Register! Space is limited!"
                            />
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui two column grid">
                            <HomePanel 
                            title="Info" 
                            icon="huge purple help icon" 
                            link="/info" 
                            extraText="This is an event for WWU students/faculty/staff to join forces and solve epic puzzles of all kinds!"
                            />
                            <HomePanel 
                            title="Puzzles" 
                            icon="huge red puzzle icon" 
                            link="/puzzles" 
                            extraText="Check out example puzzles!  Teams with diverse skillsets will be advantageous :)"
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
