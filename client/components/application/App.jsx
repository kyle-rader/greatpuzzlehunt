// Main App - React Root Component

import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ScrollToTop from 'react-scroll-up';
import { Button } from 'semantic-ui-react';

App = class App extends Component {

  componentDidMount() {
    document.title = Meteor.settings.public.siteName;
  }

  render() {
    return (
    <div id="app-root">
      <TopBarContainer />
      {this.props.yield}
      <Footer />

      <ScrollToTop showUnder={1000}>
        <Button labelPosition="right" icon="up arrow" content="Scroll Up" />
      </ScrollToTop>

    </div>
    );
  }

}
