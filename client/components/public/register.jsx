import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Header, Segment, Accordion, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router';

Register = class Register extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <br/>
        <Segment basic>
          <Header as='h1' icon={<Icon name='ticket' color='violet'/>} content='Register for the 2017 Great Puzzle Hunt!'/>
          <Button color='green' size='large' as='a' target='_blank' href='https://commerce.cashnet.com/GreatPuzzleHunt2017' content='Register Now' icon='shop' labelPosition='right'/>
        </Segment>

        <Segment basic>
          <Header as='h1' icon={<Icon name='help circle' color='red'/>} content='Registration FAQ'/>
          <Accordion styled>
            <Accordion.Title>
              <Icon name='caret right' size='large'/>
              Can I buy multiple participant registrations at once?
            </Accordion.Title>
            <Accordion.Content>
                Yes, you can. But you have to add each one to your basket individually.  We recommend you only do this if you know all the required info for each person you are registering.
            </Accordion.Content>

            <Accordion.Title>
              <Icon name='caret right' size='large'/>
              Do I have to buy T-Shirts while buying registration?
            </Accordion.Title>
            <Accordion.Content>
                No, you can buy T-Shirts at any time by clicking the "Register Now" button above and only selecting T-Shirts.
            </Accordion.Content>

          </Accordion>

        </Segment>
      </Container>
    );
  }
}
