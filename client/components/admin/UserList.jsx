import React from 'react';
import { Meteor } from 'meteor/meteor';
import UserListRow from './UserListRow.jsx';

export default class UserList extends React.Component {

    getUserList() {
        return this.props.users.map((user) => {
            return (
            <UserListRow user={user} key={user._id}/>
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

    componentDidMount() {

    }

    render() {
        return (
        <table className="ui compact celled table">
            <thead className="full-width">
                <tr>
                    <th colSpan="5">
                        <div className="ui grid">
                            <div className="three wide column">
                                <div className="ui large green fluid label">
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
                                <div className="ui teal fluid button">Bulk Email</div>
                            </div>
                        </div>
                    </th>
                </tr>
            </thead>
            <thead className="full-width">
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
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