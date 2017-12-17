import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Segment, Header, Form, Button, Icon, List, Message } from 'semantic-ui-react';

import GamestateComp from '../../imports/gamestate-comp';

class PromoRegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'register',
      email: '',
      firstname: '',
      lastname: '',
      ticketCode: '',
      coords: '',
      photoPermission: true,
      holdHarmless: false,
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((loc) => {
        this.setState({ coords: { longitude: loc.coords.longitude, latitude: loc.coords.latitude } });
      });
    }
  }

  render() {
    if (!this.props.ready) {
      return <Loading/>
    } else if (this.props.gamestate.registration) {
      return this._renderMain();
    } else {
      return <Message
        info
        header='Registration is closed'
        content='The 2018 Great Puzzle Hunt is now in development' />
    }
  }

  _renderMain() {
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
          <p>We've sent an email to { this.state.email } with a link to finish setting up your account!</p>
          <p>Once setup you will be able to join or create a team.</p>
        </Message.Content>
      </Message>
    );
  }

  _form() {
    return (
      <Form onSubmit={ (e) => this._register(e) } style={ this._formStyle() }>

        <Header as='h1' icon={<Icon name='user' color='green'/>} content='Register for the 2018 Great Puzzle Hunt'/>

        <Form.Input name='email' type='email' label='Email' placeholder='your@email.com' value={ this.state.email } onChange={ (e) => this._handleTextChange(e) }/>

        <Form.Group widths='equal'>
          <Form.Input name='firstname' label='First Name' placeholder='First Name' value={ this.state.firstname } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='lastname' label='Last Name' placeholder='Last Name' value={ this.state.lastname } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Input name='ticketCode' label='Ticket Code (Optional)' placeholder='ticket code' value={ this.state.ticketCode } onChange={ (e) => this._handleTextChange(e) }/>
        <Message color='yellow'>
          <Icon name='ticket' />
          <a href="" target="_blank">Buy Ticket Codes Here</a> and redeem now <strong>or after you register!</strong> <br/>
          Each player must register and redeem one ticket code before the game begins in order to play!
        </Message>

        <h3><Icon name='camera' color='violet' size='large'/>Photo Permission</h3>

        <Form.Checkbox
          toggle
          defaultChecked={true}
          name='photoPermission'
          label='I hereby give my permission to Western and the Great Puzzle Hunt to use my (or my minor child’s) image, in photo or video, in whole or in part, for public information and marketing of the WWU Great Puzzle Hunt at its discretion.'
          onChange={ (e,data) => this._handleDataChange(e,data) }
        />

        <h3><Icon name='pencil' color='orange' size='large'/>Acknowledgement of Risk & Hold Harmless Agreement</h3>

        { this._holdHarmlessButton() }
        { this._holdHarmless() }

        <Form.Checkbox
          toggle
          name='holdHarmless'
          label='By checking this box I acknowledge that I have read and understand the risk & hold harmless agreement and that I am either 18+ years old or a WWU student or the parent/ guardian of a minor participant.'
          onChange={ (e,data) => this._handleDataChange(e,data) }
        />

        <Form.Button type='submit' content='Register' color='green'/>

        { this._errorMessage() }
        <h3>Important Registration Information</h3>
        <List>
          <List.Item><strong>Participants under age 18 (minor child):</strong> A parent/legal guardian must complete this registration form on behalf of their minor child.</List.Item>
          <List.Item><strong>Participants under age 14:</strong> In addition to registering their minor child, a parent/legal guardian must also register as a member of a team with their under age 14 minor child and accompany them at all times during the Puzzle Hunt.</List.Item>
        </List>
      </Form>
    );
  }

  _formStyle() {
    return {
      maxWidth: '640px',
      marginRight: 'auto',
      marginLeft: 'auto',
    };
  }

  _register(e) {
    e.preventDefault();
    const data = this._registrationData();
    console.log('Going to register with:', data);

    Meteor.call('promo_codes.register', data, (error, result) => {
      if (error) return this.setState({ error });
      this.setState({ error: null, result, mode: 'thankyou' });
    });
  }

  _registrationData() {
    return {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      ticketCode: this.state.ticketCode,
      age: parseInt(this.state.age),
      phone: this.state.phone,
      zip: this.state.zip,
      photoPermission: this.state.photoPermission,
      holdHarmless: this.state.holdHarmless,
    };
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

  _holdHarmlessButton() {
    if (this.state.showHoldHarmless) {
      return <Button as='a' basic content='Hide Agreement' onClick={ (e) => this.setState({ showHoldHarmless: false }) }/>
    }
    else {
      return <Button as='a' basic content='Show Agreement' onClick={ (e) => this.setState({ showHoldHarmless: true }) }/>
    }
  }

  _holdHarmless() {
    if (!this.state.showHoldHarmless) return <p></p>;
    return (
      <Segment basic>
        <p>I hereby acknowledge that I have voluntarily chosen (or voluntarily chosen to allow my minor child) to participate in the WWU Great Puzzle Hunt 2017 sponsored by the WWU Mathematics Department, held on April 1, 2017 (hereinafter referred to as “Puzzle Hunt”).  I understand the risks involved in the Puzzle Hunt, including the unlikely but potential risk of injury to me (or my minor child), and I agree to accept any and all risks associated with my participation.</p>
        <p>In consideration of my (or my minor child’s) voluntary participation in the Puzzle Hunt, I agree to hold harmless Western Washington University, its officers, agents, volunteers, or employees from and against all financial loss, claim, suit, action, damage, or expense, arising out of my (or my minor child’s) participation, unless caused by the negligence or willful misconduct of the University, its officers, agents, volunteers, or employees.</p>
        <p>I understand that Western Washington University strongly recommends that participants have comprehensive health insurance that provides essential health benefits as required by the Affordable Care Act (ACA).</p>
        <p>I understand and acknowledge that a medical emergency may develop which necessitates the need for immediate medical treatment for a participant.  I hereby authorize Western and its officers, agents, volunteers or employees to arrange or provide any necessary emergency medical treatment on my (or my minor child’s) behalf.</p>
      </Segment>
    );
  }

  _errorMessage() {
    if (!this.state.error) return null;
    return <Message negative
      icon='warning'
      title='There were issues registering!'
      content={ this.state.error.reason }
      onDismiss={ (e) => this.setState({ error: null }) } />
  }
}

export default GamestateComp(PromoRegisterForm);
