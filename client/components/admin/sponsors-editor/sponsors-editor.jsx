import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component, PropTypes } from 'react';
import { Container } from 'semantic-ui-react';

import SponsorEditorList from './imports/sponsor-editor-list';

class SponsorsEditorInner extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { loading } = this.props;

    return (
      <Container>
        <PuzzlePageTitle title="Sponsors Editor"/>
        {loading ? <Loading /> : <SponsorEditorList sponsors={this.props.sponsors} onNewSponsor={(e) => this._newSponsor(e)}/>}
      </Container>
    );
  }

  _newSponsor(e) {
    Meteor.call('sponsors.create', (error, result) => {
      if (error) return alert(error.reason);
    });
  }
}

export default SponsorsEditor = withTracker((props) => {
  const sponsorsHandle = Meteor.subscribe('admin.sponsors');
  const loading = !Boolean(sponsorsHandle.ready());
  const sponsors = Sponsors.find({});
  return {
    loading,
    sponsors: loading ? [] : sponsors.fetch(),
  };
})(SponsorsEditorInner);
