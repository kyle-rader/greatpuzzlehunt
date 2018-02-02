import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Icon, Header } from 'semantic-ui-react';
import SponsorLogoList from './SponsorLogoList';

class SponsorRowInner extends Component {
  render() {
    const { name, price, description, level, sponsors } = this.props;
    return (
      <Grid.Row>
        <Grid.Column mobile={16}  tablet={6} computer={4} stretched>
          <Segment color="blue" inverted>
            <Header as="h2" size="huge" content={name}/>
            <Header as="h3" content={price}/>
            <p>{description}</p>
          </Segment>
        </Grid.Column>
        <Grid.Column mobile={16}  tablet={10} computer={12} stretched>
          <Segment>
            <SponsorLogoList sponsors={sponsors} level={level}/>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    );
  }
}

SponsorRowInner.PropTypes = {
  name: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
  level: PropTypes.string,
  sponsors: PropTypes.arrayOf(PropTypes.object),
};

const SponsorRow = withTracker(({ level }) => {
  const sponsorsHandle = Meteor.subscribe('sponsors', level);
  const loading = sponsorsHandle.ready();
  const sponsors = Sponsors.find({ level }).fetch();

  return {
    loading,
    sponsors,
  };
})(SponsorRowInner);

export default SponsorRow;
