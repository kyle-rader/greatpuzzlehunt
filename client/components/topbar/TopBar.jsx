import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';
import { Icon } from 'semantic-ui-react';
import Scrollchor from 'react-scrollchor';

const mainMenuLinks = [
  {
    name: 'Home',
    to: '/',
    iconClass: 'gray home',
  },
  {
    name: 'Sponsors',
    to: '/#sponsors',
    iconClass: 'green heart',
    custom: true,
  },
  {
    name: 'Teams',
    to: '/teams-list',
    iconClass: 'blue users',
  },
  {
    name: 'Contact',
    to: '/contact',
    iconClass: 'violet mail',
  },
  {
    name: 'Puzzles',
    to: '/puzzles',
    iconClass: 'red puzzle',
  },
  {
    name: 'FAQ',
    to: '/faq',
    iconClass: 'orange question',
  },
  {
    name: 'Rules of Play',
    to: '/rules',
    iconClass: 'teal circle info',
  },
  {
    name: 'Gallery',
    to: '/gallery',
    iconClass: 'olive camera',
  },
  {
    name: 'QR Encoder',
    to: '/qrcode',
    iconClass: 'gray qrcode',
  },
];
const adminMenuItems = [
  {
    name: 'Users',
    to: '/admin/users',
    iconClass: 'green users',
  },
  {
    name: 'Transactions',
    to: '/admin/transactions',
    iconClass: 'blue ticket',
  },
  {
    name: 'Game Control',
    to: '/admin/gamestate',
    iconClass: 'orange gamepad',
  },
  {
    name: 'Sponsors',
    to: '/admin/sponsors',
    iconClass: 'red heart',
  },
  {
    name: 'Puzzles',
    to: '/admin/puzzles',
    iconClass: 'violet puzzle',
  },
];
const volunteerMenuItems = [
  {
    name: 'Home',
    to: '/volunteer',
    iconClass: 'violet home',
  },
  {
    name: 'Game Progress',
    to: '/game-progress',
    iconClass: 'teal refresh',
  },
];

TopBar = class TopBar extends Component {
  render() {
    const { isAdmin, isVolunteer } = this.props;
    return (
      <div className="ui fixed inverted small labeled icon menu top-bar" ref="topbar">

        <div className="ui dropdown item" ref="menuDropdown">
          <i className="large content icon"></i>
          Menu
          <div className="menu topbar-dropdown-menu">
            { this._renderMenuLinks(mainMenuLinks) }
          </div>
        </div>

        {/* this._renderSocialButtons() */}

        <div className="right menu">
          { isAdmin() ? this._renderAdminMenu() : null }
          { isVolunteer() ? this._renderVolunteerMenu() : null }
          {this._profileMenu()}
        </div>
      </div>
    );
  }

  _renderMenuLinks(links) {
    return links.map((item) => this._renderMenuLink(item));
  }

  _renderMenuLink(item) {
    if (item.custom) {
      return (
        <a key={item.to} className='item' href={item.to}>
          <Icon className={item.iconClass}/>
          {item.name}
        </a>
      );
    } else {
      return (
      <Link key={ item.to } className='item' to={ item.to }>
        <Icon className={ item.iconClass }/>
        { item.name }
      </Link>
      );
    }
  }

  _renderSocialButtons() {
    const socialApps = Object.keys(Meteor.settings.public.social);
    return socialApps.map((app) => this._socialButton(app));
  }

  _socialButton(socialApp) {
    return (
      <a className="item" href={Meteor.settings.public.social[socialApp]} target="_blank" key={`${socialApp}-btn`}>
        <i className={`large ${socialApp} ${socialApp}-color icon`}></i>
        {`${socialApp[0].toUpperCase()}${socialApp.substring(1)}`}
      </a>
    );
  }

  _renderAdminMenu() {
    return (
      <div className="ui dropdown item">
        <Icon name='spy' size='large'/>
        Admin
        <div className="menu topbar-dropdown-menu">
          { this._renderMenuLinks(adminMenuItems) }
        </div>
      </div>
    );
  }

  _renderVolunteerMenu() {
    return (
      <div className="ui dropdown item">
        <Icon name='clock' size='large'/>
        Volunteer
        <div className="menu topbar-dropdown-menu">
          { this._renderMenuLinks(volunteerMenuItems) }
        </div>
      </div>
    );
  }

  _profileMenu() {
    const { user } = this.props;
    if (user) {
      const isVolunteer = user.hasRole('volunteer');
      return (
        <div className="ui dropdown item">
          <Icon name='settings' size='large'/>
          { this.props.user.name }
          <div className="menu topbar-dropdown-menu">
            <Link className="item" to="/profile">
              <Icon name="user" color="green"/>
              Profile
            </Link>
            {isVolunteer ? null : this._teamButton() }
            <Link className="item" to="/game">
              <Icon name="puzzle" color="violet"/>
              Game
            </Link>
            <Link className="item" to="/rules">
              <Icon name="info" color="teal"/>
              Rules of Play
            </Link>
            <div className="divider"></div>
            <a className="item" onClick={(e) => this._logout(e)}>
              <Icon name="sign out"/>
              Logout
            </a>
          </div>
        </div>
      );
    }

    return (
      <Link className="item" to="/login">
        <Icon name='sign in'/>
        Login
      </Link>
    );
  }

  _teamButton() {
    return (
      <Link className="item" to="/team">
        <Icon name="users" color="blue" />
        Team
      </Link>
    );
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

}

TopBar = withTracker(() => {
  return {
    user: Meteor.user(),
    isAdmin() {
      return Boolean(Meteor.user()) && Meteor.user().hasRole('admin');
    },
    isVolunteer() {
      return Boolean(Meteor.user()) && Meteor.user().hasRole('volunteer');
    },
  };
})(TopBar);
