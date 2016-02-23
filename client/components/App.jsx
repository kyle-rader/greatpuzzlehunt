// Define our main App component

App = React.createClass({

    getPosts() {
        return [
            {_id: 1, text: 'This is post 1'},
            {_id: 2, text: 'This is post 2'},
            {_id: 3, text: 'This is post 3'},
        ];
    },

    renderPosts() {
        return this.getPosts().map((post) => {
            return <Post key={post._id} post={post} />;
        });
    },

    render() {
        let posts = this.renderPosts();

        return (
            <div className="ui container">
                <header>
                    <h1>Posts</h1>
                </header>

                <ul>
                    {posts}
                </ul>
            </div>
        );
    }

});