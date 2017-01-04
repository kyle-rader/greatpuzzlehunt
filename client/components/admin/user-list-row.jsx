import React from 'react';
import { Meteor } from 'meteor/meteor';

AdminUserListRow = class UserListRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false
        };
    }

    enableEdit(user) {
        this.setState({editMode: true});
    }

    saveUser(event) {
        let firstname = this.refs.firstname.value;
        let lastname = this.refs.lastname.value;
        let username = this.refs.username.value;
        let email = this.refs.email.value;

        console.log(`Tryin to save \nfirst:${firstname}\nlast:${lastname}\nUsername:${username} \nEmail:${email} `);

        let btn = $(event.target);

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
        this.setState({editMode: false});
    }

    verifyEmail(event) {

        if (!confirm(`Are you sure you want to email ${this.props.user.emails[0].address}?`))
            return;

        let btn = $(event.target);

        Meteor.call('userAdminVerifyEmail', {
            _id: this.props.user._id
        }, (err, result) => {
            if (err) {
                console.log(err);
                btn.attr('data-content', 'Send Failed! 😰');
            } else {
                btn.attr('data-content', 'Verification Email Sent! 😀');
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
        
        if(!confirm(`Are you sure you want to toggle ${this.props.user.profile.displayname} as a Volunteer?`))
            return;

        let btn = $(event.target);

        Meteor.call('userPromoteToVolunteer', {_id: this.props.user._id}, (err, result) => {
            if (err) {
                console.log(err);
                btn.attr('data-content', 'Toggle Failed! 😰');
            } else {
                btn.attr('data-content', `${this.props.user.profile.firstname} toggled! 😀`);
            }

            btn.popup({
                on: 'manual'
            }).popup('show');
            setTimeout(() => {
                btn.popup('hide');
            }, 3000);
        });
    }

    resetPassword(event) {

        if (!confirm(`Are you sure you want to reset the password for ${this.props.user.profile.displayname}?`))
            return;

        let btn = $(event.target);

        Meteor.call('userAdminResetPassword', {
            _id: this.props.user._id
        }, (err, result) => {
            if (err) {
                console.log(err);
                btn.attr('data-content', 'Failed to send password reset email! 😰');
            } else {
                btn.attr('data-content', 'Password Reset Email Sent! 😀');
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
        if (!confirm(`Are you sure you want to DELETE ${this.props.user.profile.displayname}!?!?`))
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
        let user = this.props.user;
        if (this.state.editMode) {
            return (
            <td>
                <div className="ui small form">
                    <div className="field">
                        <input ref="firstname" type="text" defaultValue={this.props.user.profile.firstname}/>
                    </div>
                    <div className="field">
                        <input ref="lastname" type="text" defaultValue={this.props.user.profile.lastname}/>
                    </div>
                </div>
            </td>);

        } else {
            return (
            <td>
                {user.profile.displayname}
                {(user.emails[0].address.indexOf('@wwu.edu') >= 0) ? <i className="blue right floated university icon"></i> : null} 
            </td>);
        }
    }

    getUsername() {
        let user = this.props.user;
        if (this.state.editMode) {
            return (
            <td>
                <div className="ui small fluid input">
                    <input ref="username" type="text" defaultValue={this.props.user.username}/>
                </div>
            </td>);
        } else {
            return (
            <td>{this.props.user.username}</td>);
        }
    }

    getEmail() {
        let user = this.props.user;
        if (this.state.editMode) {
            return (
            <td>
                <div className="ui small fluid input">
                    <input ref="email" type="text" defaultValue={this.props.user.emails[0].address}/>
                </div>
            </td>);
        } else {
            let verifyBtn = !user.emails[0].verified ? <div className="ui right floated yellow basic tiny compact icon button" title="Send Verification Email" onClick={this.verifyEmail.bind(this)}><i className="send icon"></i></div> : null;

            let rolesBtn = (
                <div className={`ui right floated ${user.roles.indexOf('volunteer') >= 0 ? 'yellow' : 'gray'} basic tiny compact icon button`} title="Toggle Volunteer Role" onClick={this.toggleVolunteer.bind(this)}>
                    <i className="heart icon"></i>
                </div>
            );
            return (
                <td className={user.emails[0].verified ? 'positive' : 'negative'}>
                    {rolesBtn}
                    {verifyBtn}
                    {user.emails[0].address} &nbsp;
                </td>
            );
        }
    }

    getEditButton() {
        let user = this.props.user;
        if (this.state.editMode) {
            return (<div ref="editBtn" className="ui green basic button" title="Edit User" onClick={this.saveUser.bind(this)}><i className="save icon"></i></div>);
        } else {
            return (<div ref="editBtn" className="ui green basic button" title="Save User" onClick={this.enableEdit.bind(this)}><i className="pencil icon"></i></div>);
        }
    }

    componentWillReceiveProps() {
        this.setState({editMode: false});
    }

    render() {
        let user = this.props.user;
        return (
        <tr>

            {this.getName()}
            {this.getUsername()}
            {this.getEmail()}

            <td className={!!user.profile.teamId ? 'positive' : 'negative'}>{!!user.profile.teamId ? 'Yes' : 'No'}</td>
            
            <td>
                <div className="ui three icon tiny compact buttons">
                    {this.getEditButton()}
                    <div className="ui orange basic button" title="Reset Password" onClick={this.resetPassword.bind(this)}>
                        <i className="icons">
                            <i className="lock icon"></i>
                            <i className="corner refresh icon"></i>
                        </i>
                    </div>
                    <div className="ui red basic button" title="Delete User" onClick={this.deleteUser.bind(this)}><i className="trash icon"></i></div>
                </div>
            </td>
        </tr>
        
        );
    }
}

AdminUserListRow.propTypes = {
    user: React.PropTypes.object
};
