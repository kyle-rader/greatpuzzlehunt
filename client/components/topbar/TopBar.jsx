import React from 'react';

TopBar = class TopBar extends React.Component {

  _socialButton(socialApp) {
    return (
      <a className="item" href={Meteor.settings.public.social[socialApp]} target="_blank" key={`${socialApp}-btn`}>
        <i className={`large ${socialApp} ${socialApp}-color icon`}></i>
        {`${socialApp[0].toUpperCase()}${socialApp.substring(1)}`}
      </a>
    );
  }

  _renderSocialButtons() {
    const socialApps = Object.keys(Meteor.settings.public.social);
    return socialApps.map((app) => this._socialButton(app));
  }

  _logInLogOutBtn() {
    if (this.props.user) {
      return (
        <a className="item" onClick={this._logout}>
          <i className="sign out icon"></i>
          Leave
        </a>
      );
    } else {
      return (
        <a className="item" href="/login">
          <i className="sign in icon"></i>
          Enter
        </a>
      );
    }
  }

  _logout(event) {
    event.preventDefault();
    return Meteor.logout(() => FlowRouter.go('/'));
  }

  _toggleSideBar() {
    $('.ui.pushable > .ui.sidebar').sidebar('toggle');
  }

  render() {
    return (
      <div className="ui top fixed inverted labeled icon menu top-bar" ref="topbar">

        <a className="item" onClick={this._toggleSideBar}>
          <i className="large content icon"></i>
          Menu
        </a>

        <div className="right menu">
          {this._logInLogOutBtn()}
        </div>
      </div>
    );
  }
}
