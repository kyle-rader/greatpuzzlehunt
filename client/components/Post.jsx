// Post component

Post = React.createClass({
    propTypes: {
        post: React.PropTypes.object.isRequired,
    },

    render() {
        return (
        <div className="event">
            <div className="content">
                <div className="summary">
                    <a className="user">
                        UserName 
                    </a>
                    posted
                    <div className="date">
                        5m ago
                    </div>
                </div>
                <div className="extra text">
                    {this.props.post.text}
                </div>
                <div className="meta">
                    <a className="like">
                        <i className="like icon"></i> x likes
                    </a>
                </div>
            </div>
        </div>
        );
    }
});