// Define our main App component

App = React.createClass({

    render() {

        return (
        <div>
            <div className="ui labeled icon menu">
                <div className="ui container">
                    <a className="item" href="#">
                    <i className="home icon"></i>
                        Home
                    </a>
                    <a className="item">
                        <i className="comments icon"></i>
                        Posts
                    </a>
                    <div className="right menu">
                        <a className="item">
                          <i className="sign in icon"></i>
                          Sign In
                        </a>
                    </div>
                </div>
            </div>
            <NewPost />
            <Feed />
        </div>
        );
    }

});