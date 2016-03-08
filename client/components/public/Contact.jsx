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
                            <h2>Website Support</h2>
                            <h3>Clark Rinker | <a href="rinkerc@students.wwu.edu">rinkerc@students.wwu.edu</a></h3>
                            <h3>NOTE: During Dead Week please contact Clark with your support questions</h3>
                        </div>
                    </div>
                </div>

            </div>
            <br/>
        </div>
        );
    }
});
