// Define our login comp

Login = React.createClass({

    getInitialState() {
      return {
        err: null,
        username: '',
        password: ''
      };
    },

    login(event) {
        event.preventDefault();

        let username = $(this.refs.username).val();
        let password = $(this.refs.password).val();

        Meteor.loginWithPassword(username, password, (err) => {
            
            if (err) {
              this.setState({err: err});
            }
        });
    },

    getErrorMessage() {
      if (this.state.err != null) {
        return <div className="ui error message">{this.state.err.reason}</div>;
      }
      else {
        return null;
      }
    },

    render() {
      return (
      <div className="login ui middle aligned center aligned grid custom-bg map">
          <div className="column">
              <form className="ui large form" onSubmit={this.login}>
                <div className="ui raised segment transparent-bg">
                  <h2 className="ui green header">
                    <div className="content">
                      Puzzles Await
                    </div>
                  </h2>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input type="text" ref="username" placeholder="WWU Username" autoComplete="off" defaultValue={this.state.username}/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input type="password" ref="password" placeholder="Password" autoComplete="off" defaultValue={this.state.password}/>
                    </div>
                  </div>
                  <input className="ui fluid large green submit button" type="submit" value="Login" />
                </div>
              </form>
              {this.getErrorMessage()}

              <div className="ui message transparent-bg">
                <a href="/register">Join The Puzzle Hunt!</a> &nbsp; | &nbsp; <a href="/requestpasswordreset">Forgot Password</a>
              </div>
          </div>
      </div>);
    }
});
