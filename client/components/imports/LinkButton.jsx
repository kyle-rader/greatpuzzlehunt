import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button } from 'semantic-ui-react';

export default class LinkButton extends Component {
  render() {
    const linkStyle = {
      marginBottom: '5px',
      display: 'inline-block',
    };

    if (this.props.as) {
      return <Button
        as={this.props.as}
        style={linkStyle}
        size={this.props.size}
        color={this.props.color}
        content={this.props.content}
        icon={this.props.icon}
        href={this.props.href}
        target='_blank'/>
    }

    return (
      <Link to={this.props.to} style={linkStyle}>
        <Button className={this.props.className} size={this.props.size} color={this.props.color} content={this.props.content} icon={this.props.icon}/>
      </Link>
    )
  }
}
