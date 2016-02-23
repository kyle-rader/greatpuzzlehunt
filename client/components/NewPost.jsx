// New Post Form

NewPost = React.createClass({

    makeNewPost(event) {
        event.preventDefault();

        // Find the text field via React ref
        let postInput = React.findDOMNode(this.refs.newPostText);
        let text = postInput.value.trim();

        // Insert new task
        Posts.insert({
            text: text,
            createdAt: Date.now()
        });

        // Clear form
        postInput.value = '';
    },

    render() {
        return (
        <form className="ui form container" onSubmit={this.makeNewPost} >
            <div className="field">
                <label>New Post</label>
                <input type="text" ref="newPostText" placeholder="What's Up?" />
            </div>
            <div className="ui blue right floated submit button" onClick={this.makeNewPost}>Post</div>
        </form>
        );
    }
});