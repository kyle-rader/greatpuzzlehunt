import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react';
import { Grid, Button, Icon } from 'semantic-ui-react';

import AdminUserEdit from './admin-user-edit';
import Actions from './actions';

class AdminUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false
    };
  }

  render() {
    return (
      <Grid.Row>
        <Grid.Column computer={3} mobile={16}>
          <Actions
            onEdit={() => this._toggleEdit()}
            onPasswordReset={(e) => this._sendPasswordReset(e)}
            onEmailResend={() => console.log(`email resend: ${this.props.user.name}`)}
            onDelete={() => console.log(`delete: ${this.props.user.name}`)}
          />
        </Grid.Column>
      </Grid.Row>
    );
  }

  _toggleEdit() {
    this.setState({ editMode: !this.state.editMode });
  }

  _sendPasswordReset(event) {

    if (!confirm(`Confirm Send Password Reset for "${this.props.user.name}" ?`))
      return;

    const btn = $(event.target);

    Meteor.call('userAdminResetPassword', { _id: this.props.user._id }, (err, result) => {
      if (err) {
        console.log(err);
        btn.attr('data-content', 'Failed to send password reset email! 😰');
      } else {
        btn.attr('data-content', 'Password Reset Email Sent! 😀');
      }

      btn.popup({
        on: 'manual'
      }).popup('show');

      Meteor.setTimeout(() => {
        btn.popup('hide');
      }, 2500);
    });
  }

  saveUser(event) {
    const firstname = this.refs.firstname.value;
    const lastname = this.refs.lastname.value;
    const username = this.refs.username.value;
    const email = this.refs.email.value;

    console.log(`Tryin to save \nfirst:${firstname}\nlast:${lastname}\nUsername:${username} \nEmail:${email} `);

    const btn = $(event.target);

    Meteor.call('userAdminUpdate', {
        _id: this.props.user._id,
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email
    }, (err, result) => {
      if (err) {
        console.log(err);
        btn.attr('data-content', 'Failed to save user! 😰');
      } else {
        btn.attr('data-content', `${firstname} saved! 😀`);
      }

      btn.popup({
        on: 'manual'
      }).popup('show');
      setTimeout(() => {
        btn.popup('hide');
      }, 3000);
    });
    this.setState({ editMode: false });
  }

  verifyEmail(event) {

    if (!confirm(`Are you sure you want to resend enrollment email for ${this.props.user.email}?`))
      return;

    const btn = $(event.target);

    Meteor.call('user.resendEnrollmentEmail', this.props.user.username, (err, result) => {
      if (err) {
        console.log(err);
        btn.attr('data-content', 'Send Failed! 😰');
      } else {
        btn.attr('data-content', 'Enrollment Email Sent! 😀');
      }

      btn.popup({
        on: 'manual'
      }).popup('show');
      setTimeout(() => {
        btn.popup('hide');
      }, 3000);
    });
  }

  toggleVolunteer(event) {

    if(!confirm(`Are you sure you want to toggle ${this.props.user.name} as a Volunteer?`))
      return;

    const btn = $(event.target);

    Meteor.call('userPromoteToVolunteer', {_id: this.props.user._id}, (err, result) => {
      if (err) {
        console.log(err);
        btn.attr('data-content', 'Toggle Failed! 😰');
      } else {
        btn.attr('data-content', `${this.props.user.firstname} toggled! 😀`);
      }

      btn.popup({
        on: 'manual'
      }).popup('show');
      setTimeout(() => {
        btn.popup('hide');
      }, 3000);
    });
  }


  deleteUser(event) {
    if (!confirm(`Are you sure you want to DELETE ${this.props.user.name}!?!?`))
        return;

    let btn = $(event.target);

    Meteor.call('userAdminDelete', {
        _id: this.props.user._id
    }, (err, result) => {
        if (err) {
            console.log(err);
            btn.attr('data-content', 'Failed to delete user! 😰');
        } else {
            btn.attr('data-content', 'Deleted! 😀');
        }

        btn.popup({
            on: 'manual'
        }).popup('show');
        setTimeout(() => {
            btn.popup('hide');
        }, 3000);
    });
  }

  getName() {
    const user = this.props.user;
    if (!this.state.editMode) return <td>{ user.name }</td>;

    return (
      <td>
        <div className="ui small form">
          <div className="field">
            <input ref="firstname" type="text" defaultValue={this.props.user.firstname}/>
          </div>
          <div className="field">
            <input ref="lastname" type="text" defaultValue={this.props.user.lastname}/>
          </div>
        </div>
      </td>
    );
  }

  getUsername() {
    const user = this.props.user;
    if (!this.state.editMode) return <td>{ this.props.user.username }</td>;

    return (
      <td>
        <div className="ui small fluid input">
          <input ref="username" type="text" defaultValue={this.props.user.username}/>
        </div>
      </td>
    );
  }

  getEmail() {
    const user = this.props.user;
    const verified = user.getEmail() ? user.emails[0].verified : false;
    const email = user.getEmail() || user.email;
    if (this.state.editMode) {
      return (
        <td>
          <div className="ui small fluid input">
            <input ref="email" type="text" defaultValue={ email }/>
          </div>
        </td>
      );
    } else {
      const verifyBtn = !verified ? <div className="ui right floated yellow basic tiny compact icon button" title="Send Verification Email" onClick={this.verifyEmail.bind(this)}><i className="send icon"></i></div> : null;
      const rolesBtn = (
        <div className={`ui right floated ${user.roles.indexOf('volunteer') >= 0 ? 'yellow' : 'gray'} basic tiny compact icon button`} title="Toggle Volunteer Role" onClick={this.toggleVolunteer.bind(this)}>
          <i className="heart icon"></i>
        </div>
      );

      return (
        <td className={verified ? 'positive' : 'negative'}>
          { rolesBtn }
          { verifyBtn }
          { email } &nbsp;
        </td>
      );
    }
  }

  componentWillReceiveProps() {
    this.setState({ editMode: false });
  }

  // render() {
  //   const user = this.props.user;
  //   return (
  //     <tr>
  //       {this.getName()}
  //       {this.getUsername()}
  //       {this.getEmail()}
  //         <td className={!!user.teamId ? 'positive' : 'negative'}>{!!user.teamId ? 'Yes' : 'No'}</td>
  //         <td>
  //           <div className="ui three icon tiny compact buttons">
  //             {this.getEditButton()}
  //             <div className="ui orange basic button" title="Reset Password" onClick={this.resetPassword.bind(this)}>
  //               <i className="icons">
  //                 <i className="lock icon"></i>
  //                 <i className="corner refresh icon"></i>
  //               </i>
  //             </div>
  //             <div className="ui red basic button" title="Delete User" onClick={this.deleteUser.bind(this)}><i className="trash icon"></i></div>
  //           </div>
  //         </td>
  //     </tr>
  //   );
  // }
}

AdminUser.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminUser;
