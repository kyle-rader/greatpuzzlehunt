import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Segment,
  Header,
  Form,
  Button,
  Icon,
  List,
  Dropdown,
  Message,
} from 'semantic-ui-react';

import GamestateComp from '../../imports/gamestate-comp';

const { eventYear, eventDate } = Meteor.settings.public;

const accountTypeOptions = [
  { key: 'student', value: 'STUDENT', text: 'Student (currently enrolled in any school)' },
  { key: 'nonstudent', value: 'NONSTUDENT', text: 'Non-Student (not currently enrolled)' },
  { key: 'volunteer', value: 'VOLUNTEER', text: 'Volunteer (does not play in game)' },
];

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'register',
      email: '',
      firstname: '',
      lastname: '',
      accountType: '',
      password: '',
      confirmPassword: '',
      coords: '',
      photoPermission: true,
      holdHarmless: false,
      showHoldHarmless: false,
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
      case 'loading':
        return <Loading />;
      case 'thankyou':
        return this._thankyou();
      default:
        return this._form();
    }
  }

  _thankyou() {
    return (
      <Segment basic>
        <Message icon>
          <Icon name='mail' color='green'/>
          <Message.Content>
            <Header as='h3'>Thank you for registering!<br/></Header>
            <p>We've sent a verification email to <strong>{ this.state.email }</strong>. Go check your email!</p>
            <p>You must click the verificiation link in that email before you can log in.</p>
          </Message.Content>
        </Message>

        <RegistrationProcess currentStep={1} />
      </Segment>
    );
  }

  _form() {
    return (
      <Form onSubmit={ (e) => this._register(e) } style={ this._formStyle() }>

        <Header as='h1' icon={<Icon name='user' color='green'/>} content={`Register for the ${eventYear} Great Puzzle Hunt`} subheader={`Event date: ${eventDate} at Western Washington University, Bellingham, WA`}/>

        <Form.Group widths='equal'>
          <Form.Input name='firstname' label='First Name' placeholder='First Name' value={ this.state.firstname } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='lastname' label='Last Name' placeholder='Last Name' value={ this.state.lastname } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='email' type='email' label='Email' placeholder='your@email.com' value={ this.state.email } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Dropdown name='accountType' label='Account Type' placeholder='Account Type' selection options={accountTypeOptions} value={ this.state.accountType } onChange={ (e, data) => this._handleDataChange(e, data) }/>
        </Form.Group>

        <Form.Group widths='equal'>
          <Form.Input name='password' type='password' label='Password' placeholder='password' value={ this.state.password } onChange={ (e) => this._handleTextChange(e) }/>
          <Form.Input name='confirmPassword' type='password' label='Confirm Password' placeholder='password again' value={ this.state.confirmPassword } onChange={ (e) => this._handleTextChange(e) }/>
        </Form.Group>

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
          label='By checking this box I acknowledge that I have read and understand the Risk & Hold Harmless Agreement and that I am either 18+ years old or a WWU student or the parent/guardian of a minor participant.'
          onChange={ (e,data) => this._handleDataChange(e,data) }
        />
        <List>
          <List.Item><strong>Participants under age 18:</strong> A parent/legal guardian must complete this registration form on their behalf on their minor.</List.Item>
          <List.Item><strong>Participants under age 14:</strong> In addition to registering their minor, a parent/legal guardian must also register and join the same team as their under age 14 child and accompany them at all times during the Puzzle Hunt.</List.Item>
        </List>

        <Form.Button fluid type='submit' content='Register' color='green'/>

        { this._errorMessage() }

        <RegistrationProcess currentStep={0} />

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

    this.setState({ mode: 'loading' });

    Meteor.call('user.register', data, (error, result) => {
      if (error) return this.setState({ error, mode: 'register' });
      this.setState({ error: null, result, mode: 'thankyou' });
    });
  }

  _registrationData() {
    const { firstname, lastname, email, accountType, password, confirmPassword, coords, photoPermission, holdHarmless } = this.state;
    return {
      firstname,
      lastname,
      email,
      accountType,
      password,
      confirmPassword,
      coords,
      photoPermission,
      holdHarmless,
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
        <p>I hereby acknowledge that I have voluntarily chosen (or voluntarily chosen to allow my minor child) to participate in the  {eventYear} WWU Great Puzzle Hunt sponsored by the WWU Mathematics Department, held on {eventDate} (hereinafter referred to as “Puzzle Hunt”).  I understand the risks involved in the Puzzle Hunt, including the unlikely but potential risk of injury to me (or my minor child), and I agree to accept any and all risks associated with my participation.</p>
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

export default GamestateComp(RegisterForm);
