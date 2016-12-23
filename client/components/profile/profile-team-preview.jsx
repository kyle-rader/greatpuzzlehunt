import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Segment, Header, Icon } from 'semantic-ui-react';

ProfileTeamPreview = class ProfileTeamPreview extends Component {
  constructor(props) {
    super(props);
    this.state = this._makeStateFromProps(props);
  }

  _makeStateFromProps(props) {
    return {
      hasTeam: (props.user && props.user.teamId),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._makeStateFromProps(nextProps));
  }

  render() {
    const content = this.state.hasTeam ? this._renderWithTeam() : this._renderWithoutTeam();

    return (
      <Segment basic>
        <Header as="h3" icon={<Icon name="users" color="blue"/>} content="Team"/>
        {content}
      </Segment>
    );
  }

  _renderWithTeam() {
    return (
    <div></div>
    );
  }

  _renderWithoutTeam() {
    return <NoTeamMessage />;
  }

}

ProfileTeamPreview.propTypes = {
  user: React.PropTypes.object.isRequired,
};
