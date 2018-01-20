import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid, Icon, Header } from 'semantic-ui-react';
import Sponsors from './sponsors';

class SponsorTile extends Component {
  render() {
    return (
      <div>
        <Segment style={{minHeight:'200px'}} vertical padded basic inverted color='blue'>
          {/* }<Icon style={{ textAlign: 'center'}} name={this.props.icon} size="huge"/> */}
          <Header as="h2" size="huge" content={this.props.name}/>
          <Header as="h3"  content={this.props.price} />
            <div className="sub header">
              {this.props.description}
            </div>
        </Segment>
        <br/>
        <Sponsors rank={this.props.rank} />
      </div>
    );
  }
}

SponsorTile.PropTypes = {
  name: PropTypes.string,
  icon: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
};

export default SponsorTile;
