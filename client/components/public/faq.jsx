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

const gearPricing = (
  <span>
    <strong>Official Puzzle Gear Pricing</strong>
    <ul>
      <li>Early Bird Discount Price (varying styles: prices range from $10-20, additional $2 for extended sizes) until March 18, {eventYear}</li>
      <li>Regular Price (varying styles: prices range from $13-$23, additional $2 for extended sizes) begins March 19, {eventYear}</li>
      <li>Gear sale ends midnight April 3, {eventYear}</li>
      <li>The sale of these shirts helps to fund this event. Support the WWU Great Puzzle Hunt and wear our official Great Puzzle Hunt gear! Check out the styles, colors, and design. Pick up your shirts at event check-in.</li>
    </ul>
  </span>
);

FAQ = class FAQ extends Component {

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
            <Icon name="download"/>
            Useful downloads (2017)
          </Accordion.Title>
          <Accordion.Content>{this._downloadButtons()}</Accordion.Content>

          <Accordion.Title>
            <Icon color="red" size="huge" name="dropdown"/>
            <Icon name="map"/>
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
            <Icon name="info"/>
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
            <Icon name="users"/>
            How many people should be on my team?
          </Accordion.Title>
          <Accordion.Content>
            We recommend 4-6 people on a team. It can be an advantage to divvy up the work (cutting, constructing, googling, etc.).
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="yellow" name="dropdown"/>
            <Icon name="calendar"/>
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
              <List.Item><strong>April 12, {eventYear}</strong>: Registration Closes (Or earlier if team limit is reached). <br/>If you've already made an account you can purchase and redeem a ticket codes up until {eventDate} at 10:00 AM.</List.Item>
            </List>
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="yellow" name="dropdown"/>
            <Icon name="user"/>
            Who is it for?
          </Accordion.Title>
          <Accordion.Content>
            <p>
              Students, Faculty, Staff, Alumni, Community, Everyone!
            </p>
            <strong>*</strong> Children under 14 must be accompanied at all times by a parent/legal guardian who must also be registered on the same team as the child.
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="olive" name="dropdown"/>
            <Icon name="sitemap"/>
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
            <Icon color="olive" name="dropdown"/>
            <Icon name="trophy"/>
            Prizes?
          </Accordion.Title>
          <Accordion.Content>
            <p>
              Awesome prizes* will be awarded to top three teams in each division. Other prizes* for best team names, costumes, spirit, and more!
            </p>
            {prizeNote}
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="green" name="dropdown"/>
            <Icon name="dollar"/>
            How much does this cost?
          </Accordion.Title>
          <Accordion.Content>
            <p>
              Registration Prices are per person. All fees are non-refundable. Fees charged when person buys ticket codes.<br/>
              You can SAVE on the early bird discount prices!
            </p>
            <strong>Ticket Code Pricing</strong>
            <ul>
              <li>Early Bird Discount Price ($5 student/$10 non-student) until March 18, {eventYear}</li>
              <li>Regular Price ($8 student/$15 non-student) begin March 19, {eventYear}</li>
            </ul>
            {gearPricing}
            <p>
              These fees are kept low thanks to generous donations from our sponsors.
              They help cover costs of materials, prizes*, food, campus services
              & reservations, etc.
            </p>
            {prizeNote}
            <p>
              Please consider <a target="_blank" href="https://alumni.wwu.edu/greatpuzzlehunt">donating to the {siteName}</a>.
            </p>
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="green" name="dropdown"/>
            <Icon name="suitcase"/>
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
            <Icon color="teal" name="dropdown"/>
            <Icon name="flask"/>
            Do I have to be a math/science person?
          </Accordion.Title>
          <Accordion.Content>
            NO! A common misconception is that only mathematically inclined people are good at solving puzzles.
            In this puzzle hunt, it will be to your advantage to have people on your team with
            knowledge of music, art, humanities and social sciences, as well as science and mathematics.
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="teal" name="dropdown"/>
            <Icon name="clock"/>
            How long will this last? (Event Schedule)
          </Accordion.Title>
          <Accordion.Content>
            <List>
              <List.Item description="10:00 AM -  Check in at Red Square, WWU campus. Receive wristband (color coded by division), information packet, swag, and any pre-ordered shirts."/>
              <List.Item description="10:45 AM - Announcements."/>
              <List.Item description="11:00 AM - Puzzle Hunt starts!"/>
              <List.Item description="1:30 - 3:30 PM KUGS Radio plays music Red Square"/>
              <List.Item description="2:30 PM - Domino’s Pizza Arrives in Red Square"/>
              <List.Item description="2 - 3 PM - Finishing Puzzles and return to Red Square"/>
              <List.Item description="4 - 5 PM - Award Ceremony & Prizes*!"/>
            </List>
            {prizeNote}
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="teal" name="dropdown"/>
            <Icon name="food"/>
            Will the be food?
          </Accordion.Title>
          <Accordion.Content>
            <p>
              Yes! To get food and beverages you <strong>must be wearing your wristband</strong> at all times.<br/>
              Your wristband will be given to you at check in.
            </p>
            <p>There are two opportunities to get this food & beverage:</p>
            <List>
              <List.Item description="10:00 AM - Check in/receive wristband. Refreshments & breakfast items will be along Miller Hall."/>
              <List.Item description="2:30 PM - Domino’s Pizza Arrives in Red Square"/>
            </List>
            <p>
              Special thanks to <a target="_blank" href="http://www.haggen.com/">Haggen NW Fresh</a> for providing fresh fruit and
              breakfast pastries including gluten free (GF) option.
            </p>
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="blue" name="dropdown"/>
            <Icon name="rain"/>
            What if it rains?
          </Accordion.Title>
          <Accordion.Content>
            Welcome to Washington.  We hunt on!
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="blue" name="dropdown"/>
            <Icon name="puzzle"/>
            What kind of puzzles will we be solving?
          </Accordion.Title>
          <Accordion.Content>
            Check out <Link to="/puzzles">past puzzles</Link>!
          </Accordion.Content>

          <Accordion.Title>
            <Icon color="violet" name="dropdown"/>
            <Icon name="shop"/>
            What does the Gear/Apparel look like?
          </Accordion.Title>
          <Accordion.Content>
            <p>This year you have several choices of puzzle hunt gear and hundreds of color combinations!</p>
            <p>Note: to buy gear you will be redirected to <a target="_blank" href="https://commerce.cashnet.com/TheGreatPuzzleHunt2018">this CashNet page</a> where you need to click the bottom gear link to select your gear options.</p>
            <List>
              <List.Item><a target="_blank" href="http://www.wwu.edu/emarket/puzzlehunt/#tshirts">Mens Cotton T-Shirts</a> (Heavy weight cotton)</List.Item>
              <List.Item><a target="_blank" href="http://www.wwu.edu/emarket/puzzlehunt/#wtshirts">Womens Cotton T-Shirts</a> (Heavy weight cotton)</List.Item>
              <List.Item><a target="_blank" href="http://www.wwu.edu/emarket/puzzlehunt/#ktshirts">Youth Cotton Blend T-Shirts</a> (Heavy weight cotton)</List.Item>
              <List.Item><a target="_blank" href="http://www.wwu.edu/emarket/puzzlehunt/#50/50">Mens & Womens 50/50 Poly/Cotton Blend T-Shirts</a> (Lighter weight/softer & not fitted)</List.Item>
              <List.Item><a target="_blank" href="http://www.wwu.edu/emarket/puzzlehunt/#Ltshirt">Mens & Womens Long Sleeve Cotton T-Shirts</a> (Heavy weight cotton)</List.Item>
              <List.Item><a target="_blank" href="http://www.wwu.edu/emarket/puzzlehunt/#sweatshirt">Unisex Cotton Sweatshirts</a></List.Item>
              <List.Item><a target="_blank" href="http://www.wwu.edu/emarket/puzzlehunt/#ksweatshirt">Youth Unisex Cotton Sweatshirts</a></List.Item>
            </List>
            {gearPricing}
            <p>The sale of these shirts helps to fund this event. Support the WWU Great Puzzle Hunt and wear our official Great Puzzle Hunt gear! Check out the styles, colors, and design. Pick up your shirts at event check-in.</p>
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
