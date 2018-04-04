import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import {
  Segment,
  Header,
  Form,
  Button,
  Icon,
  List,
  Dropdown,
  Message,
} from 'semantic-ui-react';
import { pick } from 'lodash';

const { eventYear, eventDate } = Meteor.settings.public;

const accountTypeOptions = [
  { key: 'student', value: 'STUDENT', text: 'Student (currently enrolled in any school)' },
  { key: 'nonstudent', value: 'NONSTUDENT', text: 'Non-Student (not currently enrolled)' },
  { key: 'volunteer', value: 'VOLUNTEER', text: 'Volunteer (does not play in game)' },
];

const USER_FIELDS = [
  '_id', 'firstname', 'lastname', 'email', 'accountType',
  'phone', 'age', 'address', 'city', 'zip', 'state', 'ecName', 'ecRelationship', 'ecPhone', 'ecEmail', 'parentGuardian',
  'photoPermission',
];

class AdminUserEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = this._stateFromProps(props);
  }

  _stateFromProps(props) {
    return _.pick(props.user, USER_FIELDS);
  }

  componentWillReceiveProps(props) {
    this.setState(this._stateFromProps(props));
  }

  render() {
    const user = _.pick(this.state, USER_FIELDS);
    return (
      <Form onSubmit={(e) => this._update(e)}>

        {this._errorMessage()}

        <Header as='h3' icon={<Icon name='user' color='blue' />} content='Player Details' subheader='This information is required in the case of emergency.' />

        <Form.Group widths='equal'>
          <Form.Input name='firstname' label='First Name' placeholder='First Name' value={user.firstname} onChange={(e) => this._handleTextChange(e)} />
          <Form.Input name='lastname' label='Last Name' placeholder='Last Name' value={user.lastname} onChange={(e) => this._handleTextChange(e)} />
          <Form.Dropdown name='accountType' label='Account Type' placeholder='Account Type' selection options={accountTypeOptions} value={user.accountType} onChange={(e, data) => this._handleDataChange(e, data)} />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='email' type='email' label='Email' placeholder='your@email.com' value={user.email} onChange={(e) => this._handleTextChange(e)} />
          <Form.Input name='phone' type='tel' label='Phone' placeholder='Your digits' value={user.phone} onChange={(e) => this._handleTextChange(e)} />
          <Form.Input name='age' type='text' label='Age' placeholder='Number of revolutions around sun' value={user.age} onChange={(e) => this._handleTextChange(e)} />
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='address' type='text' label='Mailing Address' placeholder='Your mail goes here' value={user.address} onChange={(e) => this._handleTextChange(e)} />
          <Form.Input name='city' type='text' label='City' placeholder='Where you hail from' value={user.city} onChange={(e) => this._handleTextChange(e)} />
          <Form.Input name='zip' label='Zip Code' placeholder='Those 5 digits in particular' value={user.zip} onChange={(e) => this._handleTextChange(e)} />
          <Form.Input name='state' label='State' value={user.state} onChange={(e) => this._handleTextChange(e)} />
        </Form.Group>

        <Form.Checkbox
          toggle
          defaultChecked={user.photoPermission}
          name='photoPermission'
          label="User photo/video permission"
          onChange={(e, data) => this._handleDataChange(e, data)} />

        <Header as='h3' icon={<Icon name='ambulance' color='red' />} content='Emergency Contact' subheader='This information is required in the case of emergency.' />

        <Form.Group widths='equal'>
          <Form.Input name='ecName' label='Full Name' placeholder='Emergency Contact' value={user.ecName} onChange={(e) => this._handleTextChange(e)} />
          <Form.Input name='ecRelationship' label='Relationship' placeholder='How you know this person' value={user.ecRelationship} onChange={(e) => this._handleTextChange(e)} />
          <Form.Input name='ecPhone' label='Phone' placeholder='A phone they will answer' value={user.ecPhone} onChange={(e) => this._handleTextChange(e)} />
          <Form.Input name='ecEmail' label='Email' placeholder='A reliable email' value={user.ecEmail} onChange={(e) => this._handleTextChange(e)} />
        </Form.Group>

        <Form.Input
          name='parentGuardian'
          type='text'
          label="Parent/Guardian accompanying player if under the age of 14"
          placeholder='Full name of legal parent/guardian'
          value={this.state.parentGuardian || ""}
          onChange={(e) => this._handleTextChange(e)} />

        <Form.Button fluid type='submit' content='Update' color='green' />
      </Form>
    );
  }

  _update(e) {
    e.preventDefault();
    const userData = _.pick(this.state, USER_FIELDS);

    // One call to update normal string fields
    Meteor.call('admin.user.update', userData, (error, result) => {
      if (error) return this.setState({ error });
      this.setState({ error: null });
      alert(`${userData.firstname} ${userData.lastname} saved!`);
    });

    // One call to update normal string fieldss
    const emailData = {
      userId: userData._id,
      newEmail: userData.email,
    };

    if (userData.email !== this.props.user.email) {
      Meteor.call('admin.user.updateEmail', emailData, (error, result) => {
        if (error) return this.setState({ error });
        this.setState({ error: null });
        alert(`${userData.firstname} ${userData.lastname} email updated to ${emailData.newEmail}`);
      });
    }
  }

  _handleTextChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _handleDataChange(e, data) {
    const { name, value, checked } = data;
    this.setState({ [name]: value || checked });
  }

  _errorMessage() {
    if (!this.state.error) return null;
    return <Message negative
      icon='warning'
      title='There were issues registering!'
      content={this.state.error.reason}
      onDismiss={(e) => this.setState({ error: null })} />
  }
}

export default AdminUserEditForm;
