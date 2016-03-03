// Define our login comp

Register = React.createClass({

    getInitialState() {
      return {
        err: null,
        username: '',
        password: ''
      };
    },

    componentDidMount() {
    },

    validateForm(formData) {
      let reason = '';
      if (!formData.firstname || formData.firstname.length == 0)
        reason = 'A first name is required';
      else if (!formData.lastname || formData.lastname.length == 0)
        reason = 'A first last is required';
      else if (!formData.username || formData.username.length == 0)
        reason = 'A username is required';
      else if (!formData.password || formData.password.length == 0)
        reason = 'A password is required';
      else if (!formData.acceptTOC || formData.acceptTOC !== 'on') {
        reason = 'You must accept the Terms Of Use';
      }

      return {hasError: reason.length > 0, reason: reason};
    },

    createAccount(event) {
        event.preventDefault();

        let fields = $(this.refs.registerForm).form('get values firstname lastname username password acceptTOC');
        
        let validation = this.validateForm(fields);

        if (validation.hasError) {
          this.setState({err: validation});
        }
        else {
          Accounts.createUser({
            username: fields.username,
            password: fields.password,
            profile: {
              firstname: fields.firstname,
              lastname: fields.lastname,
              acceptTOC: fields.acceptTOC
            }
          }, (err) => {
            if (err) {
              console.log(err);
              this.setState({err: err.reason});
            }
          });
        }
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
      <div className="register ui middle aligned center aligned grid custom-bg map">
          <div className="column">
              <form className="ui form" ref="registerForm" onSubmit={this.createAccount}>
                <div className="ui raised segment transparent-bg">
                  <h2 className="ui blue header">
                    <div className="content">
                      On your marks! Get set! Puzzles!
                    </div>
                  </h2>
                  <div className="two fields">
                    <div className="field">
                      <input type="text" ref="firstname" name="firstname" placeholder="First Name" autoComplete="off" defaultValue={this.state.firstname}/>
                    </div>
                    <div className="field">
                      <input type="text" ref="lastname" name="lastname" placeholder="Last Name" autoComplete="off" defaultValue={this.state.lastname}/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="user icon"></i>
                      <input type="text" ref="username" name="username" placeholder="Username" autoComplete="off" defaultValue={this.state.username}/>
                    </div>
                  </div>
                  <div className="field">
                    <div className="ui left icon input">
                      <i className="lock icon"></i>
                      <input type="password" ref="password" name="password" placeholder="Password" autoComplete="off" defaultValue={this.state.password}/>
                    </div>
                  </div>
                  <div className="inline field">
                    <div className="ui checkbox">
                      <input type="checkbox" ref="acceptTOC" name="acceptTOC" />
                      <label>I agree to the terms and conditions</label>
                    </div>
                  </div>
                  <input className="ui fluid large blue submit button" type="submit" value="Join" />
                </div>
              </form>
              {this.getErrorMessage()}

              <div className="ui message transparent-bg">
                <a href="/login">Log In</a>
              </div>
          </div>
      </div>);
    }
});
