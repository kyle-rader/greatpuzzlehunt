import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class SponsorTile extends Component {
  render() {
    return (
      <Grid.Column className='dark-blue'>
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
      </Grid.Column>
    );
  }
}

SponsorTile.PropTypes = {
  name: React.PropTypes.string,
  icon: React.PropTypes.string,
  price: React.PropTypes.string,
  description: React.PropTypes.string,
};

export default SponsorTile;
