import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { Container } from 'semantic-ui-react';

import SponsorEditorList from './imports/SponsorEditorList';

class AdminSponsorsInner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading } = this.props;

    return (
      <Container>
        <PuzzlePageTitle title="Sponsors Editor"/>
        {loading ? <Loading /> : <SponsorEditorList sponsors={this.props.sponsors}/>}
      </Container>
    );
  }
}

export default AdminSponsors = withTracker((props) => {
  const sponsorsHandle = Meteor.subscribe('admin.sponsors');
  const loading = !Boolean(sponsorsHandle.ready());
  const sponsors = Sponsors.find({}).fetch();
  return {
    loading,
    sponsors,
  };
})(AdminSponsorsInner);
