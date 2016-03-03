Home = React.createClass({


    render() {
        return (
        <div className="ui container two column grid">
            <div className="column">
                <div className="ui two column grid">
                    <div className="column">
                        Col 1
                    </div>
                    <div className="column">
                        Col 2
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="ui two column grid">
                    <div className="column">
                        Col 3
                    </div>
                    <div className="column">
                        Col 4
                    </div>
                </div>
            </div>
        </div>
        );
    }
});
