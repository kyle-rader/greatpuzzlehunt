// Post component

Post = React.createClass({
    propTypes: {
        post: React.PropTypes.object.isRequired,
    },

    getDateLabel() {
        let timeUnit = null;
        let plural = '';
        let timeValue = 0;

        let seconds = Math.floor((new Date() - this.props.post.createdAt) / 1000);
        let interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + ' years ago';
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + ' months ago';
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + ' days ago';
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + ' hours ago';
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + ' minutes ago';
        }
        return Math.floor(seconds) + ' seconds ago';
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
                        {this.getDateLabel()}
                    </div>
                </div>
                <div className="extra text">
                    {this.props.post.text}
                </div>
                <div className="meta">
                    <a className="like">
                        <i className="like icon"></i> {this.props.post.likes} likes
                    </a>
                </div>
            </div>
        </div>
        );
    }
});