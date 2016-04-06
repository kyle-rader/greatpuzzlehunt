import React from 'react';

export default class UserList extends React.Component {

    getUserList() {
        return this.props.users.map((user) => {
            return (
            <tr key={user._id}>
                <td>{user.profile.displayname}</td>
                <td>
                    {user.emails[0].address} &nbsp;
                    {(user.emails[0].address.indexOf('@wwu.edu') >= 0) ? (<i className="inline university icon"></i>) : null}
                </td>
                <td className={user.emails[0].verified ? 'positive' : 'negative'}>{user.emails[0].verified ? 'Yes' :'No'}</td>
                <td className={!!user.profile.teamId ? 'positive' : 'negative'}>{!!user.profile.teamId ? 'Yes' : 'No'}</td>
                <td>
                    <div className="ui tiny button">Edit</div>
                    <div className="ui tiny button">Reset Password</div>
                </td>
            </tr>
            );
        });
    }

    search(event) {
        let search = event.target.value;
        // $(this.refs.userlist).find('tr').each(() => {
        //     console.log(elem);
        // });
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
                    <th></th>
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