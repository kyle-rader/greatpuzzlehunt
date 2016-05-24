import React from 'react';

HomePanel = React.createClass({
    render() {
        return (
        <div className="text-center column home-panel">
            <a className="icon-btn" href={this.props.link} target={this.props.newTab ? '_BLANK' : ''}>
                <i className={this.props.icon}></i>
                <h2>{this.props.title}</h2>
            </a>
            {this.props.extraText}
        </div>);
    }
});