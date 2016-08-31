import React, { Component } from 'react';

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

  _renderProfileCard(name, title, role, email, image) {
    return (
    <div className="card">
      <div className="image">
        <img src={image}/>
      </div>
      <div className="content">
        <div className="header">{name}</div>
        <div className="meta">
          {title} <br/>
          <div className="ui left labeled button">
            <a className="ui dark-blue label" href={`mailto:${email}`}>{email}</a>
            <div className="ui icon button" onClick={this._copyToClipboard.bind({email})}>
              <i className="copy icon"></i> Copy
            </div>
          </div>
        </div>
        <div className="description">
          {role}
        </div>
      </div>
    </div>
    );
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
            {this._renderProfileCard('Millie Johnson', 'Associate Math Professor, WWU', 'Millie is the primary event coordinator and puzzle creator.', 'Millie.Johnson@wwu.edu', '/img/hunt2016/millie_johnson.jpg')}
            {this._renderProfileCard('Kyle Rader', 'Software Engineer, Action Sprout', 'Kyle is the technology wizard and web application author.', 'kyle@kylerader.ninja', '/img/hunt2016/kyle_and_millie.jpg')}
            {this._renderProfileCard('Wendy Aguilar', 'Web Developer, CDK Global', 'Wendy is the design wizard and has made all of the branding materials.', 'agu.wnd@gmail.com', '/img/logo-color-512.png')}
          </div>
        </div>
      </div>
    </div>
    );
  }
}
