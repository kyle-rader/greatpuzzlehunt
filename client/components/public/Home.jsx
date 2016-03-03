Home = React.createClass({

    render() {
        return (
        <div className="custom-bg red-square">
            <br/>
            <div className="ui container raised segment grid transparent-bg">
                <div className="row">
                    <div className="column">
                        <div className="puzzle-hunt-title">
                            <h2>The First Annual</h2>
                            <h1>WWU Great</h1>
                            <img src="img/logo-512.png" />
                            <h1>Puzzle Hunt</h1>
                            <h3>April 9th, 2016 &nbsp;&nbsp; 10AM - 3PM</h3>
                        </div>
                    </div>
                </div>
                <div className="two column stackable row">
                    <div className="column">
                        <div className="ui two column grid">
                            <div className="text-center column">
                                <div className="ui raised segment">
                                    <a className="icon-btn" href="/login">
                                        <i className="huge green sign in icon"></i>
                                        <h2>Login</h2>
                                    </a>
                                    Don't have an account yet?<br/>
                                    <a href="/register">Create on now!</a>
                                </div>
                            </div>
                            <div className="column">
                                <div className="ui raised segment">
                                    <h2>Title</h2>
                                    A column here
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui two column grid">
                            <div className="column">
                                <div className="ui raised segment">
                                    <h2>Title</h2>
                                    A column here
                                </div>
                            </div>
                            <div className="column">
                                <div className="ui raised segment">
                                    <h2>Title</h2>
                                    A column here
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
        </div>
        );
    }
});
