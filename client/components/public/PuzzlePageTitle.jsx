import React from 'react';

PuzzlePageTitle = React.createClass({
    render() {
        return (
        <div className="puzzle-page-title">
            <a href="/"><img src="img/logo-512.png"/></a>
            <h2>{this.props.title}</h2>
        </div>
        );
    }
});
