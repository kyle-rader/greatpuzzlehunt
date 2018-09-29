import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Container, Image, Divider, Icon } from 'semantic-ui-react';

Media = class Media extends Component {

  render() {
    return (
      <Container>
        <PuzzlePageTitle title="Media" subTitle={<span>Photo Credit: <a href="http://www.gabrielleponcz.com/" target="_blank">Gabrielle Poncz</a></span>} />

        Check out videos of past Hunts!<br />
        <a href="https://www.youtube.com/channel/UCTc814_FbilFiSVktIWec8A" target="_blank">
          <Icon name="youtube" />
          The Great Puzzle Hunt YouTube Page
        </a>

        <Divider />

        <Image.Group size="medium">

          <Image
            src='/img/media-page/cover_2018.jpg'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2018', color: 'black' }}
            href='https://www.gabrielleponcz.com/scienceandart/#/3rd-annual-great-puzzle-hunt-2018/'
            target='_blank'
            />

          <Image
            src='/img/media-page/cover_2017.jpg'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2017', color: 'black' }}
            href='https://www.gabrielleponcz.com/puzzlehunt/'
            target='_blank'
            />

          <Image
            src='/img/media-page/cover_2016.jpg'
            as='a'
            label={{ as: 'a', ribbon: 'true', content: '2016', color: 'black' }}
            href='https://www.gabrielleponcz.com/wwu-great-puzzle-hunt/'
            target='_blank'
            />
        </Image.Group>
      </Container>
    );
  }

}
