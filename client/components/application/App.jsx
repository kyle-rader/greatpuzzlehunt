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
      <div className="ui pushable">
        <MenuContainer />
        <div className="pusher">
          {this.props.yield}
        </div>
      </div>
    </div>
    );
  }

}
