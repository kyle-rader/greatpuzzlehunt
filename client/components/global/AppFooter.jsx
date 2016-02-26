AppFooter = React.createClass({
    render() {
        return (
        <div className="app-footer ui inverted vertical footer segment">
            <div className="ui center aligned container">
                <div className="ui stackable inverted divided grid">
                    <div className="three wide column">
                        <h4 className="ui inverted header">Group 1</h4>
                        <div className="ui inverted link list">
                            <a href="#" className="item">Link One</a>
                            <a href="#" className="item">Link Two</a>
                            <a href="#" className="item">Link Three</a>
                            <a href="#" className="item">Link Four</a>
                        </div>
                    </div>
                    <div className="three wide column">
                        <h4 className="ui inverted header">Group 2</h4>
                        <div className="ui inverted link list">
                            <a href="#" className="item">Link One</a>
                            <a href="#" className="item">Link Two</a>
                            <a href="#" className="item">Link Three</a>
                            <a href="#" className="item">Link Four</a>
                        </div>
                    </div>
                    <div className="three wide column">
                        <h4 className="ui inverted header">Group 3</h4>
                        <div className="ui inverted link list">
                            <a href="#" className="item">Link One</a>
                            <a href="#" className="item">Link Two</a>
                            <a href="#" className="item">Link Three</a>
                            <a href="#" className="item">Link Four</a>
                        </div>
                    </div>
                    <div className="seven wide column">
                        <h4 className="ui inverted header">Footer Header</h4>
                        <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
                    </div>
                </div>
            </div>
        </div>);
    }
});