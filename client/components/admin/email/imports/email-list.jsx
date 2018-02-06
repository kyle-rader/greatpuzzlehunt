import React, { Component, PropTypes } from 'react';
import { Segment } from 'semantic-ui-react';

class EmailList extends Component {
  render() {
    return (
      <Segment basic>
        <h3>{ this.props.title }</h3>
        <pre className='ui email-list'>
          First, Last, Email<br/>
          { this.printEmails() }
        </pre>
      </Segment>
    );
  }

  printEmails() {
    return this.props.emails.map(mapUser).join('\n');
  }
}

function mapUser({ firstname, lastname, email, emails, username }) {
  const e = email || emails[0].address;
  return `${firstname}, ${lastname}, ${e}`;
}

EmailList.PropTypes = {
  title: PropTypes.string.isRequired,
  emails: PropTypes.array.isRequired,
};

export default EmailList;
