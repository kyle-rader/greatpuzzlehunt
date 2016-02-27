// Feed Component

Feed = React.createClass({
    
    mixins: [ReactMeteorData],

    // Load posts from the Posts collection and put them in this.data.posts
    getMeteorData() {
        let data = {};
        let handle = Meteor.subscribe('posts');
        if (handle.ready()) {
            data.posts = Posts.find({}, {sort: {createdAt: -1}}).fetch()
        }
        return data;
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
                {this.data.posts ? this.renderPosts() : <p>Loading...</p>}
            </div>
        </div>
        );
    }
});