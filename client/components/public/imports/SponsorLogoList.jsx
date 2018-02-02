import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Item, Image } from 'semantic-ui-react';
import { filter } from 'lodash';

 class SponsorLogoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image.Group size='small'>
        { this._renderLogos() }
      </Image.Group>
    );
  }

  _renderLogos() {
    const { sponsors, level } = this.props;
    return sponsors.map((sponsor, i) => this._renderLogo(sponsor, `sponsor-${level}-${i}`));
  }

  _renderLogo(sponsor, key) {
    return (
      <Image key={key} src={sponsor.logoUrl} spaced/>
    );
  }
}

SponsorLogoList.propTypes = {
  sponsors: PropTypes.arrayOf(PropTypes.object)
}

export default SponsorLogoList;
