import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Icon } from 'semantic-ui-react';


TopBar = class TopBar extends Component {

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

  _renderAdminBUttons() {
    if (this.props.user.hasRole('admin')) {
      return [
        <div className="divider" key="adminDivider"></div>,
        (<Link className="item" to="/admin" key="adminLink">
          <Icon name="configure" color="red"/>
          Admin
        </Link>)
      ];
    }
    return null;
  }

  _logInLogOutBtn() {
    if (this.props.user) {
      return (
        <div className="ui dropdown item">
          <i className="large settings icon"></i>
          {this.props.user.name}
          <div className="menu topbar-dropdown-menu">
            <Link className="item" to="/profile">
              <Icon name="user" color="green"/>
              Profile
            </Link>
            <Link className="item" to="/team">
              <Icon name="users" color="blue"/>
              Team
            </Link>
            <Link className="item" to="/game">
              <Icon name="puzzle" color="violet"/>
              Game
            </Link>
            {this._renderAdminBUttons()}
            <div className="divider"></div>
            <a className="item" onClick={(e) => this._logout(e)}>
              <Icon name="sign out"/>
              Logout
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <Link className="item" to="/login">
          <i className="sign in icon"></i>
          Login
        </Link>
      );
    }
  }

  _logout(event) {
    event.preventDefault();
    return Meteor.logout(() => browserHistory.push('/'));
  }

  _initDropDownMenus() {
    $(this.refs.topbar).find('.ui.dropdown').dropdown();
  }

  componentDidMount() {
    this._initDropDownMenus();
  }

  componentDidUpdate(prevProps, prevState) {
    this._initDropDownMenus();
  }

  render() {
    return (
      <div className="ui fixed inverted labeled icon menu top-bar" ref="topbar">

        <div className="ui dropdown item" ref="menuDropdown">
          <i className="large content icon"></i>
          Menu
          <div className="menu topbar-dropdown-menu">
            <Link className="item" to="/">
              <i className="green home icon"></i>
              Home
            </Link>
            <Link className="item" to="/teams-list">
              <i className="blue users icon"></i>
              Teams
            </Link>
            <Link className="item" to="/contact">
              <i className="violet mail icon"></i>
              Contact
            </Link>
            <Link className="item" to="/puzzles">
              <i className="red puzzle icon"></i>
              Puzzles
            </Link>
            <Link className="item" to="/info">
              <i className="orange circle info icon"></i>
              More Info
            </Link>
            <Link className="item" to="/gallery">
              <i className="teal camera icon"></i>
              Gallery
            </Link>
            <Link className="item" to="/qrcode">
              <i className="gray qrcode icon"></i>
              QR Encoder
            </Link>
          </div>
        </div>

        {this._renderSocialButtons()}

        <div className="right menu">
          {this._logInLogOutBtn()}
        </div>
      </div>
    );
  }
}

TopBar = createContainer(({ params }) => {
  return {
    user: Meteor.user(),
    isAdmin() {
      return Boolean(Meteor.user()) && Meteor.user().hasRole('admin');
    }
  };
}, TopBar);
