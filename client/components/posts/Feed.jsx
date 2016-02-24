// Feed Component

Feed = React.createClass({
    
    mixins: [ReactMeteorData],

    // Load posts from the Posts collection and put them in this.data.posts
    getMeteorData() {
        return {
            posts: Posts.find({}, {sort: {createdAt: -1}}).fetch()
        };
    },

    renderPosts() {
        return this.data.posts.map((post) => {
            return <Post key={post._id} post={post} />;
        });
    },

    render() {
        return (
        <div className="ui container">
            <div className="ui feed">
                {this.renderPosts()}
            </div>
        </div>
        );
    }
});