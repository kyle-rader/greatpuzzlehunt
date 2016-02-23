// Post component

Post = React.createClass({
    propTypes: {
        post: React.PropTypes.object.isRequired,
    },

    render() {
        return <li>{this.props.post.text}</li>;
    }
});