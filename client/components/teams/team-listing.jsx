import React from 'react';

// A Team listing card

TeamListing = React.createClass({
    getInitialState() {
        return {
            err: null
        };
    },

    componentDidMount() {
        if (this.props.showJoin) {
            let form = $(this.refs.joinForm);
            form.form({
                fields: {
                    password: {
                        identifier: 'password',
                        rules: [{
                            type: 'empty',
                            prompt: 'Must enter password'
                        }]
                    }
                },
                inline: true,
                onSuccess: (event, fields) => {
                    event.preventDefault();

                    Meteor.call('teamJoin', fields, (err, result) => {
                        if (err) {
                            console.log(err);
                            this.setState({err: err});
                        }
                    });
                }
            })
        }
    },

    getError() {
        if (this.state.err) {
            return (<div className="ui error message">{this.state.err.reason}</div>);
        } else {
            return null;
        }
    },

    getJoinForm() {
        if (this.props.showJoin) {
            return (
            <div className="extra content">
                <form className="ui form" ref="joinForm">
                    <input type="hidden" name="teamId" value={this.props.team._id}/>
                    <div className="field">
                        <input type="password" placeholder="Password" name="password"/>
                    </div>
                    <input className="ui blue button" type="submit" value="Join"/>
                </form>
                {this.getError()}
            </div>
            );
        }
    },

    render() {
        return (
        <div className="card">
            <div className="content">
                <div className="header">{this.props.team.name}</div>
                <div className="description">
                    <div className="ui circular green label">{this.props.team.members.length}</div> Members
                </div>
                <br/>
                {this.getJoinForm()}
            </div>
        </div>
        );
    }
});