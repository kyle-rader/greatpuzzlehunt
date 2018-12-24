import React, {PropTypes} from 'react';
import { Grid, Button, Header } from 'semantic-ui-react';

const { phone } = Meteor.settings.public.contact;

export default class ICEContact extends React.Component {
  render() {
    return (
      <Grid>
        <Grid.Row columns='1'>
          <Grid.Column>
            <Header as='h2' content='In Game Contact' subheader='(For emergency or reporting unsportsmanlike behavior)'/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns='3'>
          <Grid.Column>
            <Button fluid as='a' color='blue' content={'Call: ' + phone} href={"tel:" + phone} />
          </Grid.Column>
          <Grid.Column>
            <Button fluid as='a' color='orange' content={'Text: ' + phone} href={"sms:" + phone} />
          </Grid.Column>
          <Grid.Column>
            <Button fluid as='a' color='green' content='Email' href="mailto:support@greatpuzzlehunt.com"/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
