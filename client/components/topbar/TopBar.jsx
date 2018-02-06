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
    iconClass: 'orange circle info',
  },
  {
    name: 'Gallery',
    to: '/gallery',
    iconClass: 'teal camera',
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
    iconClass: 'green user',
  },
  {
    name: 'Transactions',
    to: '/admin/tickets',
    iconClass: 'teal ticket',
  },
  {
    name: 'Teams',
    to: '/admin/teams',
    iconClass: 'blue users',
  },
  {
    name: 'Export',
    to: '/admin/export',
    iconClass: 'orange download',
  },
  {
    name: 'Puzzles',
    to: '/admin/puzzles',
    iconClass: 'violet puzzle',
  },
  {
    name: 'Game State',
    to: '/admin/game',
    iconClass: 'red gamepad',
  },
  {
    name: 'Email',
    to: '/admin/email',
    iconClass: 'orange mail',
  },
  {
    name: 'Sponsors',
    to: '/admin/sponsors',
    iconClass: 'green dollar',
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
          {this._logInLogOutBtn()}
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

  _socialButton(socialApp) {
    return (
      <a className="item" href={Meteor.settings.public.social[socialApp]} target="_blank" key={`${socialApp}-btn`}>
        <i className={`large ${socialApp} ${socialApp}-color icon`}></i>
        {`${socialApp[0].toUpperCase()}${socialApp.substring(1)}`}
      </a>
    );
  }

  _logInLogOutBtn() {
    if (this.props.user) {
      return (
        <div className="ui dropdown item">
          <Icon name='settings' size='large'/>
          { this.props.user.name }
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
          <Icon name='sign in'/>
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
