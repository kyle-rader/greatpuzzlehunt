import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { Link } from 'react-router';
import {
  Container,
  Accordion,
  List,
  Icon,
  Header,
  Segment,
  Button,
  Image
} from 'semantic-ui-react';

const { eventYear, eventDate, siteName } = Meteor.settings.public;

const prizeNote = (
  <p>
    <strong>*</strong> Must be present at awards ceremony to claim prizes, else prizes go to the next place team.
  </p>
);

Info = class Info extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    $('html, body').scrollTop(0);
  }

  render() {
    return (
      <Container>
        <PuzzlePageTitle title="FAQ"/>

        <Accordion styled fluid>

          <Accordion.Title>
            <Icon color="red" size="huge" name="dropdown"/>
            Useful downloads (2017)
          </Accordion.Title>
          <Accordion.Content>{this._downloadButtons()}</Accordion.Content>

          <Accordion.Title>
            <Icon color="red" size="huge" name="dropdown"/>
            Directions & Parking
          </Accordion.Title>
          <Accordion.Content>
            <p>
              Parking is FREE in all C-Lots on south campus on weekends.
            </p>
            <p>
              Check in at Red Square in the middle of campus. Food and prizes will also take place in Red Square.
            </p>
            <Button as='a' href="http://www.wwu.edu/map/" target="_blank" content="Interactive Campus Map" />

            <Header as='h3' icon={<Icon color="blue" name="map"/>} content="Directions from the South" />
            <List bulleted>
              <List.Item description="From Interstate 5, take exit 252."/>
              <List.Item description="Turn left off the ramp onto S. Samish Way."/>
              <List.Item description="Turn left at the stop light onto N. Samish Way."/>
              <List.Item description="Stay in the left lane and go over the freeway."/>
              <List.Item description="At the second light, turn left onto Bill McDonald Parkway/Byron Avenue – there will be a Wendy's and a 76 Station on your left."/>
              <List.Item description="Drive on Bill McDonald Parkway for just over 1 mile and continue straight through two stop lights (you will still be on the Bill McDonald Parkway)."/>
              <List.Item description="The Campus Services Building will be the first building on the right after the intersection."/>
              <List.Item description="The C-Lots will be the next left and right turns."/>
            </List>

            <Header as='h3' icon={<Icon color="green" name="map"/>} content="Directions from the North" />
            <List bulleted>
              <List.Item description="From Interstate 5 going south, take exit 252 and get in the right lane."/>
              <List.Item description="Turn right off the ramp onto N. Samish Way, and get into the far left turn lane."/>
              <List.Item description="At the light, turn left onto Bill McDonald Parkway/Byron Avenue - there will be a Wendy's and a 76 Station on your left."/>
              <List.Item description="Drive on Bill McDonald Parkway for just over 1 mile and continue straight through two stop lights (you will still be on the Bill McDonald Parkway)."/>
              <List.Item description="The Campus Services Building will be the first building on the right after the intersection"/>
              <List.Item description="The C-Lots will be the next left and right turns."/>
            </List>

            <br/>

            <iframe frameBorder="0" height="450" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDzFT6fltUNTF7Vas25IJmMkUAa5yVPi4I&amp;q=Campus+Services+Bellingham+WA" width="100%" />
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="orange" size="huge" name="dropdown"/>
            What is the Great Puzzle Hunt?
          </Accordion.Title>
          <Accordion.Content>
            <p>
              A puzzle hunt is an outdoor adventure think scavenger hunt but with puzzle-solving.
              Teams of up to 6 (recommended size 4-6) travel on foot about WWU campus solving
              a collection of puzzles (involving logic, patterns, decoding, and a variety
              of skill sets). Lots of prizes* will be awarded. Whether your team places
              first or two hundred and fifty-first, competing in a puzzle hunt is a
              great way to stretch your mental muscles, bond with your teammates,
              and have a lot of fun!
            </p>
            <p>
              Registered teams are assigned a QR code and connected to our game
              platform on their smartphone(s). Your mission: Reach each
              puzzle location and scan your QR code to receive the puzzle and start the clock!
            </p>
            <p>
              Don’t forget your bag of scissors, tape, hole punch, etc. to
              MacGyver your way through. Once you determine and enter code words,
              the clock stops and you are sent to the next destination. Connect
              all the code words to complete the game! <strong>OPEN TO ALL!</strong>
            </p>
            <p>
              Lots of prizes will be awarded. Whether your team places first or two
              hundred and fifty-first, competing in a puzzle hunt is a great way to
              stretch your mental muscles, bond with your teammates, and have a lot of fun!
            </p>
            {prizeNote}
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="orange" size="huge" name="dropdown"/>
            How many people should be on my team?
          </Accordion.Title>
          <Accordion.Content>
            We recommend 4-6 people on a team. It can be an advantage to divvy up the work (cutting, constructing, googling, etc.).
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="yellow" size="big" name="dropdown"/>
            When is it?
          </Accordion.Title>
          <Accordion.Content>
            <h3>
              <strong>{eventDate}</strong> at 10:00 AM, Red Square, WWU
            </h3>
            Other important dates:
            <List className='bulleted'>
              <List.Item><strong>March 18, {eventYear}</strong>: Early Bird discount prices for ticket codes and official gear ends.</List.Item>
              <List.Item><strong>April 3, {eventYear}</strong>: Official Puzzle Hunt Gear Pre-Order deadline (pick up your gear at check-in on {eventDate})</List.Item>
              <List.Item><strong>March 12, {eventYear}</strong>: Registration Closes (Or earlier if team limit is reached). <br/>If you've already made an account you can purchase and redeem a ticket codes up until {eventDate} at 10:00 AM.</List.Item>
            </List>
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="olive" size="big" name="dropdown"/>
            Who is it for?
          </Accordion.Title>
          <Accordion.Content>
            <p>
              Students, Faculty, Staff, Alumni, Community, Everyone!
            </p>
            <strong>*</strong> Children under 14 must be accompanied at all times by a parent/legal guardian who must also be registered on the same team as the child.
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="green" size="big" name="dropdown"/>
            What team divisions are there?
          </Accordion.Title>
          <Accordion.Content>
            <List className='bulleted'>
              <List.Item description="WWU Students - All team members must be currently enrolled at WWU (undergrad or grad)"/>
              <List.Item description="High School - All team members must be currently enrolled in high school"/>
              <List.Item description="WWU Alumni - At least half of team members must be WWU Alumni"/>
              <List.Item description="Open - General public, mixed student/non-student, family (children under age 14 must be accompanied by a parent/guardian)"/>
            </List>
            <p>
              Note: A team may have up to 6 members. We recommend 4-6 for dividing up tasks.<br/>
              Note: A minimum of 10 teams are required to form a division; else the teams in that division will merge into the Open division.<br/>
            </p>
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="green" size="big" name="dropdown"/>
            Prizes?
          </Accordion.Title>
          <Accordion.Content>
            <p>
              Awesome prizes* will be awarded to top three teams in each division. Other prizes* for best team names, costumes, spirit, and more!
            </p>
            {prizeNote}
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="teal" name="dropdown"/>
            How much does this cost?
          </Accordion.Title>
          <Accordion.Content>
            Registration Prices are per person.  All fees are non-refundable.  Fee is charged when person registers.<br/><br/>
            <strong>Early Bird Registration Fee</strong><br/>
            Open until March 10, 2017 <br/>
            Student: $5<br/>
            Non-Student: $10<br/><br/>
            <strong>Regular Registration Fee</strong><br/>
            Open from March 11 - March 30, 2017 <br/>
            Student: $8<br/>
            Non-Student: $15<br/>
            Fees help cover costs of materials, prizes, food, campus services & reservations, etc.  We are seeking <a target="_blank" href="https://alumni.wwu.edu/greatpuzzlehunt">donations</a> to help keep fees minimized.
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="blue" size="big" name="dropdown"/>
            What should I bring to the puzzle hunt?
          </Accordion.Title>
          <Accordion.Content>
            Your creativity and problem solving skills! Along with the following:<br/>
            <List>
              <List.Item description="At least one smart phone. The more the better! (Think about battery life). Googling is encouraged!"/>
              <List.Item description="A clip board, or a note pad.  Graph paper might come in handy."/>
              <List.Item description="Scissors and tape."/>
              <List.Item description="Writing utensils (pencils, colored pencils, erasers, highlighters)."/>
              <List.Item description="A sturdy single hole punch (capable of punching through 8 layers of paper)."/>
              <List.Item description="Water to drink! You are welcome to bring your own snacks too."/>
              <List.Item description="Umbrella for your puzzles!"/>
            </List>
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="violet" size="big" name="dropdown"/>
            Do I have to be a math/science person?
          </Accordion.Title>
          <Accordion.Content>
            NO! A common misconception is that only mathematically inclined people are good at solving puzzles.
            In this puzzle hunt, it will be to your advantage to have people on your team with
            knowledge of music, art, humanities and social sciences, as well as science and mathematics.
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="purple" size="big" name="dropdown"/>
            How long will this last? (Event Schedule)
          </Accordion.Title>
          <Accordion.Content>
            <List>
              <List.Item description="10:00 AM - Check in at Red Square.  Team's will receive a rules packet and any pre-ordered t-shirts."/>
              <List.Item description="10:45 AM - Announcements."/>
              <List.Item description="11:00 AM - Puzzle Hunt starts!"/>
              <List.Item description="2 - 3 PM - Finishing Puzzles and Lunch"/>
              <List.Item description="4:00 PM - Prizes awarded!"/>
            </List>
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="pink" size="big" name="dropdown"/>
            What if it rains?
          </Accordion.Title>
          <Accordion.Content>
            Welcome to Washington.  We hunt on!
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="brown" size="big" name="dropdown"/>
            What kind of puzzles will we be solving?
          </Accordion.Title>
          <Accordion.Content>
            Check out the <Link to="/puzzles">puzzles from last year</Link>!
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="black" size="big" name="dropdown"/>
            What do the T-Shirts look like?
          </Accordion.Title>
          <Accordion.Content>
            This year we have awesome Next Level Poly/Cotton blend T-Shirts!<br/>
            <List>
              <List.Item>All colors can be viewed at Next Level:<a target="_blank" href="http://www.nextlevelapparel.com/Prod-24-1-29-2/men39s-polycotton-crew.htm">Men's Colors</a> | <a target="_blank" href="http://www.nextlevelapparel.com/Prod-22-1-13-1/next-level-polycotton-tee.htm">Women's Colors</a>.</List.Item>
              <List.Item>Next Level Cotton/Poly blend Tshirts!</List.Item>
              <List.Item>
                Mens' Sizes: S-3XL<br/>
                Ladies’ Sizes: S-2XL  (*The ladies run small. They are a Junior Fitted T-shirt. )<br/>
                Sizes 2-3XL are an additional $2.
              </List.Item>
              <List.Item>White or Navy logo for any shirt color."</List.Item>
              <List.Item>Early bird price: $10."</List.Item>
              <List.Item>Regular Price (March 11 - March 23): $13"</List.Item>
              <List.Item>T-Shirt sales end March 23, 2017 at midnight."</List.Item>
            </List>
            <Image.Group>
              <Image src="/img/2017/t-shirts/mens.jpg"/>
              <Image src="/img/2017/t-shirts/womens.jpg"/>
            </Image.Group>
          </Accordion.Content>
        </Accordion>

        <br/>
        <p>Last Updated: Jan 16, 2018</p>
      </Container>
    );
  }

  _downloadButtons() {
    return (
      <List relaxed>
        <List.Item>
          <a href="/pdfs/2017/2017_GPH_rules_of_play.pdf" target="_blank"><Icon name="download"/>2017 Rules of Play & Scoring</a>
        </List.Item>
        <List.Item>
          <a href="/pdfs/2017/puzzle-hunt-map.pdf" target="_blank"><Icon name="download"/>2017 Puzzle Campus Map</a>
        </List.Item>
      </List>
    );
  }
}
