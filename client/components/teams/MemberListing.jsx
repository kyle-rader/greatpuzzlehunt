import React from 'react';

// A Member listing card

MemberListing = React.createClass({

    render() {
        return (
        <div className="card">
            <div className="content">
                <div className="header">{this.props.member.profile.displayname}</div>
                <div className="description">
                    <a href={'tel:' + this.props.member.profile.phone}>
                        <div className="ui icon label">
                            <i className="phone icon"></i>{this.props.member.profile.phone}
                        </div>
                    </a>
                </div>
            </div>
        </div>
        );
    }
});
