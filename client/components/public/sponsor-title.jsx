import React, { Component } from 'react';

SponsorTitle = class SponsorTile extends Component {
  render() {
    return (
      <div className="column">
        <div className="ui center aligned inverted icon header">
          <i className={`${this.props.icon} icon`}></i>
          <div className="content">
            {this.props.name}<br/>
            {this.props.price}
            <div className="sub header">
              {this.props.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SponsorTitle.PropTypes = {
  name: React.PropTypes.string,
  icon: React.PropTypes.string,
  price: React.PropTypes.string,
  description: React.PropTypes.string,
};
