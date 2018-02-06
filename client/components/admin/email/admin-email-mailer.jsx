import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Segment, Message } from 'semantic-ui-react';

AdminEmailMailer = class AdminEmailMailer extends Component {
  render() {
    return (
      <Segment basic>
        <PuzzlePageTitle title='Bulk Emailer'/>

        <Message info content='Coming Soon...'/>
        {/* <form ref="emailForm" className="ui segment form">
          <h3 className="ui header">Bulk Email</h3>
          <div className="fields">
            <div className="twelve wide field">
              <label>Subect</label>
              <input ref="subject" type="text" className="ui fluid input" />
            </div>
            <div className="four wide field">
              <label>Group</label>
              <select ref="role" className="ui dropdown">
                <option value="user">Users</option>
                <option value="volunteer">Volunteers</option>
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>
          <div className="field">
            <textarea ref="message" rows="6"></textarea>
          </div>
          <input type="submit" className="ui blue button" value="Send" onClick={(e) => this.sendEmail(e)}/>
        </form> */}
      </Segment>
    );
  }

  componentDidMount() {
    $(this.refs.role).dropdown();
    $(this.refs.emailForm).form();
  }

  sendEmail(event) {
    event.preventDefault();

    if (!confirm(`You are about to send a bulk email to everyone in the ${this.refs.role.value} group!`))
      return;

    const fields = {
      role: this.refs.role.value,
      subject: this.refs.subject.value,
      text: this.refs.message.value
    };

    const btn = $(event.target);

    Meteor.call('admin.bulkEmail', fields, (err, result) => {
      if (err) {
        console.log(err);
        btn.attr('data-content', 'Failed to send email! 😰');
      } else {
        btn.attr('data-content', `Bulk email sent! 😀`);
        $(this.refs.emailForm).form('reset');
      }

      btn.popup({
        on: 'manual'
      }).popup('show');
      setTimeout(() => {
        btn.popup('hide');
      }, 2500);
    });

  }

}
