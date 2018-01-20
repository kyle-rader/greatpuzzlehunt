import React, { Component } from 'react';
import LinkButton from '../../imports/link-button';
import { Grid, Card, Container, Segment, Header, Button, Icon, Image } from 'semantic-ui-react';
export default class HomeHeader extends Component {
  render() {
    return (

      <section className="pattern-bg" id="home-header">
      <Grid stackable>
        <Grid.Row className="header-wrap">
          <Grid.Column width={9}>
            <img className="header-magnyfying-glass" src="/img/header-magnifying-glass.png"/>
          </Grid.Column>
          <Grid.Column verticalAlign="middle" width={6}>
            <Container>
              <h1 className="header-text text-highlight-color">Third Annual</h1>
              <h1 className="header-text gigantic">WWU</h1>
              <h1 className="header-text gigantic">Great</h1>
              <h1 className="header-text gigantic">Puzzle</h1>
              <h1 className="header-text gigantic">Hunt</h1>
            </Container>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered divided>
            <Grid.Column verticalAlign="middle" width={4}>
              <h2 className="sub-header-text">
                Saturday April 3rd 2018
              </h2>

            </Grid.Column>
            <Grid.Column verticalAlign="middle" width={4}>
              Western Washington University<br/>
            516 High Street<br/>
            Bellingham, WA 98225<br/>
            </Grid.Column>
        </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={8}>
          { this._linkButtons() }
        </Grid.Column>
      </Grid.Row>
      </Grid>
    </section>
    );
  }

  _linkButtons() {
    return (
    <div>
      <LinkButton to='/register' size='large' color='blue' content='Register'/>
      <LinkButton to="/login" size='large' content='Log In'/>
      <LinkButton to="/info" size='large' content='More Info'/>
      <LinkButton as='a' href="https://alumni.wwu.edu/greatpuzzlehunt"
        size='large' color='blue' content='Donate'
        icon={<Icon name='heart'/>}
      />
    </div>
    )
  }
}
