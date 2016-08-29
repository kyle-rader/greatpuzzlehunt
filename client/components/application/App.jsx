// Main App - React Root Component

import { Meteor } from 'meteor/meteor';
import React from 'react';

App = class App extends React.Component {

  componentDidMount() {
    document.title = Meteor.settings.public.siteName;
  }

  render() {
    return (
    <div id="app-root">
      <TopBarContainer />
      {this.props.yield}
    </div>
    );
  }

}
