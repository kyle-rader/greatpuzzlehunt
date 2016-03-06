// New Post Form

NewPost = React.createClass({

    makeNewPost(event) {
        event.preventDefault();

        // Find the text field via React ref
        let postInput = ReactDOM.findDOMNode(this.refs.newPostText);
        let text = postInput.value.trim();

        if (text.length === 0)
            return;

        // Insert new task
        Meteor.call('postInsert', {text: text}, (err, result) => {
            if (err)
                return alert(err.reason);

            console.log(result);
        });

        // Clear form
        postInput.value = '';
    },

    render() {
        return (
        <form className="new-post ui form container" onSubmit={this.makeNewPost} >
            <div className="field">
                <label>New Post</label>
                <input type="text" ref="newPostText" placeholder="What's Up?" />
            </div>
            <div className="ui blue right floated submit button" onClick={this.makeNewPost}>Post</div>
        </form>
        );
    }
});