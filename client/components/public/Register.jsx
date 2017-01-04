import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

// Define our login comp

Register = React.createClass({

    getInitialState() {
      return {
        err: null,
        newAccountEmail: null
      };
    },

    componentDidMount() {
      let form = $(this.refs.registerForm);
      // init dropdowns
      $('#registerForm .ui.dropdown').dropdown();

      // Init form validation and submission
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
        onSuccess: (event, fields) => {
          event.preventDefault();

          // Call Meteor method to create account.
          Meteor.call('userCreate', fields, (err, result) => {
            if(err) {
              this.setState({err: err});
            } else {
              this.setState({err: null, newAccountEmail: result.email});
            }
          });
        }
      });
    },

    getErrorMsg() {
      if (this.state.err) {
        return (
        <div className="ui error message">
          {this.state.err.reason}
        </div>);
      }
    },

    getSuccessMsg() {
      if (this.state.newAccountEmail) {
        return (
          <div className="ui success message">
            <h3>Welcome to the WWU Puzzle Hunt!</h3>
            <h4>A verification email has been sent to <strong>{this.state.newAccountEmail}</strong></h4>
            <a className="ui facebook button" target="_blank" href="https://www.facebook.com/events/160687404314460/">
              <i className="facebook icon"></i>
              Share
            </a>
          </div>);
      }
    },

    getForm() {
      if (!this.state.newAccountEmail) {
        return (
          <form id="registerForm" className="ui large form" ref="registerForm">
            <div className="ui raised segment transparent-bg">
              <h2 className="ui blue header">
                <div className="content">
                  Register
                </div>
              </h2>
              <div className="two fields">
                <div className="field">
                  <label className="text-left">First Name</label>
                  <input type="text" name="firstname" placeholder="eg. Kyle" autoComplete="off" defaultValue={this.state.firstname}/>
                </div>
                <div className="field">
                  <label className="text-left">Last Name</label>
                  <input type="text" name="lastname" placeholder="eg. Rader" autoComplete="off" defaultValue={this.state.lastname}/>
                </div>
              </div>
              <div className="two fields">
                <div className="field">
                  <label className="text-left">WWU Username</label>
                  <div className="ui left icon input">
                    <i className="user icon"></i>
                    <input type="text" name="username" placeholder="eg. raderk" autoComplete="off" defaultValue={this.state.username}/>
                  </div>
                  <small className="text-left">Same as My Western username</small>
                </div>
                <div className="field">
                  <label className="text-left">Email Type</label>
                  <select name="userType" className="ui fluid dropdown">
                    <option value="student">Student</option>
                    <option value="faculty">Faculty/ Staff</option>
                  </select>
                  <small className="text-left">Email extension is automatically added!</small>
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
                <a target="_blank" href="http://commerce.cashnet.com/GreatPuzzleHunt2016" className="ui wwu-btn fluid right labeled icon button">
                  <i className="shop icon"></i>
                  Order your Puzzle Master T-Shirt!
                </a>
              </div>

              <input className="ui fluid large blue submit button" type="submit" value="Join" />
            </div>
          </form>
        );
      }
    },

    // TODO: Remove Test Button
    setuptest() {
      let form = $(this.refs.registerForm);

      form.form('set values', {
        firstname: 'Kyle',
        lastname: 'Rader',
        username: 'kyle+raderk',
        password: 'testing',
        confirmPassword: 'testing',
        phone: '1231231234',
        major: 'computer science'
      });
    },

    render() {
      // <div className="ui message">
      //   <a className="ui button" onClick={this.setuptest}>Test</a>
      // </div>
      // return (
      // <div className="register ui middle aligned center aligned grid custom-bg red-square">
      //     <div className="column">

      //         {this.getForm()}
      //         {this.getSuccessMsg()}
      //         {this.getErrorMsg()}

      //         <div className="ui message">
      //           <Link to="/login">Log In</Link>
      //         </div>
      //     </div>
      // </div>);

      return (
      <Grid stackable columns="three" className="register middle aligned center aligned">
        <Grid.Row>
          <Grid.Column>
            <h2>Pre-Register and get notified as soon as registration opens!</h2>
            <Button color="blue" fluid size="huge" animated="fade" as="a" href="https://actionsprout.io/7E111B" target="_blank">
            <Button.Content visible>Pre-Register</Button.Content>
            <Button.Content hidden>
              <Icon name='share' />
              Get me on that list!
            </Button.Content>
          </Button>
          </Grid.Column>
          <Grid.Column><h2>Or</h2></Grid.Column>
          <Grid.Column>
            <h2>Be a part of the magic and volunteer at the event!</h2>
            <Button color="orange" fluid size="huge" animated="fade" as="a" href="https://actionsprout.io/A83570" target="_blank">
              <Button.Content visible>Volunteer</Button.Content>
              <Button.Content hidden>
                <Icon name='share' />
                Let's Do This!
              </Button.Content>
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>);
    }
});
