import React, { Component } from 'react';
import { Link } from 'react-router';
import Scrollchor from 'react-scrollchor';
import {
  Container,
  Segment,
  Header,
  List,
  Icon,
  Responsive,
  Button,
} from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';

const { eventYear } = Meteor.settings.public;

RulesOfPlay = class RulesOfPlay extends Component {
  render() {
    return (
      <Container>
        <PuzzlePageTitle title={`${eventYear} Rules of Play`}/>

        {/* SCROLL TO BUTTONS */}
        <Responsive as={Segment} {...Responsive.onlyMobile} basic>
          <p>Scroll To: <br/></p>
          <p>
            <Scrollchor to="#dont" animate={{ offset: -70, duration: 300 }}>
              <Button basic content="Don't" color="red"/>
            </Scrollchor>
            <Scrollchor to="#puzzles" animate={{ offset: -70, duration: 300 }}>
              <Button basic content="Puzzles" color="purple"/>
            </Scrollchor>
            <Scrollchor to="#mechanics" animate={{ offset: -70, duration: 300 }}>
              <Button basic content="Mechanics" color="orange"/>
            </Scrollchor>
            <Scrollchor to="#scoring" animate={{ offset: -70, duration: 300 }}>
              <Button basic content="Scoring" color="blue"/>
            </Scrollchor>
          </p>
        </Responsive>

        {/* DO Section */}
        <Segment basic>
          <Header id="do" as='h2' icon={<Icon name="check" color="green"/>} content="Do"/>
          <List bulleted relaxed size="large">
            <List.Item>Use the internet! Google things! For public Wi-Fi, select <strong>WWUwireless-Guest</strong>. (<a href="https://atus.wwu.edu/kb/wwu-public-wifi-network" target="_blank">More WiFi info</a>.)</List.Item>
            <List.Item>Have fun and make it fun for others by abiding by the standards of fair play.</List.Item>
            <List.Item>Send questions to <a href="mailto:support@greatpuzzlehunt.com">support@greatpuzzlehunt.com</a>.</List.Item>
            <List.Item>Report anything during the Hunt that you feel is unsafe or represents unsportsmanlike conduct. (<Link to="/contact">Contact Info</Link>)</List.Item>
          </List>
        </Segment>

        {/* DON'T Section */}
        <Segment basic>
          <Header id="dont" as='h2' icon={<Icon name="remove" color="red"/>} content="Don't"/>
          <List bulleted relaxed size="large">
            <List.Item>Interfere with another team’s enjoyment of the Hunt.</List.Item>
            <List.Item>Give puzzle information to or obtain puzzle information from another team.</List.Item>
            <List.Item>Shout out code words.</List.Item>
            <List.Item>Post photos of others without their explicit consent.</List.Item>
          </List>
        </Segment>

        {/* PUZZLE Section */}
        <Segment basic>
          <Header id="puzzles" as='h2' icon={<Icon name="puzzle" color="purple"/>} content="Puzzles"/>
          <List bulleted relaxed size="large">
            <List.Item>There are 4 primary puzzles followed by 1 Meta Puzzle. <a href="https://en.wikipedia.org/wiki/Metapuzzle" target="_blank">What is a meta puzzle?</a></List.Item>
            <List.Item>Each puzzle results in a code word or words.</List.Item>
            <List.Item><strong>Hint:</strong> If your result does not spell out a word, it might be scrambled!</List.Item>
            <List.Item><strong>Hint:</strong> If your result is not letters, you need to decode to letters!</List.Item>
            <List.Item><strong>Hint:</strong> Time is ticking! Make sure everyone on the team is assigned to a job.</List.Item>
          </List>
        </Segment>

        {/* MECHANICS Section */}
        <Segment basic>
          <Header id="mechanics" as="h2" icon={<Icon name="setting" color="orange"/>} content="Game Mechanics" />
          <List bulleted relaxed size="large">
            <List.Item>To solve a puzzle you must:
                <List ordered={true}>
                  <List.Item>Go to that puzzle's station.</List.Item>
                  <List.Item>Select that puzzle from the game page.</List.Item>
                  <List.Item>Present the puzzle QR code.</List.Item>
                  <List.Item>A volunteer will scan it, give you the puzzle packet, and start your timer. </List.Item>
                  <List.Item>Then your team can enter the code word on the game page to stop the timer.</List.Item>
                </List>
              </List.Item>
            </List>
        </Segment>

        {/* SCORING Section */}
        <Segment basic>
          <Header id="scoring" as='h2' icon={<Icon name="info" color="blue"/>} content="Scoring"/>
          <List bulleted relaxed size="large">
            <List.Item>Your team score is measured in minutes. The fewer minutes, the better.</List.Item>
            <List.Item>From puzzle timer start, you have 65 minutes to finish that puzzle (15 minutes for meta puzzle).</List.Item>
            <List.Item>If you do not finish in 65 minutes you receive a score of 100 minutes for that puzzle (25 minutes for meta).</List.Item>
            <List.Item>There is no penalty for incorrect code word entries.</List.Item>
            <List.Item>Each primary puzzle has 3 hints available.</List.Item>
            <List.Item>Teams may "buy" hints. Cost increases per hint: any hint taken 1st, 2nd, or 3rd (in any order) adds 5, 10, or 15 minutes respectively, to your score.</List.Item>
            <List.Item>Hints are progressive and teams may "buy" them in any order. (e.g., You may choose to only "buy" hint 3 near the end of a puzzle at a cost of 5 minutes).</List.Item>
            <List.Item>Bonus: If you finish within 65 minutes and do not use any hints, 10 minutes are subtracted from your score! (No hints or bonus available for meta.)</List.Item>
            <List.Item>In summary:
              <pre><code>
              total score = (timed minutes) <br/>
              &nbsp; + (5 * any 1st hint used) <br/>
              &nbsp; + (10 * any 2nd hint used) <br/>
              &nbsp; + (15 * any 3rd hint used) <br/>
              &nbsp; - (bonus time if applicable)
              </code></pre>
            </List.Item>
          </List>
        </Segment>
      </Container>
    );
  }
}
