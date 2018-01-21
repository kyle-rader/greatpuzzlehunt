import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Grid,
  Button,
} from 'semantic-ui-react';

import SponsorRow from './sponsor-row';

class SponsorEditorList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <Grid stackable>
        <Grid.Row>
          <Grid.Column>
            <Button color="green" onClick={(e) => this._newSponsor(e)} content="New Sponsor"/>
          </Grid.Column>
        </Grid.Row>

        {this._renderSponsors()}

      </Grid>
    );
  }

  _newSponsor(e) {
    Meteor.call('sponsors.create', (error, result) => {
      if (error) return alert(error.reason);
    });
  }

  _renderSponsors() {
    const { sponsors } = this.props;
    return sponsors.map((sponsor, i) => (<SponsorRow key={`sponsor-row-${i}`} sponsor={sponsor}/>));
  }
}

SponsorEditorList.propTypes = {
  sponsors: PropTypes.arrayOf(PropTypes.object),
  onNewSponsor: PropTypes.func,
};

export default SponsorEditorList;
