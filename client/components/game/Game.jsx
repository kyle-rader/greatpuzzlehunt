import React from 'react';
import { Meteor } from 'meteor/meteor';
import QR from 'qrcode.react';

Game = React.createClass({

    getInitialState() {
        return {
            encode: 'Hello QR Codes!',
            size: 128
        };
    },

    handleEncodeChange(event) {
        this.setState({encode: event.target.value});
    },
    handleSizeChange(event) {
        this.setState(_.extend(this.state, {size: event.target.value}));
    },

    render() {
        return (
            <div className="custom-bg red-square">
                <br/>
                <div className="ui raised container segment transparent-bg">
                    <QR value={this.state.encode} size={parseInt(this.state.size)} />

                    <br/>
                    <div className="ui form">
                        <div className="field">
                            <input type="text" defaultValue={this.state.encode} onChange={this.handleEncodeChange} />
                        </div>
                        <div className="field">
                            <input type="text" defaultValue={this.state.size} onChange={this.handleSizeChange} />
                        </div>
                    </div>

                    <br/>
                    <div className="ui form">
                        <div className="field">
                            <input className="ui olive fluid button" type="file" accept="image/*" />
                        </div>
                    </div>

                </div>
                
            </div>
        );
    }
});

