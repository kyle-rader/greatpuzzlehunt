import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Form, Button, Icon, List, Message } from 'semantic-ui-react';

const STATES = [
  { key: 'WA', text: 'WA', value: 'WA' },
  { key: 'AL', text: 'AL', value: 'AL' },
  { key: 'AK', text: 'AK', value: 'AK' },
  { key: 'AS', text: 'AS', value: 'AS' },
  { key: 'AZ', text: 'AZ', value: 'AZ' },
  { key: 'AR', text: 'AR', value: 'AR' },
  { key: 'CA', text: 'CA', value: 'CA' },
  { key: 'CO', text: 'CO', value: 'CO' },
  { key: 'CT', text: 'CT', value: 'CT' },
  { key: 'DE', text: 'DE', value: 'DE' },
  { key: 'DC', text: 'DC', value: 'DC' },
  { key: 'FM', text: 'FM', value: 'FM' },
  { key: 'FL', text: 'FL', value: 'FL' },
  { key: 'GA', text: 'GA', value: 'GA' },
  { key: 'GU', text: 'GU', value: 'GU' },
  { key: 'HI', text: 'HI', value: 'HI' },
  { key: 'ID', text: 'ID', value: 'ID' },
  { key: 'IL', text: 'IL', value: 'IL' },
  { key: 'IN', text: 'IN', value: 'IN' },
  { key: 'IA', text: 'IA', value: 'IA' },
  { key: 'KS', text: 'KS', value: 'KS' },
  { key: 'KY', text: 'KY', value: 'KY' },
  { key: 'LA', text: 'LA', value: 'LA' },
  { key: 'ME', text: 'ME', value: 'ME' },
  { key: 'MH', text: 'MH', value: 'MH' },
  { key: 'MD', text: 'MD', value: 'MD' },
  { key: 'MA', text: 'MA', value: 'MA' },
  { key: 'MI', text: 'MI', value: 'MI' },
  { key: 'MN', text: 'MN', value: 'MN' },
  { key: 'MS', text: 'MS', value: 'MS' },
  { key: 'MO', text: 'MO', value: 'MO' },
  { key: 'MT', text: 'MT', value: 'MT' },
  { key: 'NE', text: 'NE', value: 'NE' },
  { key: 'NV', text: 'NV', value: 'NV' },
  { key: 'NH', text: 'NH', value: 'NH' },
  { key: 'NJ', text: 'NJ', value: 'NJ' },
  { key: 'NM', text: 'NM', value: 'NM' },
  { key: 'NY', text: 'NY', value: 'NY' },
  { key: 'NC', text: 'NC', value: 'NC' },
  { key: 'ND', text: 'ND', value: 'ND' },
  { key: 'MP', text: 'MP', value: 'MP' },
  { key: 'OH', text: 'OH', value: 'OH' },
  { key: 'OK', text: 'OK', value: 'OK' },
  { key: 'OR', text: 'OR', value: 'OR' },
  { key: 'PW', text: 'PW', value: 'PW' },
  { key: 'PA', text: 'PA', value: 'PA' },
  { key: 'PR', text: 'PR', value: 'PR' },
  { key: 'RI', text: 'RI', value: 'RI' },
  { key: 'SC', text: 'SC', value: 'SC' },
  { key: 'SD', text: 'SD', value: 'SD' },
  { key: 'TN', text: 'TN', value: 'TN' },
  { key: 'TX', text: 'TX', value: 'TX' },
  { key: 'UT', text: 'UT', value: 'UT' },
  { key: 'VT', text: 'VT', value: 'VT' },
  { key: 'VI', text: 'VI', value: 'VI' },
  { key: 'VA', text: 'VA', value: 'VA' },
  { key: 'WV', text: 'WV', value: 'WV' },
  { key: 'WI', text: 'WI', value: 'WI' },
  { key: 'WY', text: 'WY', value: 'WY' },
];

export default class PromoRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'register',
      firstname: '',
      lastname: '',
      email: '',
      promocode: '',
      age: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      photoPermission: false,
      ecName: '',
      ecRelation: '',
      ecPhone: '',
      ecAltPhone: '',
    };
  }

  render() {
    switch (this.state.mode) {
      case 'thankyou':
        return this._thankyou();
      default:
        return this._form();
    }
  }

  _thankyou() {
    return (
      <Message icon>
        <Icon name='mail' color='green'/>
        <Message.Content>
          <Message.Header>Thank you for registering!<br/></Message.Header>
          We've sent you an email with a link to finish setting up your account!
        </Message.Content>
      </Message>
    );
  }

  _form() {
    return (
      <Form onSubmit={ (e) => this._register(e) } style={ this._formStyle() }>
        <h3><Icon name='user' color='green' size='big'/>Participant Info</h3>

        <Form.Group widths='equal'>
          <Form.Input name='firstname' label='First Name' placeholder='First Name' value={ this.state.firstname } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='lastname' label='Last Name' placeholder='Last Name' value={ this.state.lastname } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='email' label='Email' placeholder='youR@email.com' value={ this.state.email } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='promocode' label='Promo Code' placeholder='promo code' value={ this.state.promocode } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='age' label='Age' placeholder='##' value={ this.state.age } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='phone' label='Phone' placeholder='111-222-33333' value={ this.state.phone } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='address' label='Street Address' placeholder='12345 6th Ave' value={ this.state.address } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='zip' label='Zip Code' placeholder='12345' value={ this.state.zip } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='city' label='City' placeholder='City' value={ this.state.city } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Select name='state' label='State' options={ STATES } value={ this.state.state } onChange={ (e,data) => this._handleDataChange(e,data) }/>
        </Form.Group>

        <Form.Checkbox toggle name='photoPermission' label='Photo Permission (see below)' value={ this.state.promocode } onChange={ (e,data) => this._handleDataChange(e,data) }/>

        <h3><Icon name='first aid' color='red' size='big'/>Emergency Contact <small>(optional)</small></h3>
        <Form.Group widths='equal'>
          <Form.Input name='ecName' label='Name' placeholder='John' value={ this.state.ecName } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='ecRelation' label='Relationship' placeholder='parent' value={ this.state.ecRelation } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='ecPhone' label='Primary Phone' placeholder='111-222-3344' value={ this.state.ecPhone } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='ecAltPhone' label='Alternative Phone' placeholder='123-123-1234' value={ this.state.ecAltPhone } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Button type='submit' content='Register' color='green'/>
        <h3>Important Registration Information</h3>
        <List>
          <List.Item><strong>Participants under age 18 (minor child):</strong> A parent/legal guardian must complete this registration form on behalf of their minor child.</List.Item>
          <List.Item><strong>Participants under age 14:</strong> In addition to registering their minor child, a parent/legal guardian must also register as a member of a team with their under age 14 minor child and accompany them at all times during the Puzzle Hunt.</List.Item>
          <List.Item><strong>Purchase T-Shirts</strong> In addition to registering their minor child, a parent/legal guardian must also register as a member of a team with their under age 14 minor child and accompany them at all times during the Puzzle Hunt.</List.Item>
        </List>
      </Form>
    );
  }

  _formStyle() {
    return {
      maxWidth: '800px',
      marginRight: 'auto',
      marginLeft: 'auto',
    };
  }

  _register(e) {
    e.preventDefault();
    console.log('Going to register with:', this.state);
  }

  _handleTextChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  _handleDataChange(e, data) {
    const { name, value, checked } = data;
    // console.log(data);
    this.setState({ [name]: (value || checked) });
  }

  _handleCheckBoxChange(e) {
    const { name, value } = e.target;
    console.log(name, value);
  }

}
