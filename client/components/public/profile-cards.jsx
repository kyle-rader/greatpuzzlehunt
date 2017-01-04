import React, { Component } from 'react';
import { Card, Image, Button, Icon } from 'semantic-ui-react';
import { map } from 'lodash';

ProfileCards = class ProfileCards extends Component {

  _copyToClipboard() {

    // must use a temporary form element for the selection and copy
    const target = document.createElement('textarea');
    target.style.position = "absolute";
    target.style.left = "-9999px";
    target.style.top = "0";
    target.id = 'copyText';
    document.body.appendChild(target);

    target.textContent = this.email;

    // select the content
    let currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    let succeed;
    try {
        succeed = document.execCommand('copy');
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    return succeed;
  }

  _renderProfileCard({ name, title, role, email, image }) {
    let extra = (
      <div className="ui white left labeled button">
        <a className="ui label" href={`mailto:${email}`}>{email}</a>
        <div className="ui icon button" onClick={this._copyToClipboard.bind({email})}>
          <i className="copy icon"></i> Copy
        </div>
      </div>
    );

    return (
    <Card key={email}
      image={image}
      header={name}
      meta={title}
      description={role}
      extra={extra}
    />
    );
  }

  _renderProfiles() {
    const profiles = [
      {
        name: 'Millie Johnson',
        title: 'Associate Math Professor, WWU',
        role: 'Primary event coordinator, puzzle creator, and founder of the Great Puzzle Hunt.',
        email: 'Millie.Johnson@wwu.edu',
        image: '/img/2016/event-photos/millie_johnson.jpg',
      },
      {
        name: 'Kyle Rader',
        title: 'Software Engineer, Action Sprout',
        role: 'Lead developer and secondary event coordinator.',
        email: 'kyle@kylerader.ninja',
        image: '/img/team/kyle.jpg',
      },
      {
        name: 'Wendy Aguilar',
        title: 'Web Design Specialist, CDK Global',
        role: 'Lead designer.  She makes everthing beautiful',
        email: 'agu.wnd@gmail.com',
        image: '/img/team/wendy.jpg',
      }
    ];

    return map(profiles, (profile) => this._renderProfileCard(profile));
  }

  render() {
    return (
    <div className="one column stacking row">
      <div className="dark-blue column">
        <div className="ui padded basic segment">
          <h1>Who are we?</h1>
          <h2>We are Mind Mobilizers who love our community and the amazing diversity of talents it has to offer :)</h2>
        </div>
        <div className="ui basic segment">
          <div className="ui three stackable cards">
            {this._renderProfiles()}
          </div>
        </div>
      </div>
    </div>
    );
  }
}
