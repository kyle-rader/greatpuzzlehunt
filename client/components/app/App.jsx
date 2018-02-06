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
      <TopBar />

      {this.props.children}

      <Footer />

      <ScrollToTop showUnder={1000}>
        <Button labelPosition="right" icon="up arrow" content="Scroll Up" className='scroll-top-btn'/>
      </ScrollToTop>

    </div>
    );
  }

}
