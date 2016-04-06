import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class UserList extends React.Component {

    editUser(user) {
        console.log(`Edit ${user.profile.displayname}`);
    }

    resetPassword(user) {
        console.log(`Reset ${user.profile.displayname}`);
    }

    deleteUser(user) {
        console.log(`Delete ${user.profile.displayname}`);
    }

    getUserList() {
        return this.props.users.map((user) => {
            return (
            <tr key={user._id}>
                <td>{user.profile.displayname} {(user.emails[0].address.indexOf('@wwu.edu') >= 0) ? (<i className="right floated blue university icon"></i>) : null}</td>
                <td>
                    {user.emails[0].address} &nbsp;
                </td>
                <td className={user.emails[0].verified ? 'positive' : 'negative'}>{user.emails[0].verified ? 'Yes' :'No'}</td>
                <td className={!!user.profile.teamId ? 'positive' : 'negative'}>{!!user.profile.teamId ? 'Yes' : 'No'}</td>
                <td>
                    <div className="ui three icon compact buttons">
                        <div className="ui green basic button" title="Edit User" onClick={this.editUser.bind(this, user)}><i className="pencil icon"></i></div>
                        <div className="ui orange basic button" title="Reset Password" onClick={this.resetPassword.bind(this, user)}><i className="refresh icon"></i></div>
                        <div className="ui red basic button" title="Delete User" onClick={this.deleteUser.bind(this, user)}><i className="trash icon"></i></div>
                    </div>
                </td>
            </tr>
            );
        });
    }

    search(event) {
        let search = event.target.value;
        let userList = $(this.refs.userlist);
        userList.find(`tr:contains(${search})`).each(function() {
            $(this).show();
        });
        userList.find(`tr:not(:contains(${search}))`).each(function() {
            $(this).hide();
        });
    }

    render() {
        return (
        <table className="ui compact celled table">
            <thead className="full-width">
                <tr>
                    <th colSpan="5">
                        <div className="ui grid">
                            <div className="three wide column">
                                <div className="ui large green label">
                                    <i className="user icon"></i>
                                    &nbsp;
                                    {this.props.users.length} Users
                                </div>
                            </div>
                            <div className="ten wide column">
                                <div className="ui fluid right icon input">
                                    <input type="text" placeholder="Search" onChange={this.search.bind(this)}/>
                                    <i className="search icon"></i>
                                </div>
                            </div>
                            <div className="three wide column">
                                <div className="ui teal button">Bulk Email</div>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <thead className="full-width">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Verified</th>
                    <th>Team</th>
                    <th>Actions</th>
                </tr>
            </thead>
          <tbody ref="userlist">
            {this.getUserList()}
          </tbody>
          <tfoot className="full-width">
            <tr>
              <th colSpan="5">
                
              </th>
            </tr>
          </tfoot>
        </table>
        );
    }
}

UserList.propTypes = {
    users: React.PropTypes.array,
    loading: React.PropTypes.bool,
};