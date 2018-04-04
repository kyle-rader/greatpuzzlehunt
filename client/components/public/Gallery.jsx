import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Button } from 'semantic-ui-react';

Gallery = class Gallery extends Component {

  render() {
    return (
      <Container>
        <PuzzlePageTitle title="Gallery" subTitle={<span>Photo Credit: <a href="http://www.gabrielleponcz.com/" target="_blank">Gabrielle Poncz</a></span>} />

        <Button as='a' href="https://www.gabrielleponcz.com/wwu-great-puzzle-hunt/" target="_blank" content="2016 Event Photos"/>
        <Button as='a' href="https://www.gabrielleponcz.com/puzzlehunt/" target="_blank" content="2017 Event Photos"/>
        <br/>
      </Container>
    );
  }

}
