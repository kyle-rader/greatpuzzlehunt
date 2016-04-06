import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class FloaterListRow extends React.Component {
  getName() {
      let user = this.props.user;
      return (
      <td>
          {user.profile.displayname}
          {(user.emails[0].address.indexOf('@wwu.edu') >= 0) ? <i className="blue right floated university icon"></i> : null}
      </td>
    );
  }

  getMajor() {
      return(<td>{this.props.user.profile.major}</td>);
  }

  getEmail() {
      let user = this.props.user;
      return (
          <td><a href="mailto:{user.emails[0].address}">{user.emails[0].address}</a></td>
      );
  }

  render() {
      let user = this.props.user;
      return (
      <tr>
          {this.getName()}
          {this.getMajor()}
          {this.getEmail()}
      </tr>
      );
  }
}

FloaterListRow.propTypes = {
    user: React.PropTypes.object
};
