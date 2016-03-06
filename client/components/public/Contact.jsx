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
                            <h3>Millie Johnson | <a href="mailto:millie.johnson@wwu.edu">Millie.Johnson@wwu.edu</a></h3>
                        </div>
                        <div className="column">
                            <h2>Web Master</h2>
                            <h3>Kyle Rader | <a href="mailto:kyle@kylerader.ninja">kyle@kylerader.ninja</a></h3>
                        </div>
                    </div>
                </div>
                
            </div>
            <br/>
        </div>
        );
    }
});
