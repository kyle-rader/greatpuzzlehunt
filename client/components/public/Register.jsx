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
      let form = $(this.refs.registerForm);
      // init dropdowns
      $('#registerForm .ui.dropdown').dropdown();

      // initi form validation
      $(form).form({
        fields: {
          firstname: {
            identifier: 'firstname',
            rules: [{
              type: 'empty',
              prompt: 'Enter your first name'
            }]
          },
          lastname: {
            identifier: 'lastname',
            rules: [{
              type: 'empty',
              prompt: 'Enter your last name'
            }]
          },
          username: {
            identifier: 'username',
            rules: [{
              type: 'empty',
              prompt: 'Enter your WWU Username'
            }]
          },
          password: {
            identifier: 'password',
            rules: [{
              type: 'empty',
              prompt: 'Enter a password'
            },
            {
              type: 'minLength[6]',
              prompt: 'Min length of 6!'
            }]
          },
          confirmPassword: {
            identifier: 'confirmPassword',
            rules: [{
              type: 'match[password]',
              prompt: 'Passwords do not match!'
            }]
          },
          phone: {
            identifier: 'phone',
            rules: [{
              type: 'empty',
              prompt: 'Enter your phone #'
            },
            {
              type: 'minLength[10]',
              prompt: 'Min length of 10'
            }]
          }
        },
        inline: true,
      });
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

    render() {
      return (
      <div className="register ui middle aligned center aligned grid custom-bg map">
          <div className="column">
              <form id="registerForm" className="ui form" ref="registerForm">
                <div className="ui raised segment transparent-bg">
                  <h2 className="ui blue header">
                    <div className="content">
                      On your marks! Get set! Puzzles!
                    </div>
                  </h2>
                  <div className="two fields">
                    <div className="field">
                      <input type="text" name="firstname" placeholder="First Name" autoComplete="off" defaultValue={this.state.firstname}/>
                    </div>
                    <div className="field">
                      <input type="text" name="lastname" placeholder="Last Name" autoComplete="off" defaultValue={this.state.lastname}/>
                    </div>
                  </div>
                  <div className="two fields">
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input type="text" name="username" placeholder="WWU Username" autoComplete="off" defaultValue={this.state.username}/>
                      </div>
                    </div>
                    <div className="field">
                      <select name="userType" className="ui fluid dropdown">
                        <option value="student">Student</option>
                        <option value="faculty">Faculty/ Staff</option>
                      </select>
                    </div>
                  </div>
                  <div className="two fields">
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input type="password" name="password" placeholder="Password" autoComplete="off" defaultValue={this.state.password}/>
                      </div>
                    </div>
                    <div className="field">
                      <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" autoComplete="off" defaultValue={this.state.confirmPassword}/>
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <input className="ui input" name="phone" placeholder="Phone Number" defaultValue={this.state.phone} />
                  </div>
                  <div className="field">
                    <input className="ui input" name="major" placeholder="Major / Department / Field of Interest" defaultValue={this.state.major}/>
                  </div>

                  <div className="field">
                    <label>Want an awesome T-Shirt?</label>
                    <a target="_blank" href="http://commerce.cashnet.com/GreatPuzzleHunt2016" className="ui fluid right labeled icon button">
                      <i className="shop icon"></i>
                      Order your Puzzle Master T-Shirt!
                    </a>
                  </div>

                  <input className="ui fluid large blue submit button" type="submit" value="Join" />
                </div>
              </form>

              <div className="ui message transparent-bg">
                <a href="/login">Log In</a>
              </div>
          </div>
      </div>);
    }
});
