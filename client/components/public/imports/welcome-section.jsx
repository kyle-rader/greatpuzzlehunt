import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Segment, Button, Icon, List, Embed } from 'semantic-ui-react';
import LinkButton from '../../imports/link-button';
import RowBuffer from './row-buffer';
import Video from './video';

export default class WelcomeSection extends Component {
  render() {
    return (
      <Grid padded stackable stretched className="filling">

        <Grid.Row>
          <Grid.Column className='dark-blue'>
            <Segment basic>
              <h1>Grab Some Friends and Have an Adventure!</h1>
              <h2>Solve Puzzles and Win Prizes!</h2>
              { this._linkButtons() }
            </Segment>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={6} className='dark-blue'>
            { this._infoList() }
          </Grid.Column>
          <Grid.Column width={10} className='dark-blue'>
            <Video videoId="LYzpNT-vX7s" source="youtube"/>
          </Grid.Column>
        </Grid.Row>
        <RowBuffer/>
      </Grid>
    );
  }

  _linkButtons() {
    return (
    <div>
      <LinkButton to='/register' size='large' color='green' content='Register'/>
      <LinkButton to="/login" size='large' color='blue' content='Log In'/>
      <LinkButton to="/faq" size='large' color='orange' content='FAQ'/>
      <LinkButton as='a'
        href="https://alumni.wwu.edu/greatpuzzlehunt"
        size='large' color='violet' content='Donate'
        icon={<Icon name='heart'/>}
      />
    </div>
    )
  }

  _infoList() {
    return (
    <Segment basic>
      <List relaxed size='large'>
        <List.Item>
          <Icon size='large' name='calendar'/>
          <List.Content>
            April 14, 2018 &nbsp;|&nbsp; 10:00 AM
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size='large' name='marker'/>
          <List.Content className="white">
            Western Washington University<br/>
            516 High Street<br/>
            Bellingham, WA 98225<br/><br/>
            <Button as='a' size='tiny' className="white button" icon='location arrow' labelPosition='right' content='Google Maps' target="_blank" href="https://www.google.com/maps/place/Western+Washington+University/@48.738511,-122.4878197,17z/data=!3m1!4b1!4m5!3m4!1s0x5485a3ca4cc915cd:0xa84926de4cbaf2c0!8m2!3d48.738511!4d-122.485631"/>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size='large' name='photo'/>
          <List.Content className="white">
            Photo Credit<br/><br/>
            <Button as='a' size='tiny' className="white button" content='Gabrielle Poncz Photography' target="_blank" href="http://www.gabrielleponcz.com/"/>
          </List.Content>
        </List.Item>
        <List.Item>
          <Icon size='large' name='ticket'/>
          <List.Content className="white">
            <p>Prices TBA</p>
          </List.Content>
        </List.Item>
      </List>
    </Segment>
    )
  }
}
